import Dereferencer from '@site/src/components/Dereferencer'
import JsonPropertyParser from '@site/src/components/JsonPropertyParser'
import ResourceExample from '@site/src/components/ResourceExample'
import { formatPath, useRelativePathPrefix } from '@site/src/utils'
import {
    ApiReferenceSection,
    JsonObjectTable,
    JsonProperty,
    Snippet,
    SnippetItem,
} from 'lune-ui-lib'
import React from 'react'

export default function ResourceParser(props: { name: string; json: any }): JSX.Element {
    // remove last element because endpoints listed in this page are at the same level
    const hrefPrefix = useRelativePathPrefix().split('/').slice(0, -1).join('/')

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
                      nullable: props.json.nullable,
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

    const exampleSnippet = (
        <SnippetItem language="json">
            {JSON.stringify(ResourceExample(resourceProperties), null, 2)}
        </SnippetItem>
    )

    return (
        <section className="page">
            <ApiReferenceSection>
                <>
                    <h1>{props.name}</h1>
                    <div className="body3 pageDescription">{props.json.description}</div>
                </>
                {props.json.endpoints && (
                    <Snippet header="Endpoints" sx={{ marginBottom: '16px' }}>
                        <SnippetItem>
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
                                            href={`${hrefPrefix}/${formatPath(
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
                        </SnippetItem>
                    </Snippet>
                )}
            </ApiReferenceSection>
            <ApiReferenceSection style={{ marginTop: '32px' }}>
                <JsonObjectTable>
                    {resourceProperties.map((property) => {
                        return <JsonProperty json={property} topLevelDividers />
                    })}
                </JsonObjectTable>
                <Snippet header={props.json.component || props.json.name}>{exampleSnippet}</Snippet>
            </ApiReferenceSection>
        </section>
    )
}
