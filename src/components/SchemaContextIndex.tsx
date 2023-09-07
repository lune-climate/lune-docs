import { APISchemaContext } from '@site/src/components/APISchemaContext'
import { LogisticsSheetsSchemaContext } from '@site/src/components/LogisticsSheetsSchemaContext'
import React from 'react'

export type SchemaFilename = 'api-schema.yml' | 'logistics-csv-schema.yml'

export const SchemaContextIndex = React.createContext<Record<SchemaFilename, any>>({
    'api-schema.yml': APISchemaContext,
    'logistics-csv-schema.yml': LogisticsSheetsSchemaContext,
})
