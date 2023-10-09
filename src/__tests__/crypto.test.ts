import { generateKey, encrypt, decrypt } from '@site/src/crypto'

describe('crypto', () => {
    test('generatedKey should generate a key with a semi-colon', async () => {
        const key = await generateKey()
        expect(key).toContain(';')
    })

    test('decrypt should decrypt encrypted text', async() => {
        const text = 'yabadabadoooooooo'
        const key = await generateKey()
        const encrypted = await encrypt(text, key)
        const decrypted = await decrypt(encrypted, key)
        expect(decrypted).toEqual(text)
    })

    test('decrypt should not decrypt encrypted text with a different key', async() => {
        const text = 'yabadabadoooooooo'
        const key = await generateKey()
        const differentKey = await generateKey()
        const encrypted = await encrypt(text, key)

        expect(async () => { await decrypt(encrypted, differentKey)}).rejects.toThrow()
    })
})
