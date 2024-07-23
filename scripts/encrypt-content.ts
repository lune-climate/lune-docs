import { encrypt } from '@site/src/crypto'

async function main() {
    const key = process.env.DOCS_PUBLISHABLE_KEY
    if (!key) {
        console.log(`DOCS_PUBLISHABLE_KEY environment variable must be set`)
        return
    }

    const stdin = process.stdin
    let clearText = ''
    stdin.on('data', (chunk) => {
        clearText += chunk
    });

    stdin.on('end', async () => {
        const cypherText = await encrypt(clearText, key)
        console.log(cypherText)

        process.exit(0)
    })
}

main()
