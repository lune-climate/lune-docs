import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment'
import { useState } from 'react'

export default function useApiKey(dashboardDomain: string) {
    if (!ExecutionEnvironment.canUseDOM) {
        return {
            apiKey: undefined,
            setApiKey: () => {},
            refetchFromDashboard: () => {},
        }
    }

    const getApiKey = (): string | undefined => {
        return localStorage.getItem('apiKey') ?? undefined
    }

    // We use this to prevent creating multiple iframes. They take time and resources to load
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [apiKey, setApiKey] = useState<string | undefined>(getApiKey())

    const saveApiKey = (newApiKey: string | undefined) => {
        if (newApiKey === undefined) {
            localStorage.removeItem('apiKey')
        } else {
            localStorage.setItem('apiKey', newApiKey)
        }
        setApiKey(newApiKey)
    }

    const refetchFromDashboard = async () => {
        if (!isLoading) {
            // This creates an IFrame to fetch the test API key from the dashboard localStorage
            // The IFrame is removed after the message has been received.
            setIsLoading(true)
            const url = `${dashboardDomain}/post-message/receiver.html`
            const iframe = document.createElement('iframe') as HTMLIFrameElement
            iframe.style.display = 'none'

            const storeApiKey = (event) => {
                if (event.data !== undefined) {
                    saveApiKey(JSON.parse(event.data).fullSecret)
                } else {
                    saveApiKey(undefined)
                }
                document.body.removeChild(iframe)
                setIsLoading(false)
            }
            window.addEventListener('message', storeApiKey, { once: true })
            // IFrame needs to be fully loaded to perform postMessage
            iframe.addEventListener('load', function () {
                // We don't have multiple message types, so the actual message here is unused.
                iframe.contentWindow!.postMessage('fetch_test_api_key', dashboardDomain)
            })
            iframe.src = url
            document.body.appendChild(iframe)
        }
    }

    return {
        apiKey,
        setApiKey: saveApiKey,
        refetchFromDashboard,
    }
}
