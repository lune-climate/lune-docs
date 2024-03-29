import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { useLocation } from '@docusaurus/router'
import { decrypt } from '@site/src/crypto'

export const AS_BLOB_PLACEHOLDER = '_AS_BLOB_PLACEHOLDER_'

export function formatPath(operationId: string): string {
    // We either receive camelCase, UpperCamelCase, Sentence case or Title Case. Make it all camelCase
    const camelCase = operationId
        // Convert Sentence case to Title Case
        .replace(/ ([a-z])/, (v) => v.toUpperCase())
        // Convert Title Case to UpperCamelCase
        .replace(' ', '')
        // Convert UpperCamelCase to camelCase
        .replace(/^([A-Z])[a-z]/, (v) => v.toLowerCase())
    return (
        camelCase
            .replace(/([A-Z])[a-z]/g, function (v) {
                return `-${v.toLowerCase()}`
            })
            // Make acronyms lowercase
            .toLowerCase()
    )
}

export function snakeToCamelCase(value: string): string {
    const v = value.replace(/(_[a-z])/g, (v) => `${v.slice(1).toUpperCase()}`)
    return v.charAt(0).toLowerCase().concat(v.slice(1))
}

export function getApiKey(): string | undefined {
    return ExecutionEnvironment.canUseDOM
        ? document.cookie
              .split('; ')
              .find((row) => row.startsWith('docs_test_api_key='))
              ?.split('=')[1]
        : undefined
}

export function getPublishableKey(): string | undefined {
    if (!ExecutionEnvironment.canUseDOM) {
        return undefined
    }

    const cookie = document.cookie
        .split('; ')
        .find((row) => row.startsWith('docs_publishable_key='))

    if (!cookie) {
        return undefined
    }

    const encodedCookieValue = cookie.split('=')[1]

    if (!encodedCookieValue) {
        return undefined
    }

     return decodeURIComponent(encodedCookieValue)
}

export async function isLoggedIn(): Promise<boolean> {
    const key = getPublishableKey()
    // manually encrypted
    const payload = 'KZRn1K9OX1o5P4wk25na3vYS6tj5'
    try {
        await decrypt(payload, key)
        return true
    } catch (err) {
        console.log(err)
        return false
    }
}

export function getApiDomain(): string {
    const { siteConfig } = useDocusaurusContext()
    return siteConfig.customFields.API_DOMAIN
}

// Docusaurus paths work differently depending on whether docusaurus was built or is running in development mode.
// If docusaurus was built, useLocation().pathname paths are generated at compile time.
//  No trailing slashes are added at compile time. Trailing slashes at runtime add by browsers "just work".
// If docusaurus is run in development mode, useLocation().pathname gets the path from the URL, which may include slashes.
//  Note: In development, docusaurus does not run a server at all.
export function useRelativePathPrefix(): string {
    const location = useLocation()

    const path =
        ExecutionEnvironment.canUseDOM && location.pathname.slice(-1) === '/'
            ? location.pathname.slice(0, -1)
            : location.pathname

    return path
}

export const indent = (str: string, count: number, space: string = ' '): string => {
    return str.replace(/^/gm, space.repeat(count))
}
