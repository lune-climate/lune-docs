import { SchemaContextIndex, SchemaFilename } from '@site/src/components/SchemaContextIndex'
import { camelCaseToSentenceCase } from '@site/src/formatUtils'
import React from 'react'

export default function Dereferencer(
    element: { schemaFilename: SchemaFilename },
    name?: string,
): any {
    // We aggressively try to derefence, so it's better to handle not present case here
    if (!element) {
        return undefined
    }
    if (!element.schemaFilename) {
        // Given that docusaurus pages are built at build time,
        // this ensures the build fails if any node in the OpenAPI spec that calls
        // this function is missing `schemaFilename`.
        // This partially alleviates the exessive use of `any` types in the repo.
        throw new Error(`schemaFilename must be set: ${JSON.stringify(element)}`)
    }

    if (element.$ref) {
        const tokenized = element.$ref.toString().split('/')
        if (tokenized.length === 4 && tokenized[0].includes('#')) {
            // Extract file ref.
            // If there's an explicit file ref, extract it then propagate to all children,
            // otherwise propagate the current node's file ref.
            const schemaFilename =
                tokenized[0].length > 1 ? tokenized[0].slice(0, -1) : element.schemaFilename

            const schemas = React.useContext(SchemaContextIndex)
            const schema = React.useContext(schemas[schemaFilename])

            const schemaElement = {
                ...tokenized.slice(1).reduce((acc, current) => acc[current], schema),
            }
            // The element itself might just be another reference. To keep the properties of the
            // component even if it's a reference (`description` for example) we keep track of
            // both versions and give more weight to the unreferenced one.
            const dereferencedSchemaElement = Dereferencer({
                ...schemaElement,
                schemaFilename,
            })

            const nameFromToken = tokenized[3] ? camelCaseToSentenceCase(tokenized[3]) : undefined
            return {
                ...dereferencedSchemaElement,
                ...schemaElement,
                schemaFilename,
                $ref: element.$ref.toString(),
                name: name || schemaElement.name || nameFromToken,
            }
        } else {
            throw new Error(`Should not occur: ${JSON.stringify(element)}`)
        }
    } else {
        return { ...element, name }
    }
}
