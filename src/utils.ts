import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { useLocation } from '@docusaurus/router'

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
    const { siteConfig } = useDocusaurusContext()
    if (siteConfig.customFields.DOCS_PUBLISHABLE_KEY) {
        return siteConfig.customFields.DOCS_PUBLISHABLE_KEY
    }

    return ExecutionEnvironment.canUseDOM
        ? document.cookie
              .split('; ')
              .find((row) => row.startsWith('docs_publishable_key='))
              ?.split('=')[1]
        : undefined

    if (!ExecutionEnvironment.canUseDOM) {
        return undefined
    }

    const encodedCookieValue = document.cookie
        .split('; ')
        .find((row) => row.startsWith('docs_test_api_key='))
        ?.split('=')[1]

     if (!encodedCookieValue) {
        return undefined
     }
     return decodeURIComponent(encodedCookieValue)
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
