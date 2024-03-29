import Curl from '@site/src/components/Curl'
import Dereferencer from '@site/src/components/Dereferencer'
import JsonPropertyParser from '@site/src/components/JsonPropertyParser'
import LuneJsExample from '@site/src/components/LuneJsExample'
import ParameterParser from '@site/src/components/ParameterParser'
import ResourceExample from '@site/src/components/ResourceExample'
import { getApiDomain, getApiKey } from '@site/src/utils'
import {
    ApiReferenceSection,
    JsonObjectTable,
    JsonProperty,
    Markdown,
    Snippet,
    SnippetItem,
} from 'lune-ui-lib'
import React from 'react'

function formatReturnResource(resource: string): string {
    return `Returns: ${resource} object`
}

// eslint-disable-next-line complexity
export default function EndpointParser(props: { json: any }): JSX.Element {
    const apiDomain = getApiDomain()
    const apiKey = getApiKey()

    let endpointRequestBody
    // When existent, only requestBody of type `application/json` and `multipart/form-data` exists in the schema
    if (props.json.requestBody) {
        const dereferencedRequestBody = Dereferencer({
            ...(
                props.json.requestBody.content['application/json'] ||
                props.json.requestBody.content['multipart/form-data']
            ).schema,
            schemaFilename: props.json.schemaFilename,
        })
        endpointRequestBody = JsonPropertyParser({
            ...dereferencedRequestBody,
            json: dereferencedRequestBody,
        })

        endpointRequestBody.contentType = 'application/json'
        if (props.json.requestBody.content['multipart/form-data']) {
            endpointRequestBody.contentType = 'multipart/form-data'
        }
    }

    const parameters = (props.json.parameters || []).map((parameter) =>
        ParameterParser({ ...parameter, schemaFilename: props.json.schemaFilename }),
    )
    const queryParameters = parameters.filter((parameter) => parameter.in === 'query')
    const pathParameters = parameters.filter((parameter) => parameter.in === 'path')

    const endpointCurlString = Curl(
        `${apiDomain}${props.json.path}`,
        props.json.method,
        endpointRequestBody,
        pathParameters,
        apiKey,
    )

    const endpointLuneJsString = LuneJsExample(
        props.json.operationId,
        endpointRequestBody,
        pathParameters,
        props.json.responses[200]?.content,
        apiKey,
        props.json.schemaFilename,
    )

    let endpointResponseType
    let endpointResponse
    let endpointResponseExample
    let endpointResponseResource
    if (props.json.responses[200] && props.json.responses[200].content) {
        if (props.json.responses[200].content['application/pdf']) {
            endpointResponseType = 'pdf'
            endpointResponse = 'A binary PDF file is returned.'
        } else if (props.json.responses[200].content['application/json']) {
            endpointResponseType = 'json'
            const dereferencedResponseBody = Dereferencer({
                ...props.json.responses[200].content['application/json'].schema,
                schemaFilename: props.json.schemaFilename,
            })
            endpointResponse = JsonPropertyParser({
                ...dereferencedResponseBody,
                json: dereferencedResponseBody,
            })
            endpointResponseExample = (
                <SnippetItem language="json">
                    {JSON.stringify(ResourceExample(endpointResponse), null, 2)}
                </SnippetItem>
            )

            endpointResponseResource = props.json.responses[200]['x-lune-response-component']
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
            <JsonObjectTable
                title="Returns"
                description={
                    endpointResponseResource
                        ? formatReturnResource(endpointResponseResource)
                        : undefined
                }
            >
                <JsonProperty json={endpointResponse} />
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
                    <Markdown>{props.json.description}</Markdown>
                </div>
            )}
            <ApiReferenceSection>
                <div className="sections">
                    {pathParameters.length !== 0 && (
                        <JsonObjectTable title="Path Parameters">
                            {pathParameters.map((parameters, i) => (
                                <JsonProperty json={parameters} key={i} />
                            ))}
                        </JsonObjectTable>
                    )}

                    {queryParameters.length !== 0 && (
                        <JsonObjectTable title="Query Parameters">
                            {queryParameters.map((parameters, i) => (
                                <JsonProperty level={1} json={parameters} key={i} />
                            ))}
                        </JsonObjectTable>
                    )}

                    {endpointRequestBody && (
                        <JsonObjectTable title="Parameters">
                            <JsonProperty json={endpointRequestBody} />
                        </JsonObjectTable>
                    )}

                    {noParameters && (
                        <JsonObjectTable title="Parameters">
                            <></>
                            <p className="body3">No parameters</p>
                        </JsonObjectTable>
                    )}

                    {endpointResponse && <div>{returnsSection}</div>}
                </div>
                <>
                    <Snippet header={`${props.json.method.toUpperCase()} ${props.json.path}`}>
                        <SnippetItem language="bash" label="Curl" toCopy={endpointCurlString}>
                            {endpointCurlString}
                        </SnippetItem>
                        <SnippetItem language="typescript" label="JS" toCopy={endpointLuneJsString}>
                            {endpointLuneJsString}
                        </SnippetItem>
                    </Snippet>
                    {endpointResponseExample && (
                        <Snippet header="Response" sx={{ marginTop: '16px' }}>
                            {endpointResponseExample}
                        </Snippet>
                    )}
                </>
            </ApiReferenceSection>
        </section>
    )
}
