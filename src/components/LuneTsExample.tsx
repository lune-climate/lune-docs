import Dereferencer from '@site/src/components/Dereferencer'
import JsonPropertyParser from '@site/src/components/JsonPropertyParser'
import ResourceExample from '@site/src/components/ResourceExample'
import { AS_ANY_PLACEHOLDER, AS_BLOB_PLACEHOLDER, snakeToCamelCase } from '@site/src/utils'
import camelcaseKeys from 'camelcase-keys'

// Will return the JSON representation of the request body without quotes on properties
function formatRequestBody(requestBody: any): string {
    return JSON.stringify(requestBody, null, 2).replace(/"([^"]+)":/g, '$1:')
}

export default function LuneTsExample(
    operationId: string,
    requestBody: any,
    pathParameters: any[],
    successResponse: any,
    apiKey?: string,
): string {
    let responseObjectName: string = ''
    if (successResponse) {
        if (successResponse['application/pdf']) {
            responseObjectName = 'pdf'
        } else if (successResponse['application/json']) {
            const dereferencedResponseBody = Dereferencer(
                successResponse['application/json'].schema,
            )
            const endpointResponse = JsonPropertyParser({
                ...dereferencedResponseBody,
                json: dereferencedResponseBody,
            })
            // The only way to not have a name here is if it's a list. Use the item name and add sufix
            responseObjectName = endpointResponse.name
                ? snakeToCamelCase(endpointResponse.name)
                : snakeToCamelCase(endpointResponse.jsons[0].name).concat('List')
        } else {
            throw Error(`Unsupported response type ${JSON.stringify(successResponse.content)}`)
        }
    }

    const pathParamExamples = pathParameters.map((p) => ResourceExample(p, true))
    // Path/Route parameters are their own parameters on the endpoint.
    let methodParameters = pathParamExamples
        .map((param) => `'${Object.values(param)[0]}'`)
        .join(', ')

    if (requestBody) {
        // If there are path/route parameters already, we need to handle that.
        methodParameters = methodParameters ? methodParameters.concat(', ') : methodParameters

        const dereferencedRequestBody = Dereferencer(requestBody)
        const requestBodyExample = ResourceExample(requestBody, true, true)
        // Every property on our library is camelCase so convert it
        const camelCaseBodyRequest = camelcaseKeys(requestBodyExample ?? {}, { deep: true })
        if (dereferencedRequestBody.oneOf || dereferencedRequestBody.anyOf) {
            const key = snakeToCamelCase(dereferencedRequestBody.name)
            const data = { [key]: { ...camelCaseBodyRequest } }
            methodParameters = methodParameters.concat(formatRequestBody(data))
        } else if (dereferencedRequestBody.type === 'array') {
            const key = snakeToCamelCase(dereferencedRequestBody.name)
            const data = { [key]: [{ ...camelCaseBodyRequest[0] }] }
            methodParameters = methodParameters.concat(formatRequestBody(data))
        } else {
            methodParameters = methodParameters.concat(formatRequestBody(camelCaseBodyRequest))
        }
    }

    const cleanedMethodParameters = methodParameters
        // Replace AS_ANY_PLACEHOLDER for actual 'as any'
        .replace(new RegExp(`${AS_ANY_PLACEHOLDER}"`, 'g'), `" as any`)
        // Replace AS_BLOB_PLACEHOLDER for actual Blob construction
        .replace(new RegExp(`"(.+)${AS_BLOB_PLACEHOLDER}"`, 'g'), `new Blob(["$1"])`)

    return `import * as lune from '@lune-climate/lune';
var luneClient = new lune.LuneClient('${apiKey ?? '<API_KEY>'}');
var ${responseObjectName} = await luneClient.${operationId}(${cleanedMethodParameters});
    `
}
