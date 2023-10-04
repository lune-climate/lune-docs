import { generateKey } from '@site/src/crypto'

async function main() {
    console.log(await generateKey())
}

main()
