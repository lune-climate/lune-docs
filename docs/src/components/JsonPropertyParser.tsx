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

// eslint-disable-next-line complexity
export default function JsonPropertyParser(props: {
    json: any
    name?: string
    type?: string
    required?: string[]
}): any {
    if (props.json.oneOf || props.json.allOf || props.json.anyOf) {
        const type = props.json.oneOf ? 'oneOf' : props.json.allOf ? 'allOf' : 'anyOf'
        return {
            ...props.json,
            name: props.name,
            type,
            jsons: props.json[type].map((element) => {
                const derefencedItem = Dereferencer(element)
                return JsonPropertyParser({
                    name: element.name || derefencedItem.name || DEFAULT_PROPERTY_NAME,
                    json: derefencedItem,
                })
            }),
        }
    } else if (props.json.type === 'array') {
        const derefencedItem = Dereferencer(props.json.items)
        return {
            ...props,
            name: props.name,
            type: props.json.type,
            required: props.required && props.name && props.required.includes(props.name),
            description: props.json.description,
            jsons: [JsonPropertyParser({ ...derefencedItem, json: derefencedItem })],
        }
    } else if (props.json.type === 'object') {
        return {
            ...props,
            name: props.name,
            type: props.json.type,
            description: props.json.description,
            jsons: Object.keys(props.json.properties || []).map((property) => {
                const derefencedItem = Dereferencer(props.json.properties[property], property)
                return JsonPropertyParser({
                    ...derefencedItem,
                    json: derefencedItem,
                    required: props.json.required,
                })
            }),
        }
    } else {
        const derefencedItem = Dereferencer(props.json || props, props.name)
        return {
            ...derefencedItem,
            jsons: (derefencedItem.jsons || []).concat(derefencedItem.additionalProperties || []),
            name: derefencedItem.name,
            type: derefencedItem.type,
            required:
                props.required &&
                derefencedItem.name &&
                props.required.includes(derefencedItem.name),
            description: derefencedItem.description,
        }
    }
}
