import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment'
import useIsBrowser from '@docusaurus/useIsBrowser'
import { decrypt } from '@site/src/crypto'
import { getPublishableKey } from '@site/src/utils'
import { Buffer } from 'buffer'
import React, { useState } from 'react'

if (ExecutionEnvironment.canUseDOM) {
    window.Buffer = window.Buffer || Buffer
}

async function decryptOrUndefined(c: string, key: string): Promise<string | undefined> {
    try {
        return decrypt(c, key)
    } catch (err) {
        // swallow
        return undefined
    }
}

const Gated = ({ children }: { children: string }) => {
    const isBrowser = useIsBrowser()
    const [content, setContent] = useState<string | undefined>()

    if (isBrowser) {
        const key = getPublishableKey()
        if (key) {
            decryptOrUndefined(children, key).then((content) => setContent(content))
        }
    }

    return <>{content}</>
}

export default Gated
