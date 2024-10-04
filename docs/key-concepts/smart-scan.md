---
sidebar_position: 12
sidebar_label: Smart Scan
hide_table_of_contents: true
---

import Snippet from '@site/src/components/Snippet'
import { ApiReferenceSection } from 'lune-ui-lib'
import Tip from '@site/src/components/Tip';

# Smart scan

<div className="sections">

<ApiReferenceSection>
<div className="paragraphSections">

<div>

The smart scan functionality allows you to provide data in multiple formats without any
prior knowledge of the data structure. Lune analyses this input, deduces the transactions, and
calculates the associated emissions.

This functionality is beneficial for cases where you have no concrete information regarding
transactions you want to estimate, but have several pieces of data that can help guide this
discovery such as receipts, invoices, and emails. By leveraging various data sources, smart scan
enables a more comprehensive understanding of your financial activities and their environmental
impact, even when dealing with fragmented or diverse information.

<Tip>

Note: This feature is in beta. Please verify results manually. Contact us to help improve its
accuracy for your specific needs.

</Tip>

</div>
</div>

<>

![Smart Scan](/img/smart-scan.png)

</>

</ApiReferenceSection>

<ApiReferenceSection>
<div className="paragraphSections">

<div>

## Input data

The smart scan functionality accepts data in two main formats:

1. **Structured transaction estimate data**

    - Similar to [Transaction estimates](/api-reference/emission-estimates/create-transaction-estimate)
    - Allows you to define known properties of the estimates
    - Guarantees these fields will be respected regardless of other input

2. **Unstructured data in text format**
    - Can contain any relevant information about the transactions
    - Lune parses this to extract relevant data
    - Combined with structured data to produce a final estimate
    - Examples: OCR data extracted from invoices, receipts, etc.

### How It Works

1. Lune analyzes both structured and unstructured data
2. Extracts relevant information from unstructured text
3. Combines this with any provided structured data
4. Produces a final emission estimate

### Example Use Case

-   **Transaction**: US dollar payment for cloud computing services
-   **Scenario**: Full transaction details are on an invoice, not known by the client
-   **Data**: Mindee was used to extract information from the invoice

This approach allows for accurate emission estimates even when complete transaction
details are not initially available to the client.

</div>
</div>

<div className="miniSections">

<Snippet
header="Sample request body"
language="json"
code={`{
    "currency": "USD",
    "merchant": {
      "category": "cloud computing"
    },
    "unstructured_data": {
      "key_value": {
        "prediction": {
          "locale": {
            "language": "en",
            "currency": "USD"
          },
          "line_items": [
            {
              "description": "AWS Lambda",
              "total_amount": 10
            },
            {
              "description": "AWS EC2",
              "total_amount": 200
            }
          ]
        }
      }
    }
}`}/>

</div>

</ApiReferenceSection>

<ApiReferenceSection>

<div className="paragraphSections">

<div>

## The smart scan estimate

A smart scan estimate contains information about the provided transaction as a whole
but also detailed information about the detailed items when possible.

The `mass` and `quote` fields contain total information about the estimate, showcasing
the total emissions and the appropriate quote to offset it in Lune.

The `line_items` field contains detailed information about item detected in the input.
This field will always contain at least one element. At this point in time, only
estimates of type `transaction` can be produced, but emissions that are calculated
based on the actual activity that happened (for example flying from Porto to London)
is coming in the near future.

See on the right a sample response for the input seen above. Several fields are ommitted
to keep things more readable.

</div>
</div>

<div className="miniSections">

<Snippet
header="Sample emission response (only the relevant parts)"
language="json"
code={`{
  "mass": {
    "unit": "t",
    "amount": "0.03612"
  },
  "quote": {
    "currency": "GBP",
    "estimated_quantity": "0.03612",
  },
  "line_items": [
    {
      "mass": {
        "unit": "t",
        "amount": "0.00172"
      },
      "type": "transaction",
      "emission_factor": {
        "name": "Data processing and hosting",
        "region": "United States of America",
        "source": "epa",
        "category": "cloud computing",
        "gas_emissions": {
          "co2": "0.139",
          "co2e": "0.172",
          "other": "0.008",
          "methane": "0.001",
          "nitrous_oxide": "0"
        },
        "numerator_unit": "kg",
        "denominator_unit": "USD",
      },
    },
    {
      "mass": {
        "unit": "t",
        "amount": "0.0344"
      },
      "type": "transaction",
      "emission_factor": {
        "name": "Data processing and hosting",
        "region": "United States of America",
        "source": "epa",
        "category": "cloud computing",
        "gas_emissions": {
          "co2": "0.139",
          "co2e": "0.172",
          "other": "0.008",
          "methane": "0.001",
          "nitrous_oxide": "0"
        },
        "numerator_unit": "kg",
        "source_version": "1.1.1",
        "denominator_unit": "USD",
        "publication_year": 2022
      },
      "exchange_rate_date": null
    }
  ]
}`}/>

</div>

</ApiReferenceSection>

</div>
