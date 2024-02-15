import { camelCaseToSentenceCase } from '@site/src/formatUtils'

describe('utils', () => {
    test.each([
        ['hello', 'Hello'],
        ['helloThere', 'Hello there'],
        ['hello there', 'Hello there'],
        ['helloThereTiger', 'Hello there tiger'],
        ['ABC123', 'A b c123'],
        ['ABCCode', 'A b c code'],
    ])('camelCaseToSentenceCase should convert "%s" to "%s"', (input, expected) => {
        expect(camelCaseToSentenceCase(input)).toEqual(expected)
    })
})
