import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import useIsBrowser from '@docusaurus/useIsBrowser'
import { decrypt } from '@site/src/crypto'
import { getPublishableKey } from '@site/src/utils'
import { Buffer } from 'buffer'
import React, { useEffect, useState } from 'react'

if (ExecutionEnvironment.canUseDOM) {
    window.Buffer = window.Buffer || Buffer
}

async function decryptOrUndefined(c: string, key: string): Promise<string | undefined> {
    try {
        return decrypt(c, key)
    } catch (err) {
        console.log(err)
        return undefined
    }
}

const Gated = ({ children }: { children: string }) => {
    const isBrowser = useIsBrowser()
    const [content, setContent] = useState<string | undefined>()
    const { siteConfig } = useDocusaurusContext()

    useEffect(() => {
        if (isBrowser) {
            const key = siteConfig.customFields.DOCS_PUBLISHABLE_KEY ?? getPublishableKey()
            if (key) {
                decryptOrUndefined(children, key).then((content) => setContent(content))
            }
        }
    }, [content, isBrowser, siteConfig])

    return <>{content}</>
}

export default Gated