export default function ParameterParser(props: {
    name: string
    in: string
    required?: boolean
    description?: string
    schema: any
}): any {
    return {
        ...props,
        ...props.schema,
        name: props.name,
        required: !!props.required,
        description: props.description,
    }
}
