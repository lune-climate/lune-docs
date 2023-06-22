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
import * as to from 'to-case'

export function camelCaseToSentenceCase(s: string): string {
    return to.sentence(s.replace(/([A-Z])/g, ' $1'))
}
