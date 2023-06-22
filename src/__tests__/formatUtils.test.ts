import { camelCaseToSentenceCase } from '@site/src/formatUtils'

describe('utils', () => {
    test.each([
        ['hello', 'Hello'],
        ['helloThere', 'Hello there'],
        ['hello there', 'Hello there'],
        ['helloThereTiger', 'Hello there tiger'],
        ['ABC123', 'A b c123'],
        ['ABCCode', 'A b c code'],
    ])('camelCaseToSentenceCase should return the expected string', (input, expected) => {
        expect(camelCaseToSentenceCase(input)).toEqual(expected)
    })
})
