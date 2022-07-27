import React from 'react'
import clsx from 'clsx'
import styles from './styles.module.css'
import Parameter from '../Parameter'

export default function ResourceParser(props: { json: any }): JSX.Element {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">RESOURCE</div>
                <div className="row">Showing JSON: {JSON.stringify(props.json, null, 2)}</div>
            </div>
        </section>
    )
}
