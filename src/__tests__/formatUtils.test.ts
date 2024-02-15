import { camelCaseToSentenceCase } from '@site/src/formatUtils'

describe('utils', () => {
    test.each([
        ['hello', 'Hello'],
        ['helloThere', 'Hello there'],
        ['hello there', 'Hello there'],
        ['helloThereTiger', 'Hello there tiger'],
        ['ABC123', 'ABC123'],
        ['ABCCode', 'ABC code'],
        ['IdentifiedVesselByIMOShippingMethod', 'Identified vessel by IMO shipping method'],
    ])('camelCaseToSentenceCase should convert "%s" to "%s"', (input, expected) => {
        expect(camelCaseToSentenceCase(input)).toEqual(expected)
    })
})
