import { APISchemaContext } from '@site/src/components/APISchemaContext'
import React from 'react'

export default function Dereferencer(element: any, name?: string): any {
    // We aggressively try to derefence, so it's better to handle not present case here
    if (!element) {
        return undefined
    }
    const tokenized = element.toString().split('/')
    if (element.$ref) {
        return Dereferencer(element.$ref, name)
    } else if (tokenized.length === 4 && tokenized[0] === '#') {
        const schema = React.useContext(APISchemaContext)
        const schemaElement = {
            ...tokenized.slice(1).reduce((acc, current) => acc[current], schema),
        }
        return {
            ...schemaElement,
            $ref: element.toString(),
            name: name || schemaElement.name || tokenized[3],
        }
    } else {
        return { ...element, name }
    }
}
