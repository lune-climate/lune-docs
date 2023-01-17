import ResourceExample from '@site/src/components/ResourceExample'
import { indent } from '@site/src/utils'

export default function Curl(
    path: string,
    method: string,
    requestBody: any,
    parameters: any[],
    apiKey?: string,
): string {
    const requestBodyExample = requestBody
        ? {
              contentType: requestBody?.contentType,
              value: ResourceExample(requestBody, true),
          }
        : undefined
    let endpointParsed = path
    parameters.forEach((parameter) => {
        const parameterExample = ResourceExample(parameter)
        // We need to correctly encode parameters that are arrays since this is query/path parameters.
        // From `account_id=1,2` we want to instead `account_id=1&account_id=2`
        if (
            parameterExample[parameter.name] &&
            parameterExample[parameter.name].constructor === Array
        ) {
            const examples = parameterExample[parameter.name]
            // We don't want to duplicate the parameter.name for the first element since it's
            // automatically added below if it's a query param.
            const newExample = `${encodeURIComponent(examples[0])}${examples
                .slice(1)
                .map((example) => {
                    return `&${parameter.name}=${encodeURIComponent(example)}`
                })}`
            parameterExample[parameter.name] = newExample
        } else {
            parameterExample[parameter.name] = encodeURIComponent(parameterExample[parameter.name])
        }
        if (parameter.in === 'path') {
            endpointParsed = endpointParsed.replace(
                `{${parameter.name}}`,
                parameterExample[parameter.name],
            )
        }
    })
    // Previous parsing has & at the end if a single parameter is inserted. Remove it if present.
    endpointParsed = endpointParsed.slice(-1) === '&' ? endpointParsed.slice(0, -1) : endpointParsed

    // Content-type is required only for non get endpoints. RequestBody is always optional.
    const extraData =
        method.toUpperCase() === 'GET'
            ? ''
            : ` \\
-H 'Content-Type: ${requestBodyExample?.contentType || 'application/json'}' \\
-X ${method.toUpperCase()} ${
                  requestBodyExample
                      ? `\\
${
    // We only have json and form-data contentType
    requestBodyExample.contentType === 'application/json'
        ? `-d '${JSON.stringify(requestBodyExample.value, null, 2)}'`
        : `-F ${Object.entries(requestBodyExample.value).map((kv) => `${kv[0]}=@${kv[1]}`)}`
}
`
                      : ''
              }`

    return `curl '${endpointParsed}' \\
${indent(`-H 'Authorization: Bearer ${apiKey || '<API_KEY>'}'${extraData}`, 2)}`
}
