#!/usr/bin/env -S yarn run-ts
const program = require('commander-plus')
const yaml = require('js-yaml')
const fs = require('fs')

program.parse(process.argv)

async function main() {
    const json = yaml.load(fs.readFileSync('data/openapi.yml', 'utf8'))
    console.log(JSON.stringify(json, null, 2))
    process.exit(0)
}

main()
