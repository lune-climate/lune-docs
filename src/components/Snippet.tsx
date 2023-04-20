import { getApiKey } from '@site/src/utils'
import { Snippet as UISnippet, SnippetItem } from 'lune-ui-lib'
import React from 'react'

export default function Snippet({
    code,
    language,
    header,
}: {
    code: string
    language?: Pick<Parameters<UISnippet>, 'language'>
    header?: Pick<Parameters<UISnippet>, 'header'>
}) {
    const apiKey = getApiKey()
    code = apiKey ? code.replace('$API_KEY', apiKey) : code

    return (
        <UISnippet
            header={header}
            sx={{
                maxHeight: '450px',
            }}
        >
            <SnippetItem language={language} toCopy={code}>
                {code}
            </SnippetItem>
        </UISnippet>
    )
}
