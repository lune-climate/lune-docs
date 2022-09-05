import Dereferencer from '@site/src/components/Dereferencer'
import JsonPropertyParser from '@site/src/components/JsonPropertyParser'
import ResourceExample from '@site/src/components/ResourceExample'
import { ApiReferenceSection, JsonObjectTable, JsonProperty, Snippet } from 'lune-ui-lib'
import React from 'react'

export default function ResourceParser(props: { json: any }): JSX.Element {
    let resourceProperties: any[]
    // We don't have anyOf so no need to handle it
    if (props.json.allOf || props.json.oneOf) {
        resourceProperties = [
            { ...JsonPropertyParser({ json: props.json }), name: props.json.component },
        ]
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
                      name: props.json.component,
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

    return (
        <section>
            <>{props.json.description}</>
            <ApiReferenceSection>
                <>
                    <JsonObjectTable>
                        {resourceProperties.map((property) => {
                            return <JsonProperty json={property} topLevelDividers />
                        })}
                    </JsonObjectTable>
                </>
                <>
                    <Snippet {...endpointsSnippet} />
                    <Snippet {...exampleSnippet} />
                </>
            </ApiReferenceSection>
        </section>
    )
}
