import { readFile, writeFile } from 'fs/promises'

import { decrypt } from '@site/src/crypto'

async function main() {
    const key = process.env.DOCS_PUBLISHABLE_KEY
    if (!key) {
        console.log(`DOCS_PUBLISHABLE_KEY environment variable must be set`)
        return
    }

    const paths = process.argv.slice(2)
    if (paths.length === 0) {
        console.log('You need to provide paths to files to decrypt')
        process.exit(1)
    }

    for (const path of paths) {
        console.log(`Decrypting ${path}...`)
        let content = (await readFile(path)).toString()
        for (const m of content.matchAll(/<GatedMarkdown>(.+?)<\/GatedMarkdown>/g)) {
            const fullFragment = m[0]
            const cipherText = m[1]
            const plainText = await decrypt(cipherText, key)
            content = content.replace(fullFragment,
                `<!-- BEGIN GATED CONTENT, DO NOT COMMIT THIS AS-IS -->
${plainText}
<!-- END GATED CONTENT, DO NOT COMMIT THIS AS-IS -->`)
        }

        await writeFile(path, content)
    }
    process.exit(0)
}

main()
