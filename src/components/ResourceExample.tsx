import Dereferencer from '@site/src/components/Dereferencer'

// Check if it's a high level resource/reference, not an inline property
function isHighLevelElement(property: any): boolean {
    const ref = property.$ref || (property.json && property.json.$ref)
    return (
        (ref && Dereferencer(ref).name === property.name) ||
        property.name === '' ||
        !property.name ||
        // High level components are not be a ref, but are still to be treated as such
        property.name === property.component
    )
}

// TODO I believe the format can be used to provide better examples.
// eslint-disable-next-line complexity
function createRawExampleProperty(property: any, omitNotRequired: boolean): any {
    if (omitNotRequired && !property.required && !isHighLevelElement(property)) {
        return undefined
    }
    // Always use example when present. Otherwise, if a primitive type is shown, give a best
    // guess approach. Last resort, don't include if not required otherwise give parameter name.
    if (property.example && (property.type === 'number' || property.type === 'integer')) {
        return Number(property.example)
    } else if (property.example && property.type === 'boolean') {
        return Boolean(property.example)
    } else if (property.example) {
        return property.example
    } else if (property.type === 'string' && property.enum) {
        return property.default || property.enum[0]
    } else if (property.type === 'string') {
        return property.default || property.name
    } else if (property.type === 'number' || property.type === 'integer') {
        return property.default || 1
    } else if (property.type === 'boolean') {
        return !!property.default || true
    } else if (!property.required) {
        return undefined
    } else {
        return property.name
    }
}

function createExampleProperty(property: any, omitNotRequired: boolean): any {
    if (isHighLevelElement(property)) {
        return createRawExampleProperty(property, omitNotRequired)
    } else if (omitNotRequired && !property.required) {
        return {}
    }
    const example = {}
    example[property.name] = createRawExampleProperty(property, omitNotRequired)
    return example
}

function processPropertyWithChildren(property: any, children: any[] | any) {
    // Due to omitNotRequired, children objects might be empty, which means we don't
    // want to show this property as a whole. Object.keys works for objects or arrays
    const processedChildren = Object.keys(children).length === 0 ? undefined : children
    if (isHighLevelElement(property)) {
        return processedChildren
    } else {
        return {
            [property.name]: processedChildren,
        }
    }
}

// eslint-disable-next-line complexity
export default function ResourceExample(
    propertiesParsed: any,
    omitNotRequired: boolean = false,
): any {
    // No matter the type, resolve to example if present.
    if (propertiesParsed.example) {
        return createExampleProperty(propertiesParsed, omitNotRequired)
    } else if (propertiesParsed.allOf || propertiesParsed.anyOf) {
        const children = Object.assign(
            {},
            ...propertiesParsed.jsons.map((property) => ResourceExample(property, omitNotRequired)),
        )
        return processPropertyWithChildren(propertiesParsed, children)
    } else if (propertiesParsed.oneOf) {
        // The first one is picked just to be deterministic
        const first = ResourceExample(propertiesParsed.jsons[0], omitNotRequired)
        return processPropertyWithChildren(propertiesParsed, first)
    } else if (propertiesParsed.type === 'array') {
        const children = propertiesParsed.jsons.map((property) =>
            ResourceExample(property, omitNotRequired),
        )
        return processPropertyWithChildren(propertiesParsed, children)
    } else if (propertiesParsed.type === 'object') {
        const allProperties = (propertiesParsed.jsons || []).concat(
            propertiesParsed.additionalProperties || [],
        )
        const properties = isHighLevelElement(propertiesParsed)
            ? omitNotRequired && propertiesParsed.required
                ? allProperties.filter((p) => propertiesParsed.required.includes(p.name))
                : allProperties
            : allProperties
        const children = Object.assign(
            {},
            ...properties.map((property) => ResourceExample(property, omitNotRequired)),
        )
        return processPropertyWithChildren(propertiesParsed, children)
    } else if (propertiesParsed.type) {
        // it's a leaf in the JSON, we can create an example
        return createExampleProperty(propertiesParsed, omitNotRequired)
    } else {
        // Only one property so it might not be an object. Check accordingly
        if (
            (propertiesParsed as any[]).length === 1 &&
            !['object', 'allOf', 'anyOf'].includes(propertiesParsed[0].type)
        ) {
            return createRawExampleProperty(propertiesParsed[0], omitNotRequired)
        } else {
            return Object.assign(
                {},
                ...propertiesParsed.map((property) => ResourceExample(property, omitNotRequired)),
            )
        }
    }
}
