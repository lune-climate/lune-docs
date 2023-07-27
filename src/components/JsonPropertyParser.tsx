import Dereferencer from '@site/src/components/Dereferencer'

// There are cases where a property does not have any name that can be associated with it.
// This happens on schemaCombinations (allOf, oneOf). As an example:
// oneOf:
//   - type: object
//     properties:
//       mass:
//         $ref: '#/components/schemas/Mass'
//
// This field does not have a name, but a name is always required. For those cases, just
// show an empty string
const DEFAULT_PROPERTY_NAME = ''

// TODO break this complexity further
// eslint-disable-next-line complexity
export default function JsonPropertyParser(props: {
    json: any
    name?: string
    component?: string
    type?: string
    required?: string[] | boolean
    nullable?: boolean
    level?: number
    oneOfDefault?: boolean
}): any {
    const level = props.level ?? 0
    if (props.json.oneOf || props.json.allOf || props.json.anyOf) {
        const type = props.json.oneOf ? 'oneOf' : props.json.allOf ? 'allOf' : 'anyOf'
        const children = props.json[type].map((element) => {
            const derefencedItem = Dereferencer(element)
            return JsonPropertyParser({
                name:
                    element['x-lune-name'] ||
                    element.name ||
                    derefencedItem['x-lune-name'] ||
                    derefencedItem.name ||
                    DEFAULT_PROPERTY_NAME,
                json: derefencedItem,
                level: level + 1,
                oneOfDefault: derefencedItem['x-lune-oneof-default'],
            })
        })

        // In OpenAPI, oneOf accepts an array, therefore we cannot set the default on the oneOf
        // but must set this information on one child.
        // JsonProperty, however, requires the default on the oneOf, therefore we need to move
        // the default name from the child to the parent.
        const defaultNames =
            type === 'oneOf'
                ? children.filter((element) => {
                      return element.oneOfDefault === true
                  })
                : []

        if (defaultNames.length > 1) {
            throw new Error(`A oneOf cannot have more than one default: ${defaultNames}`)
        }

        return {
            ...props.json,
            $ref:
                props.json.$ref ||
                (props.json.component && `#/components/schemas/${props.json.component}`),
            name: props['x-lune-name'] ?? props.name,
            type,
            nullable: props.nullable,
            jsons: children,
            ...(type === 'oneOf' && defaultNames.length === 1
                ? {
                      defaultName: defaultNames[0].name,
                  }
                : {}),
        }
    } else if (props.json.type === 'array') {
        const derefencedItem = Dereferencer(props.json.items)
        return {
            ...props,
            name: props['x-lune-name'] ?? props.name,
            type: props.json.type,
            $ref:
                props.json.$ref ||
                (props.json.component && `#/components/schemas/${props.json.component}`),
            example: props.json.example,
            required:
                level === 0 ||
                props.required === true ||
                (props.required && props.name && props.required.includes(props.name)),
            nullable: props.nullable,
            description: props.json.description,
            jsons: [
                JsonPropertyParser({ ...derefencedItem, json: derefencedItem, level: level + 1 }),
            ],
        }
    } else if (props.json.type === 'object') {
        return {
            ...props,
            name: props['x-lune-name'] ?? props.name,
            type: props.json.type,
            $ref: props.json.$ref || `#/components/schemas/${props.json.component}`,
            example: props.json.example,
            description: props.json.description,
            required: props.required,
            nullable: props.nullable,
            jsons: Object.keys(props.json.properties || []).map((property) => {
                const derefencedItem = Dereferencer(props.json.properties[property], property)
                return JsonPropertyParser({
                    ...derefencedItem,
                    json: derefencedItem,
                    required: props.json.required,
                    nullable: props.json.nullable,
                    level: level + 1,
                })
            }),
        }
    } else {
        const derefencedItem = Dereferencer(props.json || props, props.name)
        return {
            ...derefencedItem,
            jsons: (derefencedItem.jsons || []).concat(derefencedItem.additionalProperties || []),
            name: derefencedItem['x-lune-name'] ?? derefencedItem.name,
            type: derefencedItem.type,
            example: derefencedItem.example,
            required:
                props.required === true ||
                (props.required &&
                    derefencedItem.name &&
                    props.required.includes(derefencedItem.name)),
            nullable: props.nullable,
            $enum: props.json.enum,
            description: derefencedItem.description,
        }
    }
}
