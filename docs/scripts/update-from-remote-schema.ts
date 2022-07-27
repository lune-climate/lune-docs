#!/usr/bin/env -S yarn run-ts
const program = require('commander-plus')
const yaml = require('js-yaml')
const fs = require('fs')

program.parse(process.argv)

function writeFile(dir: string, data: any): void {
    fs.writeFileSync(dir, data, (err) => {
        if (err) throw err
    })
}

function createEndpointMDX(data: any, sidebarPosition?: number): string {
    return `${
        sidebarPosition
            ? `---
sidebar_position: 1
---`
            : ''
    }
# ${data.summary}

import EndpointParser from '@site/src/components/EndpointParser';

<EndpointParser json={${JSON.stringify(data)}}/>`
}

function createResourceMDX(data: any, sidebarPosition?: number): string {
    return `${
        sidebarPosition
            ? `---
sidebar_position: 1
---`
            : ''
    }
# ${data.component}

import ResourceParser from '@site/src/components/ResourceParser';

<ResourceParser json={${JSON.stringify(data)}}/>`
}

async function main() {
    const schema = yaml.load(fs.readFileSync('data/openapi.yml', 'utf8'))

    // Create directories for `Core Resources` section. Each tag consists of one directory.
    schema.tags.forEach((tag, index) => {
        const folderDir = `docs/CoreResources/${tag.name}`
        if (!fs.existsSync(folderDir)) {
            fs.mkdirSync(folderDir)
        }

        // Create category and preserve tag order in the sidebar
        const directoryInfo = {
            label: tag.name,
            position: index + 1,
            link: {
                type: 'generated-index',
            },
        }

        writeFile(`${folderDir}/_category_.json`, JSON.stringify(directoryInfo, null, 2))

        // Check for components that are tied to the tag
        if (tag['x-components']) {
            for (const component of tag['x-components']) {
                const data = schema.components.schemas[component]
                const resourceJSON = { ...data, component: component }
                writeFile(`${folderDir}/${component}.mdx`, createResourceMDX(resourceJSON, 1))
            }
        }
    })

    // Iterate through endpoints
    let path: string
    let endpoints: any
    for ([path, endpoints] of Object.entries(schema.paths)) {
        let endpoint: string
        let data: any
        for ([endpoint, data] of Object.entries(endpoints as any)) {
            data.tags.forEach((tag: string) => {
                const folderDir = `docs/CoreResources/${tag}`
                // Tag might not have been specified in the tags section. Create directory
                if (!fs.existsSync(folderDir)) {
                    fs.mkdirSync(folderDir)
                }

                const endpointJSON = { ...data, tag: tag, endpoint: endpoint }
                writeFile(`${folderDir}/${data.operationId}.mdx`, createEndpointMDX(endpointJSON))
            })
        }
    }

    // Iterate through components
    let component: string
    let data: any
    for ([component, data] of Object.entries(schema.components.schemas)) {
        const resourceJSON = { ...data, component: component }
        writeFile(`docs/AllResources/${component}.mdx`, createResourceMDX(resourceJSON))
    }

    process.exit(0)
}

main()
