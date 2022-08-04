import Dereferencer from '@site/src/components/Dereferencer'
import ResourceExample from '@site/src/components/ResourceExample'

export default function Curl(
    path: string,
    method: string,
    requestBody: any,
    parameters: any[],
): string {
    const requestExample = requestBody ? ResourceExample(requestBody) : undefined
    let endpointParsed = path
    parameters.forEach((parameter) => {
        const derefencedParameter = Dereferencer(parameter)
        const parameterExample = ResourceExample(parameter)
        if (parameter.in === 'path') {
            endpointParsed = endpointParsed.replace(
                `{${parameter.name}}`,
                parameterExample[parameter.name],
            )
        } else if (parameter.in === 'query') {
            const endpointWithParamStart =
                endpointParsed.slice(-1) === '&' ? endpointParsed : endpointParsed.concat('?')
            endpointParsed = `${endpointWithParamStart}${parameter.name}=${
                parameterExample[parameter.name]
            }&`
        }
    })
    endpointParsed = endpointParsed.slice(-1) === '&' ? endpointParsed.slice(0, -1) : endpointParsed

    return `curl ${endpointParsed} \\
-H 'Authorization: Bearer <API_KEY>' \\
-X ${method.toUpperCase()} ${
        requestExample
            ? `\\
-d '${JSON.stringify(requestExample, null, 2)}'
`
            : ''
    }`
}
