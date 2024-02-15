/*
 * Keep this file free from docusaurus imports
 *
 * jest returns the following errors:
 *
 *    Cannot find module '@docusaurus/ExecutionEnvironment' or its corresponding type declarations.
 *
 *    1 import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment'
 *                                       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *    error TS2307: Cannot find module '@docusaurus/useDocusaurusContext' or its corresponding type declarations.
 *
 *    2 import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
 *                                       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *    error TS2307: Cannot find module '@docusaurus/router' or its corresponding type declarations.
 *
 *    3 import { useLocation } from '@docusaurus/router'
 *
 */

export function camelCaseToSentenceCase(s: string): string {
    // Intermediate stage, spaceSeparated will contain something like 'asd QWE Zxc Xxx'
    const spaceSeparated = s
        .replace(/(?!^)([A-Z][a-z]+)/g, ' $1')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
    const caseCorrected = spaceSeparated
        .replace(/^(.)/, part => part.toUpperCase())
        .replace(/(?!^)([A-Z][a-z])/g, part => part.toLowerCase())
    return caseCorrected
}
