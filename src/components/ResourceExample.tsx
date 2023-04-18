import Dereferencer from '@site/src/components/Dereferencer'
import { AS_ANY_PLACEHOLDER, AS_BLOB_PLACEHOLDER } from '@site/src/utils'

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
function createRawExampleProperty(
    property: any,
    omitNotRequired: boolean,
    isLuneTsExample: boolean,
): any {
    if (omitNotRequired && !property.required && !isHighLevelElement(property)) {
        return undefined
    }

    // TODO improve on this. This is bad, but it works for now :pray:
    // 1. Determining the name of the enum is very hard. We would also need to add imports
    // to the example.
    // 2. For array of enums we might have an example but same issue as above is present.
    //
    // These cases are currently handled by adding a placeholder in the end that is substituted
    // by a type cast to 'any'. Enums work correctly since on the wire representation matches.
    // Binary also works in a similar fashion, we add a placeholder which is later substituted.
    if (isLuneTsExample && property.type === 'string' && property.enum) {
        return `${property.example || property.enum[0]}${AS_ANY_PLACEHOLDER}`
    } else if (isLuneTsExample && property.type === 'array' && property.jsons[0].enum) {
        return [`${property.jsons[0].enum[0]}${AS_ANY_PLACEHOLDER}`]
    } else if (isLuneTsExample && property.type === 'string' && property.format === 'binary') {
        return `${property.default || property.name}${AS_BLOB_PLACEHOLDER}`
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

function createExampleProperty(
    property: any,
    omitNotRequired: boolean,
    isLuneTsExample: boolean,
): any {
    if (isHighLevelElement(property)) {
        return createRawExampleProperty(property, omitNotRequired, isLuneTsExample)
    } else if (omitNotRequired && !property.required) {
        return {}
    }
    const example = {}
    example[property.name] = createRawExampleProperty(property, omitNotRequired, isLuneTsExample)
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

export default function ResourceExample(
    propertiesParsed: any,
    omitNotRequired: boolean = false,
    isLuneTsExample: boolean = false,
): any {
    // No matter the type, resolve to example if present.
    if (propertiesParsed.example) {
        return createExampleProperty(propertiesParsed, omitNotRequired, isLuneTsExample)
    } else if (propertiesParsed.allOf || propertiesParsed.anyOf) {
        const children = Object.assign(
            {},
            ...propertiesParsed.jsons.map((property) =>
                ResourceExample(property, omitNotRequired, isLuneTsExample),
            ),
        )
        return processPropertyWithChildren(propertiesParsed, children)
    } else if (propertiesParsed.oneOf) {
        // The first one is picked just to be deterministic
        const first = ResourceExample(propertiesParsed.jsons[0], omitNotRequired, isLuneTsExample)
        return processPropertyWithChildren(propertiesParsed, first)
    } else if (propertiesParsed.type === 'array') {
        const children = propertiesParsed.jsons.map((property) =>
            ResourceExample(property, omitNotRequired, isLuneTsExample),
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
            ...properties.map((property) =>
                ResourceExample(property, omitNotRequired, isLuneTsExample),
            ),
        )
        return processPropertyWithChildren(propertiesParsed, children)
    } else if (propertiesParsed.type) {
        // it's a leaf in the JSON, we can create an example
        return createExampleProperty(propertiesParsed, omitNotRequired, isLuneTsExample)
    } else {
        // If we're referring to a single high level element we don't want to resolve it as an object.
        if ((propertiesParsed as any[]).length === 1 && isHighLevelElement(propertiesParsed)) {
            return ResourceExample(propertiesParsed[0], omitNotRequired, isLuneTsExample)
        } else {
            return Object.assign(
                {},
                ...propertiesParsed.map((property) =>
                    ResourceExample(property, omitNotRequired, isLuneTsExample),
                ),
            )
        }
    }
}
