---
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

<Tip>

Note: This functionality is currently on beta and should not be relied on without some initial
human verification of the results. Contact us to improve the results of this functionality on
your particular use case.

</Tip>

</div>
<div>

## Prerequisites

In order to proceed with the steps provided you need

-   A Lune API key
-   cURL and jq installed (or be willing to adapt the procedure to your tools)

</div>
<div>

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

The sample request provided combines both inputs: it is known that the
transaction was done in US dollars and refers to `cloud computing` services while
more detailed information is extracted from the receipt via OCR.

</div>
</div>

<div className="miniSections">

<Snippet
header="Sample request"
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

## Making the request

Once you have the right data send it to the Lune API like so:

</div>
</div>

<div className="miniSections">

<Snippet
header="Sample cURL command"
language="bash"
code={`curl 'https://api.lune.co/v1/estimates/smart-scan' \\
  -H "Authorization: Bearer $API_KEY" \\
  -H 'Content-Type: application/json' \\
  -X POST \\
  -d '{
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
}'`}/>

</div>

</ApiReferenceSection>

<ApiReferenceSection>

<div className="paragraphSections">

<div>

## Interpreting the response

If everything goes well you should see a response similar to the presented here. The
`mass` and `quote` fields contain informantion about the estimate as whole, while
`line_items` contains detailed information about each line item detected in the input.

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
    ...
  },
  "line_items": [
    {
      "mass": {
        "unit": "t",
        "amount": "0.00172"
      },
      "type": "transaction",
      "diet_factor": null,
      "exchange_rate": null,
      "emission_factor": {
        "id": "XJvWdBbNaDVokYz0GlqAP9lZG6zwj7K1",
        "name": "Data processing and hosting",
        "region": "United States of America",
        "source": "epa",
        "category": "cloud computing",
        "created_at": "2024-07-24T14:00:13.489Z",
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
    },
    {
      "mass": {
        "unit": "t",
        "amount": "0.0344"
      },
      "type": "transaction",
      "diet_factor": null,
      "exchange_rate": null,
      "emission_factor": {
        "id": "XJvWdBbNaDVokYz0GlqAP9lZG6zwj7K1",
        "name": "Data processing and hosting",
        "region": "United States of America",
        "source": "epa",
        "category": "cloud computing",
        "created_at": "2024-07-24T14:00:13.489Z",
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
  ],
  ...
}`}/>

</div>

</ApiReferenceSection>

</div>
