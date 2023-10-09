import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import useIsBrowser from '@docusaurus/useIsBrowser'
import { decrypt } from '@site/src/crypto'
import { getPublishableKey } from '@site/src/utils'
import { Buffer } from 'buffer'
import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'

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

const Gated = ({ children, wrapper }: { children: string; wrapper?: React.ReactNode }) => {
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

    return wrapper && content !== undefined ? wrapper(content) : <>{content}</>
}

export const GatedMarkdown = ({ children }: { children: string }) => {
    return <Gated wrapper={(c) => <ReactMarkdown>{c}</ReactMarkdown>}>{children}</Gated>
}

export default Gated
