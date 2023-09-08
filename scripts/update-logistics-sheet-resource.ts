#!/usr/bin/env -S yarn run-ts
const program = require('commander-plus')
const yaml = require('js-yaml')
const fs = require('fs')
const path = require('path')
const to = require('to-case')

program.parse(process.argv)

function writeFile(dir: string, data: string): void {
    // Add new line at the end if not present
    const newLineData = data.slice(-1) === '\n' ? data : `${data}\n`
    fs.writeFileSync(dir, newLineData, (err) => {
        if (err) throw err
    })
}

function createContextLogisticsSheetsSchema(schema: any): string {
    return `import React from 'react'

export const LogisticsSheetsSchemaContext = React.createContext<any>(${JSON.stringify(schema)})`
}

function createResourceMDX(data: any): string {
    return `import JsonTable from '@site/src/components/JsonTable';

<JsonTable name={'asda'} json={${JSON.stringify(data)}}/>`
}

async function main() {
    const schema = yaml.load(fs.readFileSync('static/logistics-csv-schema.yml', 'utf8'))

    // Create context containing the whole OpenAPI schema. This allows components to read this global
    // state and handle any references in the schema itself. It would maybe allow the components written
    // above to instead have a pointer, but that wasn't thought at first.
    writeFile(`src/components/LogisticsSheetsSchemaContext.tsx`, createContextLogisticsSheetsSchema(schema))

    const rowResource = schema.components.schemas.MultiLegRowIn
    writeFile(`src/md/logistics-sheet-row.mdx`, createResourceMDX({ ...rowResource, schemaFilename: 'logistics-csv-schema.yml' }))

    const resultsResource = schema.components.schemas.MultiLegRowResults
    writeFile(`src/md/logistics-sheet-row-results.mdx`, createResourceMDX({ ...resultsResource, schemaFilename: 'logistics-csv-schema.yml' }))
    process.exit(0)
}

main()
