import { decrypt } from '@site/src/crypto'

async function main() {
    const key = process.env.DOCS_PUBLISHABLE_KEY
    if (!key) {
        console.log(`DOCS_PUBLISHABLE_KEY environment variable must be set`)
        return
    }

    const stdin = process.openStdin()
    let cypherText = ''
    stdin.on('data', (chunk) => {
        cypherText += chunk
    });

    stdin.on('end', async () => {
        const clearText = await decrypt(cypherText, key)
        console.log(clearText)

        process.exit(0)
    })
}

main()
