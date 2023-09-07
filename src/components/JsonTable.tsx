import Dereferencer from '@site/src/components/Dereferencer'
import JsonPropertyParser from '@site/src/components/JsonPropertyParser'
import { JsonObjectTable, JsonProperty } from 'lune-ui-lib'
import React from 'react'

export default function JsonTable(props: { name: string; json: any }): JSX.Element {
    // console.log(props.json.properties)
    const resourceProperties = Object.keys(props.json.properties).map((propertyName) => {
        const element = Dereferencer({
            ...props.json.properties[propertyName],
            schemaFilename: props.json.schemaFilename,
        })
        return JsonPropertyParser({
            name: propertyName,
            json: element,
            required: props.json.required,
            nullable: props.json.nullable,
        })
    })

    return (
        <JsonObjectTable title="">
            {resourceProperties.map((property, i) => {
                return <JsonProperty key={i} json={property} level={1} />
            })}
        </JsonObjectTable>
    )
}
