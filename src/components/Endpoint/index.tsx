import Curl from '@site/src/components/Curl'
import Dereferencer from '@site/src/components/Dereferencer'
import JsonPropertyParser from '@site/src/components/JsonPropertyParser'
import ParameterParser from '@site/src/components/ParameterParser'
import ResourceExample from '@site/src/components/ResourceExample'
import { getApiDomain, getApiKey } from '@site/src/utils'
import { ApiReferenceSection, JsonObjectTable, JsonProperty, Snippet } from 'lune-ui-lib'
import React from 'react'

export default function EndpointParser(props: { json: any }): JSX.Element {
    const apiDomain = getApiDomain()
    const apiKey = getApiKey()

    let endpointRequestBody
    // When existent, only requestBody of type `application/json` and `multipart/form-data` exists in the schema
    if (props.json.requestBody) {
        const dereferencedRequestBody = Dereferencer(
            (
                props.json.requestBody.content['application/json'] ||
                props.json.requestBody.content['multipart/form-data']
            ).schema,
        )
        endpointRequestBody = JsonPropertyParser({
            ...dereferencedRequestBody,
            json: dereferencedRequestBody,
        })

        endpointRequestBody.contentType = 'application/json'
        if (props.json.requestBody.content['multipart/form-data']) {
            endpointRequestBody.contentType = 'multipart/form-data'
        }
    }

    const parameters = (props.json.parameters || []).map((parameter) => ParameterParser(parameter))
    const queryParameters = parameters.filter((parameter) => parameter.in === 'query')
    const pathParameters = parameters.filter((parameter) => parameter.in === 'path')

    const endpointCurlString = Curl(
        `${apiDomain}${props.json.path}`,
        props.json.method,
        endpointRequestBody,
        pathParameters,
        apiKey,
    )
    const endpointCurl = {
        header: `${props.json.method.toUpperCase()} ${props.json.path}`,
        language: 'bash',
        toCopy: endpointCurlString,
        children: endpointCurlString,
        lineNumbers: false,
    }

    let endpointResponseType
    let endpointResponse
    let endpointResponseExample
    if (props.json.responses[200] && props.json.responses[200].content) {
        if (props.json.responses[200].content['application/pdf']) {
            endpointResponseType = 'pdf'
            endpointResponse = 'A binary PDF file is returned.'
        } else if (props.json.responses[200].content['application/json']) {
            endpointResponseType = 'json'
            const dereferencedResponseBody = Dereferencer(
                props.json.responses[200].content['application/json'].schema,
            )
            endpointResponse = JsonPropertyParser({
                ...dereferencedResponseBody,
                json: dereferencedResponseBody,
            })
            endpointResponseExample = {
                header: 'Response',
                language: 'json',
                children: JSON.stringify(ResourceExample(endpointResponse), null, 2),
                lineNumbers: false,
            }
        } else {
            throw Error(
                `Unsupported response type ${JSON.stringify(props.json.responses[200].content)}`,
            )
        }
    }

    const noParameters =
        pathParameters.length === 0 && queryParameters.length === 0 && !endpointRequestBody

    const returnsSection = endpointResponseType ? (
        endpointResponseType === 'json' ? (
            <JsonObjectTable title="Returns">
                <JsonProperty json={endpointResponse} topLevelDividers />
            </JsonObjectTable>
        ) : (
            <JsonObjectTable title="Returns">
                <p>{endpointResponse}</p>
            </JsonObjectTable>
        )
    ) : (
        <>
            <br />
            No return
        </>
    )

    return (
        <section>
            {props.json.description && (
                <div className="body3 pageDescription" style={{ marginBottom: '64px' }}>
                    {props.json.description}
                </div>
            )}
            <ApiReferenceSection>
                <div className="sections">
                    {pathParameters.length !== 0 && (
                        <JsonObjectTable title="Path Parameters">
                            {pathParameters.map((parameters, i) => (
                                <JsonProperty json={parameters} key={i} topLevelDividers />
                            ))}
                        </JsonObjectTable>
                    )}

                    {queryParameters.length !== 0 && (
                        <JsonObjectTable title="Query Parameters">
                            {queryParameters.map((parameters, i) => (
                                <JsonProperty json={parameters} key={i} topLevelDividers />
                            ))}
                        </JsonObjectTable>
                    )}

                    {endpointRequestBody && (
                        <JsonObjectTable title="Parameters">
                            {endpointRequestBody.jsons.map((json, i) => (
                                <JsonProperty json={json} key={i} topLevelDividers />
                            ))}
                        </JsonObjectTable>
                    )}

                    {noParameters && (
                        <JsonObjectTable title="No Parameters">
                            <></>
                            <></>
                        </JsonObjectTable>
                    )}

                    {endpointResponse && <div>{returnsSection}</div>}
                </div>
                <>
                    <Snippet {...endpointCurl} />
                    {endpointResponseExample && (
                        <Snippet sx={{ marginTop: '16px' }} {...endpointResponseExample} />
                    )}
                </>
            </ApiReferenceSection>
        </section>
    )
}
