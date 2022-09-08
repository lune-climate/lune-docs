import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Curl from '@site/src/components/Curl'
import Dereferencer from '@site/src/components/Dereferencer'
import JsonPropertyParser from '@site/src/components/JsonPropertyParser'
import ParameterParser from '@site/src/components/ParameterParser'
import ResourceExample from '@site/src/components/ResourceExample'
import { ApiReferenceSection, JsonObjectTable, JsonProperty, Snippet } from 'lune-ui-lib'
import React from 'react'

export default function EndpointParser(props: { json: any }): JSX.Element {
    const { siteConfig } = useDocusaurusContext()
    const apiKey = ExecutionEnvironment.canUseDOM
        ? document.cookie
              .split('; ')
              .find((row) => row.startsWith('docs_test_api_key='))
              ?.split('=')[1]
        : undefined
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
    const pathParameters = parameters.filter((parameter) => parameter.in === 'path')

    const curlStr = Curl(
        `${siteConfig.customFields.API_DOMAIN}${props.json.path}`,
        props.json.method,
        endpointRequestBody,
        parameters,
        apiKey,
    )
    const curlCall = {
        header: `${props.json.method.toUpperCase()} ${props.json.path}`,
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
            header: 'Response',
            language: 'json',
            children: JSON.stringify(ResourceExample(endpointSuccessResponse), null, 2),
            lineNumbers: false,
        }
    }

    const noParameters =
        pathParameters.length === 0 && queryParameters.length === 0 && !endpointRequestBody

    const returnsSection = endpointSuccessResponse ? (
        <JsonObjectTable title="Returns">
            <JsonProperty json={endpointSuccessResponse} topLevelDividers />
        </JsonObjectTable>
    ) : (
        <>
            <br />
            No return
        </>
    )

    return (
        <section>
            {props.json.description && (
                <div style={{ marginBottom: '64px' }}>{props.json.description}</div>
            )}
            <ApiReferenceSection>
                <>
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

                    {endpointSuccessResponse && (
                        <div style={{ marginTop: '64px' }}>{returnsSection}</div>
                    )}
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
