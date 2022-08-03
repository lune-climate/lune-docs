import JsonPropertyParser from '@site/src/components/JsonPropertyParser'
import ResourceExample from '@site/src/components/ResourceExample'
import { JsonObjectTable, JsonProperty } from 'lune-ui-lib'
import React from 'react'

export default function SchemaCombination(json: any): JSX.Element {
    const parsedElement = JsonPropertyParser({ json })
    const schemaExample = ResourceExample(parsedElement)
    return (
        <section>
            <div>{parsedElement.type} Page</div>
            <div>Description: {json.description}</div>
            {parsedElement.jsons.map((element) => {
                return (
                    <JsonObjectTable>
                        <JsonProperty json={element} />
                    </JsonObjectTable>
                )
            })}
            <div>Example would go here: {JSON.stringify(schemaExample)}</div>
            <div>Showing full JSON: {JSON.stringify(json, null, 2)}</div>
        </section>
    )
}
