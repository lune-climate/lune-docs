import { APISchemaContext } from '@site/src/components/APISchemaContext'
import React from 'react'

export default function Dereferencer(element: any, name?: string): any {
    const tokenized = element.toString().split('/')
    if (element.$ref) {
        return Dereferencer(element.$ref, name)
    } else if (tokenized.length === 4 && tokenized[0] === '#') {
        const schema = React.useContext(APISchemaContext)
        const element = { ...tokenized.slice(1).reduce((acc, current) => acc[current], schema) }
        return {
            ...tokenized.slice(1).reduce((acc, current) => acc[current], schema),
            $ref: element,
            name: name || element.name || tokenized[3],
        }
    } else {
        return { ...element, name }
    }
}
