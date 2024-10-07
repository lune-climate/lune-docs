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

In this guide we'll explore calculating [smart scan emission estimates](/key-concepts/smart-scan)
using an invoice processed in Mindee.

Mindee performs OCR of receipts, the output of which is supported by Lune to estimate emissions.

</div>
<div>

## Prerequisites

In order to proceed with the steps provided you need

-   A Mindee account and are already scanning invoices.
-   An invoice you want to create an emission estimate for
-   A Lune API key
-   cURL and jq installed or your preferred tools

</div>
<div>

</div>

</div>

<>

![Smart Scan](/img/smart-scan.png)

</>

</ApiReferenceSection>

<ApiReferenceSection>
<div className="paragraphSections">

<div>

## Creating the smart scan estimate

The first thing is to extract the invoice information using Mindee. This can then be used
as the unstructured data when contacting Lune.

Build a smart scan estimate request.
[here](/api-reference/emission-estimates/create-smart-scan-estimate). The `unstructured_data`
property will be used to send Mindee response, adapt all other fields as you see fit.

For this example, let's make it a scenario where we know beforehand that all of our
receipts will be in USD and the category is `cloud computing`. To use the previously
extracted invoice information and contact Lune in order to create the smart scan estimate
we can use the sample command

<Tip>

Note: The command assumes the file downloaded in Mindee is called `mindee.json` and is
present in the folder where you are running the command, adapt the filename with the
correct path as necessary.

</Tip>

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
      "key_value": '"$(cat mindee.json)"'
    }
  }' | jq`}/>

</div>

</ApiReferenceSection>

</div>
