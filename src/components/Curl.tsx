import ResourceExample from '@site/src/components/ResourceExample'

export default function Curl(
    path: string,
    method: string,
    requestBody: any,
    parameters: any[],
    apiKey?: string,
): string {
    const requestBodyExample = requestBody ? ResourceExample(requestBody, true) : undefined
    let endpointParsed = path
    parameters.forEach((parameter) => {
        const parameterExample = ResourceExample(parameter)
        if (parameter.in === 'path') {
            endpointParsed = endpointParsed.replace(
                `{${parameter.name}}`,
                parameterExample[parameter.name],
            )
        } else if (parameter.in === 'query') {
            // Insert ? in the path for the first query paramter
            const endpointWithParamStart =
                endpointParsed.slice(-1) === '&' ? endpointParsed : endpointParsed.concat('?')
            endpointParsed = `${endpointWithParamStart}${parameter.name}=${
                parameterExample[parameter.name]
            }&`
        }
    })
    // Previous parsing has & at the end if a single parameter is inserted. Remove it if present.
    endpointParsed = endpointParsed.slice(-1) === '&' ? endpointParsed.slice(0, -1) : endpointParsed

    // Content-type is required only for non get endpoints. RequestBody is always optional.
    const extraData =
        method.toUpperCase() === 'GET'
            ? ''
            : ` \\
-H 'Content-Type: application/json' \\
-X ${method.toUpperCase()} ${
                  requestBodyExample
                      ? `\\
-d '${JSON.stringify(requestBodyExample, null, 2)}'
`
                      : ''
              }`

    return `curl ${endpointParsed} \\
-H 'Authorization: Bearer ${apiKey || '<API_KEY>'}'${extraData}`
}
