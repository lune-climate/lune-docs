import React from 'react'
import clsx from 'clsx'
import styles from './styles.module.css'

export default function Parameter(props: {
    name: String
    metadata: any
    required: any[]
    discriminator: any
}): JSX.Element {
    return (
        <section className={styles.features}>
            <span class="parameterName">Name: {props.name}</span>
        </section>
    )
}
