import { getApiKey } from '@site/src/utils'
import { Snippet as UISnippet } from 'lune-ui-lib'
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
            language={language}
            header={header}
            toCopy={code}
            children={code}
            sx={{
                maxHeight: '450px',
            }}
        />
    )
}
