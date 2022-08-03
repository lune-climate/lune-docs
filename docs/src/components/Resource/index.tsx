import Dereferencer from '@site/src/components/Dereferencer'
import JsonPropertyParser from '@site/src/components/JsonPropertyParser'
import ResourceExample from '@site/src/components/ResourceExample'
import SchemaCombination from '@site/src/components/SchemaCombination'
import { JsonObjectTable, JsonProperty, Snippet } from 'lune-ui-lib'
import React from 'react'

export default function ResourceParser(props: { json: any }): JSX.Element {
    let resourceProperties: any[]
    if (props.json.allOf) {
        resourceProperties = [
            { ...JsonPropertyParser({ json: props.json }), name: props.json.component },
        ]
    } else if (props.json.oneOf) {
        return SchemaCombination(props.json)
    } else {
        resourceProperties = props.json.properties
            ? Object.keys(props.json.properties).map((propertyName) => {
                  const element = Dereferencer(props.json.properties[propertyName])
                  return JsonPropertyParser({
                      name: propertyName,
                      json: element,
                      required: props.json.required,
                  })
              })
            : [
                  JsonPropertyParser({
                      ...props.json,
                      json: props.json,
                  }),
              ]
    }
    const exampleSnippet = {
        header: props.json.component || props.json.name,
        lineNumbers: false,
        language: 'json',
        children: JSON.stringify(ResourceExample(resourceProperties), null, 2),
    }

    const endpointsSnippet = {
        header: 'Endpoints',
        lineNumbers: false,
        language: 'json',
        children: JSON.stringify(props.json.endpoints, null, 2),
    }

    // TODO this is how you can get the colorMode
    // import { useColorMode } from '@docusaurus/theme-common'
    // const { colorMode } = useColorMode() // 'light' | 'dark'

    return (
        <section>
            <div>Description: {props.json.description}</div>
            <div>Properties</div>
            <JsonObjectTable>
                {resourceProperties.map((property) => {
                    return <JsonProperty json={property} />
                })}
            </JsonObjectTable>
            <div>Example</div>
            <Snippet {...exampleSnippet} />
            <div>Endpoints</div>
            <Snippet {...endpointsSnippet} />
            <div>[DEBUG] Showing full JSON: {JSON.stringify(props.json)}</div>
        </section>
    )
}
