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

    // We never have both queryParameters and requestBody so parameters will show
    // one or the other (when present)
    const parametersSection = endpointRequestBody ? (
        <JsonObjectTable>
            {endpointRequestBody.jsons.map((json, i) => (
                <JsonProperty json={json} key={i}></JsonProperty>
            ))}
        </JsonObjectTable>
    ) : queryParameters.length !== 0 ? (
        <JsonObjectTable>
            {queryParameters.map((parameters, i) => {
                return <JsonProperty json={parameters} key={i} />
            })}
        </JsonObjectTable>
    ) : (
        <>
            <br />
            No parameters
        </>
    )

    const returnsSection = endpointSuccessResponse ? (
        <JsonObjectTable>
            <JsonProperty json={endpointSuccessResponse} />
        </JsonObjectTable>
    ) : (
        <>
            <br />
            No return
        </>
    )

    return (
        <section>
            <>{props.json.description}</>
            <ApiReferenceSection>
                <>
                    <>
                        <>Parameters</>
                        {parametersSection}
                    </>
                    <br />
                    <>
                        <>Returns</>
                        {returnsSection}
                    </>
                </>
                <>
                    <Snippet {...curlCall} />
                    {endpointResponseExample && (
                        <Snippet sx={{ marginTop: '16px' }} {...endpointResponseExample} />
                    )}
                </>
            </ApiReferenceSection>
        </section>
    )
}
