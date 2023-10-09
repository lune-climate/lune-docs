let crypto
if (typeof window !== 'undefined') {
    crypto = window.crypto
} else {
    // node 16 only
    const { webcrypto } = require('crypto')
    crypto = webcrypto
}

export async function generateKey(): Promise<string> {
     const generatedKey = await crypto.subtle.generateKey(
         {
             name: "AES-GCM",
             length: 256,
         },
         true,
         ["encrypt", "decrypt"],
     )

    const exportableKey = await crypto.subtle.exportKey('raw', generatedKey)
    const encodedKey = Buffer.from(exportableKey).toString('base64')

    // Initialization vector (salt)
    // Should be store alongside the encrypted text but I am adding it to the key.
    // Not a big deal in this case: it's just content.
    const iv = crypto.getRandomValues(new Uint8Array(16));

    const encodedIv = Buffer.from(iv).toString('base64')
    const key = `${encodedKey};${encodedIv}`
    return key
}

export async function parseKey(key: string): Promise<{ key: CryptoKey, iv: Buffer }> {
    const [encodedKey, encodedIv] = key.split(';')
    if (!encodedKey || !encodedIv) {
        throw new Error('Invalid key')
    }

    const cryptoKey = await crypto.subtle.importKey(
        'raw',
        Buffer.from(encodedKey, 'base64'),
        { name: 'AES-GCM' },
        true,
        ['encrypt', 'decrypt']
    );
    const iv = Buffer.from(encodedIv, 'base64')

    return { key: cryptoKey, iv }
}

export async function encrypt(clearText: string, key: string): Promise<string> {
    const { key: cryptoKey, iv } = await parseKey(key)
    const encryptedText = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        cryptoKey,
        new TextEncoder().encode(clearText),
    )
    const encodedText = Buffer.from(encryptedText).toString('base64')
    return encodedText
}

export async function decrypt(cypherText: string, key: string): Promise<string> {
    const { key: cryptoKey, iv } = await parseKey(key)
    const encryptedText = Buffer.from(cypherText, 'base64')
    const clearText = new TextDecoder().decode(await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        cryptoKey,
        encryptedText
    ))
    return clearText
}
