import Dereferencer from '@site/src/components/Dereferencer'
import JsonPropertyParser from '@site/src/components/JsonPropertyParser'
import ResourceExample from '@site/src/components/ResourceExample'
import { formatPath, getRelativePathPrefix } from '@site/src/utils'
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
    }

    const hrefPrefix = getRelativePathPrefix()

    return (
        <section className="page">
            {props.json.description && (
                <div className="body3 pageDescription">{props.json.description}</div>
            )}
            <ApiReferenceSection>
                <JsonObjectTable>
                    {resourceProperties.map((property) => {
                        return <JsonProperty json={property} topLevelDividers />
                    })}
                </JsonObjectTable>
                <>
                    {props.json.endpoints && (
                        <Snippet {...endpointsSnippet} sx={{ marginBottom: '16px' }}>
                            <div className="endpointsTable">
                                {props.json.endpoints.map((endpoint, i) => (
                                    <div
                                        key={i}
                                        className="row"
                                        style={{
                                            border: 'solid 1px black',
                                        }}
                                    >
                                        <a
                                            key={i}
                                            href={`${hrefPrefix}${formatPath(
                                                endpoint.operationId,
                                            )}`}
                                        >
                                            <div
                                                className="cell"
                                                style={{
                                                    textAlign: 'right',
                                                    width: '50px',
                                                }}
                                            >
                                                {endpoint.method.toUpperCase()}
                                            </div>
                                            <div
                                                className="cell"
                                                style={{
                                                    textAlign: 'left',
                                                }}
                                            >
                                                &nbsp;{endpoint.endpoint}
                                            </div>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </Snippet>
                    )}
                    <Snippet {...exampleSnippet} />
                </>
            </ApiReferenceSection>
        </section>
    )
}
