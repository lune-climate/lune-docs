import Dereferencer from '@site/src/components/Dereferencer'

export default function ParameterParser(props: {
    name: string
    in: string
    required?: boolean
    description?: string
    schema: any
}): any {
    const derefencedParameter = Dereferencer(props, props.name)
    return {
        ...derefencedParameter,
        ...derefencedParameter.schema,
        name: derefencedParameter.name,
        required: !!derefencedParameter.required,
        description: derefencedParameter.description,
    }
}
