#!/usr/bin/env -S yarn run-ts
import { DateTimeFormatter, LocalDate } from '@js-joda/core'
import { Locale } from '@js-joda/locale_en'
const program = require('commander-plus')
const yaml = require('js-yaml')
const fs = require('fs')
const to = require('to-case')

program.parse(process.argv)

function writeFile(dir: string, data: string): void {
    // Add new line at the end if not present
    const newLineData = data.slice(-1) === '\n' ? data : `${data}\n`
    fs.writeFileSync(dir, newLineData, (err) => {
        if (err) throw err
    })
}

// the sidebar does not fit long labels well
function shortenEmissionEstimatesLabel(label: string): string {
    return label.replace(/emission estimate/g, 'estimate')
}

function createEndpointMDX(data: any, sidebarPosition?: number, sidebarLabel?: string): string {
    return `---
${
    sidebarPosition
        ? `sidebar_position: 1
`
        : ''
}
sidebar_class_name: ${data.method}
sidebar_label: ${shortenEmissionEstimatesLabel(data.summary)}
---
# ${data.summary}

import Endpoint from '@site/src/components/Endpoint';

<Endpoint json={${JSON.stringify(data)}}/>`
}

function createResourceMDX(data: any, label: string, sidebarPosition?: number): string {
    const name = to.sentence(data.component)
    return `${
        sidebarPosition
            ? `---
sidebar_position: 1
sidebar_label: ${label}
hide_title: true
title: ${name}
---`
            : ''
    }
import Resource from '@site/src/components/Resource';

<Resource name={"${name}"} json={${JSON.stringify(data)}}/>`
}

function createContextAPISchema(schema: any): string {
    return `import React from 'react'

export const APISchemaContext = React.createContext<any>(${JSON.stringify(schema)})`
}

// NOTE: This method has a duplicate in src/utils. Due to this being a script, there are issues trying to
// import from there (due to docusaurus environment). Make sure changes here are reflected there if needed.
function formatFilename(filename: string): string {
    // We either receive camelCase, UpperCamelCase, Sentence case or Title Case. Make it all camelCase
    const camelCase = filename
        // Convert Sentence case to Title Case
        .replace(/ ([a-z])/, (v) => v.toUpperCase())
        // Convert Title Case to UpperCamelCase
        .replace(' ', '')
        // Convert UpperCamelCase to camelCase
        .replace(/^([A-Z])[a-z]/, (v) => v.toLowerCase())
    return (
        camelCase
            .replace(/([A-Z])[a-z]/g, function(v) {
                return `-${v.toLowerCase()}`
            })
            // Make acronyms lowercase
            .toLowerCase()
    )
}

function createChangelogPage(): string {
    const pageIntro = `---
sidebar_position: 14
sidebar_label: Changelog
hide_table_of_contents: true
---

# Changelog

In chronological order, here are all changes to the Lune API

`
    const changelog: string[] = fs.readFileSync('static/changelog.md', 'utf8').split('\n')
    const perDayChanges = new Map<string, string[]>()
    let currentVersion: string | undefined

    function extractEventDate(line: string): string {
        // The last 10 chars in a new entry should always contain the date but we want
        // to present in a different format so it isn't confused with an API version
        return LocalDate.parse(line.slice(-10)).format(
            DateTimeFormatter.ofPattern('MMMM d, yyyy').withLocale(Locale.ENGLISH),
        )
    }

    function append(line: string): void {
        if (currentVersion === undefined) {
            throw new Error(`Found changes before any api version definition`)
        }
        const existing = perDayChanges.get(currentVersion) ?? []
        perDayChanges.set(currentVersion, [...existing, line])
    }

    // Aggregate changes on a per-day basis since it's how we want to present them
    for (const line of changelog) {
        const trimmedLine = line.trim()
        // This demarks a new entry so we store currentEntry if it exists and restart an entry
        if (trimmedLine.startsWith('# [New Version')) {
            currentVersion = trimmedLine.match(/`(\d{4}-\d{2}-\d{2})`/g)![0].slice(1, -1)
        } else if (trimmedLine.startsWith('## [Non-Breaking')) {
            append(`** ${extractEventDate(trimmedLine)} **`)
            append('')
        } else if (trimmedLine.startsWith('## [Breaking')) {
            append(`** ${extractEventDate(trimmedLine)} - *[Breaking change]* **`)
            append('')
        } else {
            append(trimmedLine)
        }
    }

    let orderedChanges = ''
    // Go through all the days in order and aggregate changes as wanted
    for (const version of [...perDayChanges.keys()].sort().reverse()) {
        orderedChanges =
            orderedChanges +
            `## Version \`${version}\`\n${perDayChanges.get(version)!.join('\n')}\n`
    }

    return pageIntro + orderedChanges
}

async function main() {
    // Clear resources and endpoints
    const directoriesToClean = ['docs/api-reference', 'docs/all-resources']
    directoriesToClean.forEach((directory) => {
        const filenames = fs.readdirSync(directory)
        filenames.forEach((file) => {
            if (file !== '_category_.json') {
                if (file.endsWith('.mdx') || file.endsWith('.md')) {
                    fs.unlinkSync(`${directory}/${file}`)
                } else {
                    fs.rmdirSync(`${directory}/${file}`, { recursive: true, force: true })
                }
            }
        })
    })

    const schema = yaml.load(fs.readFileSync('static/openapi.yml', 'utf8'))
    const schemaPaths = Object.entries(schema.paths)

    // Create directories for `Core Resources` section. Each tag consists of one directory.
    schema.tags.forEach((tag, index) => {
        const folderDir = `docs/api-reference/${formatFilename(tag.name)}`
        if (!fs.existsSync(folderDir)) {
            fs.mkdirSync(folderDir)
        }

        // Check for components that are tied to the tag
        const component = tag['x-lune-component']

        if (component === undefined) {
            throw new Error(`x-lune-component attribute is required: ${tag.name}`)
        }

        const data = schema.components.schemas[component]
        const endpointsForTag = schemaPaths.filter((path) => {
            // All methods in an endpoint are tied to the same tag, so we can simply
            // check the first endpoint to verify the tag is present.
            // path[1] = endpointMethods = {"put": {}, "get": {} etc.}
            return (Object.entries(path[1] as any)[0][1] as any).tags.includes(tag.name)
        })

        // Build the endpoints that are tied to the CoreResource
        const linkedEndpoints = endpointsForTag.reduce((acc, endpoint) => {
            const endpointURL = endpoint[0]
            const methods = Object.entries(endpoint[1] as any)
            for (const [method, data] of methods) {
                acc.push({
                    method: method as string,
                    endpoint: endpointURL,
                    operationId: (data as any).operationId,
                })
            }
            return acc
        }, [] as any[])
        const resourceJSON = {
            ...data,
            component,
            endpoints: linkedEndpoints,
            schemaFilename: 'api-schema.yml',
        }
        const filename = formatFilename(component)
        // Sentence case conversion to present on sidebar
        const label = component
            .replace(/([A-Z])/g, (v) => ` ${v.toLowerCase()}`)
            .replace(/^ ([a-z])/, (v) => v.toUpperCase())
            .slice(1)
        writeFile(`${folderDir}/${filename}.mdx`, createResourceMDX(resourceJSON, label, 1))

        // Create category and preserve tag order in the sidebar
        const directoryInfo = {
            label: tag.name,
            position: index + 1,
            link: {
                id: filename,
                type: 'doc',
            },
        }

        writeFile(`${folderDir}/_category_.json`, JSON.stringify(directoryInfo, null, 2))
    })

    // Iterate through endpoints
    let path: string
    let endpoints: any
    for ([path, endpoints] of schemaPaths) {
        let method: string
        let data: any
        for ([method, data] of Object.entries(endpoints as any)) {
            data.tags.forEach((tag: string) => {
                const folderDir = `docs/api-reference/${formatFilename(tag)}`
                // Tag might not have been specified in the tags section. Create directory
                if (!fs.existsSync(folderDir)) {
                    fs.mkdirSync(folderDir)
                    writeFile(
                        `${folderDir}/_category_.json`,
                        JSON.stringify({ label: tag }, null, 2),
                    )
                }

                const endpointJSON = {
                    ...data,
                    schemaFilename: 'api-schema.yml',
                    tag,
                    method,
                    path,
                }
                writeFile(
                    `${folderDir}/${formatFilename(data.operationId)}.mdx`,
                    createEndpointMDX(endpointJSON),
                )
            })
        }
    }

    // Iterate through components
    let component: string
    let data: any
    for ([component, data] of Object.entries(schema.components.schemas)) {
        const resourceJSON = { ...data, component, schemaFilename: 'api-schema.yml' }
        const filename = formatFilename(component)
        // Sentence case conversion to present on sidebar
        const label = component
            .replace(/([A-Z])/g, (v) => ` ${v.toLowerCase()}`)
            .replace(/^ ([a-z])/, (v) => v.toUpperCase())
            .slice(1)
        writeFile(`docs/all-resources/${filename}.mdx`, createResourceMDX(resourceJSON, label))
    }

    // Create context containing the whole OpenAPI schema. This allows components to read this global
    // state and handle any references in the schema itself. It would maybe allow the components written
    // above to instead have a pointer, but that wasn't thought at first.
    writeFile(`src/components/APISchemaContext.tsx`, createContextAPISchema(schema))

    // Create changelog guide containing the whole OpenAPI schema.
    writeFile(`docs/key-concepts/changelog.md`, createChangelogPage())

    process.exit(0)
}

main()
