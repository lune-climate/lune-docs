import Curl from '@site/src/components/Curl'
import Dereferencer from '@site/src/components/Dereferencer'
import JsonPropertyParser from '@site/src/components/JsonPropertyParser'
import ParameterParser from '@site/src/components/ParameterParser'
import ResourceExample from '@site/src/components/ResourceExample'
import { ApiReferenceSection, JsonObjectTable, JsonProperty, Snippet } from 'lune-ui-lib'
import React from 'react'

export default function EndpointParser(props: { json: any }): JSX.Element {
    let endpointRequestBody
    // We only have requestBody of `application/json` so we know what to expect
    if (props.json.requestBody) {
        const dereferencedRequestBody = Dereferencer(
            props.json.requestBody.content['application/json'].schema,
        )
        endpointRequestBody = JsonPropertyParser({
            ...dereferencedRequestBody,
            json: dereferencedRequestBody,
        })
    }

    const parameters = (props.json.parameters || []).map((parameter) => ParameterParser(parameter))
    const routeParameters = parameters.filter((parameter) => parameter.in === 'path')
    const queryParameters = parameters.filter((parameter) => parameter.in === 'query')

    const curlStr = Curl(props.json.path, props.json.method, endpointRequestBody, parameters)
    const curlCall = {
        header: `${props.json.method} ${props.json.path}`,
        language: 'curl',
        toCopy: curlStr,
        children: curlStr,
        lineNumbers: false,
    }

    let endpointSuccessResponse
    let endpointResponseExample
    // For now, only handle json responses (we have application/pdf for certificates as well)
    if (
        props.json.responses[200] &&
        props.json.responses[200].content &&
        props.json.responses[200].content['application/json']
    ) {
        const dereferencedResponseBody = Dereferencer(
            props.json.responses[200].content['application/json'].schema,
        )
        endpointSuccessResponse = JsonPropertyParser({
            ...dereferencedResponseBody,
            json: dereferencedResponseBody,
        })
        endpointResponseExample = {
            header: endpointSuccessResponse.name,
            language: 'json',
            children: JSON.stringify(ResourceExample(endpointSuccessResponse), null, 2),
            lineNumbers: false,
        }
    }

    return (
        <section>
            <>Description: {props.json.description}</>
            <ApiReferenceSection>
                {endpointRequestBody && (
                    <JsonObjectTable>
                        {endpointRequestBody.jsons.map((json, i) => (
                            <JsonProperty json={json} key={i}></JsonProperty>
                        ))}
                    </JsonObjectTable>
                )}
                <>
                    <Snippet {...curlCall} />
                    {endpointResponseExample && <Snippet sx={{ marginTop: '16px' }} {...endpointResponseExample} />}
                </>
            </ApiReferenceSection>
            <>Route Parameters</>
            {routeParameters.length !== 0 && (
                <JsonObjectTable>
                    {routeParameters.map((parameters) => {
                        return <JsonProperty json={parameters} />
                    })}
                </JsonObjectTable>
            )}
            <>Query Parameters</>
            {queryParameters.length !== 0 && (
                <JsonObjectTable>
                    {queryParameters.map((parameters) => {
                        return <JsonProperty json={parameters} />
                    })}
                </JsonObjectTable>
            )}
            <>RequestBody</>
            {endpointRequestBody && (
                <JsonObjectTable>
                    <JsonProperty json={endpointRequestBody} />
                </JsonObjectTable>
            )}
            <>ResponseBody</>
            {endpointSuccessResponse && (
                <JsonObjectTable>
                    <JsonProperty json={endpointSuccessResponse} />
                </JsonObjectTable>
            )}
            <>ResponseExample</>
            {endpointResponseExample && <Snippet {...endpointResponseExample} />}
            <>Curl</>
            <Snippet {...curlCall} />
            <>Response example would go here</>
            <>[DEBUG] Showing full JSON: {JSON.stringify(props.json)}</>
        </section>
    )
}
