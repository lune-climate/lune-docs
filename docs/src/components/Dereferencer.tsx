import { APISchemaContext } from '@site/src/components/APISchemaContext'
import React from 'react'

export default function Dereferencer(element: any, name?: string): any {
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
            ...tokenized.slice(1).reduce((acc, current) => acc[current], schema),
            $ref: element.toString(),
            name: name || schemaElement.name || tokenized[3],
        }
    } else {
        return { ...element, name }
    }
}
