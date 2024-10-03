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

In this guide we'll explore calculating transaction emissions via the smart scan functionality.

The smart scan functionality allows you to provide data in multiple formats and without any
prior knowledge of the data structure. Lune analyses this input and deduces the transactions
that took place and calculates the associated emissions.

This functionality is particularly useful for cases where you have no concrete information
regarding transactions which you want to estimate, but have several pieces of data that can
help guide this discovery: receipts, invoices, emails etc.

<Tip>

Note: This functionality is currently on beta and should not be relied on without some initial
human verification of the results. Contact us to improve the results of this functionality on
your particular use case.

</Tip>

</div>
</div>

<>

![AIS](/img/smart-scan.png)

</>

</ApiReferenceSection>

<ApiReferenceSection>
<div className="paragraphSections">

<div>

## Input data

The smart scan functionality accepts a combination of data in two main formats:

-   Structured transaction estimate data, similar to [Transaction estimates](/api-reference/emission-estimates/create-transaction-estimate)
-   Unstructured data in a text format. Information regarding the transactions for which we want to calculate emissions should be present.

The structured transaction estimate data allows to define any properties that
you have prior knowledge regarding the estimates, guaranteeing that these fields
will be respected regardless of any other input.

The unstructured text data can contain any relevant information. Lune will parse
this and extract any relevant data, combining it with the structured data to
produce a final estimate. This can be for example OCR data extracted from
invoice, receipts etc.

The example provided is for a case of a transaction done in US dollars for
`cloud computing` services. The full details of this transaction are present on a
receipt and not known by the client, instead OCR is ran on this receipt and the
information sent to Lune which extracts the transaction information and creates
the appropriate smart scan emission estimate.

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
