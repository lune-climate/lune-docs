import Dereferencer from '@site/src/components/Dereferencer'

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
            type: type,
            jsons: props.json[type].map((element) => {
                const derefencedItem = Dereferencer(element)
                return JsonPropertyParser({
                    name: element.name || derefencedItem.name,
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
