import { APISchemaContext } from '@site/src/components/APISchemaContext'
import { camelCaseToSentenceCase } from '@site/src/formatUtils'
import React from 'react'
import * as to from 'to-case'

export default function Dereferencer(element: any, name?: string): any {
    // We aggressively try to derefence, so it's better to handle not present case here
    if (!element) {
        return undefined
    }
    if (element.$ref) {
        return Dereferencer(element.$ref, name)
    }
    const tokenized = element.toString().split('/')
    if (tokenized.length === 4 && tokenized[0] === '#') {
        const schema = React.useContext(APISchemaContext)
        const schemaElement = {
            ...tokenized.slice(1).reduce((acc, current) => acc[current], schema),
        }
        const nameFromToken = tokenized[3] ? camelCaseToSentenceCase(tokenized[3]) : undefined
        return {
            ...schemaElement,
            $ref: element.toString(),
            name: name || schemaElement.name || nameFromToken,
        }
    } else {
        return { ...element, name }
    }
}
