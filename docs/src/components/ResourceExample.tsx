// TODO I believe the format can be used to provide better examples.
function createExampleProperty(property): any {
    const example = {}
    // Always use example when present. Otherwise, if a primitive type is shown, give a best
    // guess approach. Last resort, don't include if not required otherwise give parameter name.
    if (property.example && (property.type === 'number' || property.type === 'integer')) {
        example[property.name] = Number(property.example)
    } else if (property.example && property.type === 'boolean') {
        example[property.name] = Boolean(property.example)
    } else if (property.example) {
        example[property.name] = property.example
    } else if (property.type === 'string') {
        example[property.name] = property.default || property.name
    } else if (property.type === 'number' || property.type === 'integer') {
        example[property.name] = property.default || 1
    } else if (property.type === 'boolean') {
        example[property.name] = !!property.default || true
    } else if (!property.required) {
        example[property.name] = undefined
    } else {
        example[property.name] = property.name
    }
    return example
}

export default function ResourceExample(propertiesParsed: any): any {
    // No matter the type, resolve to example if present.
    if (propertiesParsed.example) {
        return createExampleProperty(propertiesParsed)
    } else if (propertiesParsed.allOf || propertiesParsed.anyOf) {
        return Object.assign(
            {},
            ...propertiesParsed.jsons.map((property) => ResourceExample(property)),
        )
    } else if (propertiesParsed.oneOf) {
        return ResourceExample(propertiesParsed.jsons[0])
    } else if (propertiesParsed.type === 'array') {
        return {
            [propertiesParsed.name]: [
                Object.assign(
                    {},
                    ...propertiesParsed.jsons.map((property) => ResourceExample(property)),
                ),
            ],
        }
    } else if (propertiesParsed.type === 'object') {
        const properties = (propertiesParsed.jsons || []).concat(
            propertiesParsed.additionalProperties || [],
        )
        return Object.assign({}, ...properties.map((property) => ResourceExample(property)))
    } else if (propertiesParsed.type) {
        // it's a leaf in the JSON, we can create an example
        return createExampleProperty(propertiesParsed)
    } else {
        return Object.assign({}, ...propertiesParsed.map((property) => ResourceExample(property)))
    }
}
