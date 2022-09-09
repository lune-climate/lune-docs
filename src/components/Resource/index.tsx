import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment'
import Dereferencer from '@site/src/components/Dereferencer'
import JsonPropertyParser from '@site/src/components/JsonPropertyParser'
import ResourceExample from '@site/src/components/ResourceExample'
import { ApiReferenceSection, JsonObjectTable, JsonProperty, Snippet } from 'lune-ui-lib'
import React from 'react'

function formatPath(operationId: string): string {
    // We either receive camelCase, UpperCamelCase, Sentence case or Title Case. Make it all camelCase
    const camelCase = operationId
        // Convert Sentence case to Title Case
        .replace(/ ([a-z])/, (v) => v.toUpperCase())
        // Convert Title Case to UpperCamelCase
        .replace(' ', '')
        // Convert UpperCamelCase to camelCase
        .replace(/^([A-Z])[a-z]/, (v) => v.toLowerCase())
    return (
        camelCase
            .replace(/([A-Z])[a-z]/g, function (v) {
                return `-${v.toLowerCase()}`
            })
            // Make acronyms lowercase
            .toLowerCase()
    )
}

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
    }

    const possibleTrailingSlash = ExecutionEnvironment.canUseDOM
        ? window.location.href.slice(-1) === '/'
            ? '../'
            : ''
        : ''

    return (
        <section>
            <>{props.json.description}</>
            <ApiReferenceSection>
                <JsonObjectTable>
                    {resourceProperties.map((property) => {
                        return <JsonProperty json={property} topLevelDividers />
                    })}
                </JsonObjectTable>
                <>
                    {props.json.endpoints && (
                        <Snippet {...endpointsSnippet} sx={{ marginBottom: '16px' }}>
                            <table className="endpointsTable">
                                {props.json.endpoints.map((endpoint, i) => (
                                    <tr key={i}>
                                        <td align="right">
                                            <a
                                                href={`${possibleTrailingSlash}${formatPath(
                                                    endpoint.operationId,
                                                )}`}
                                            >
                                                {endpoint.method.toUpperCase()}
                                            </a>
                                        </td>
                                        <td align="left">
                                            <a
                                                href={`${possibleTrailingSlash}${formatPath(
                                                    endpoint.operationId,
                                                )}`}
                                            >
                                                {endpoint.endpoint}
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </table>
                        </Snippet>
                    )}
                    <Snippet {...exampleSnippet} />
                </>
            </ApiReferenceSection>
        </section>
    )
}
