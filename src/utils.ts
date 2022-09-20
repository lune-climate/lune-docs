import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

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

export function getApiKey(): string | undefined {
    return ExecutionEnvironment.canUseDOM
        ? document.cookie
              .split('; ')
              .find((row) => row.startsWith('docs_test_api_key='))
              ?.split('=')[1]
        : undefined
}

export function getApiDomain(): string {
    const { siteConfig } = useDocusaurusContext()
    return siteConfig.customFields.API_DOMAIN
}

// Due to some browsers automatically adding trailing slashes, and since trailing slashes require
// different paths to children references, this provides a suffix to be consistent in all use cases
export function getRelativePathPrefix(): string {
    return ExecutionEnvironment.canUseDOM
        ? window.location.href.slice(-1) === '/'
            ? '../'
            : ''
        : ''
}
