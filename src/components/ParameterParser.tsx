import Dereferencer from '@site/src/components/Dereferencer'
import JsonPropertyParser from '@site/src/components/JsonPropertyParser'

export default function ParameterParser(props: {
    name: string
    in: string
    required?: boolean
    description?: string
    schema: any
}): any {
    // Some parameters are primitives, other have a schema. Handle them both by
    // trying to derefence both levels and inserting both in the result object.
    const derefencedParameter = Dereferencer(props, props.name)
    const derefencedParameterSchema = Dereferencer(props.schema, props.schema?.name)
    const parsedStuff = JsonPropertyParser({
        ...derefencedParameter,
        json: derefencedParameter.schema,
    })
    return {
        ...parsedStuff,
        ...derefencedParameterSchema,
        ...derefencedParameter,
        ...derefencedParameter.schema,
        name: derefencedParameter.name,
        required: !!derefencedParameter.required,
        description: derefencedParameter.description,
    }
}
