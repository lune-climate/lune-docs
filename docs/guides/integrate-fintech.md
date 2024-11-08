---
hide_table_of_contents: true
---

import LuneApiSection from '@site/src/md/luneapi.md';
import ApiKeySection from '@site/src/md/apikey.md';
import ClientAccountSection from '@site/src/md/clientaccount.md';
import Snippet  from '@site/src/components/Snippet';
import Tip from '@site/src/components/Tip';
import { indent } from '@site/src/utils';
import { ApiReferenceSection } from 'lune-ui-lib'

# Green spend management
<div className="sections">

<ApiReferenceSection>
<div className="paragraphSections">

<div>

<LuneApiSection />

</div>
<div>

## Overview

In this guide, you will learn how to interact with the Lune API to:

1. Calculate emissions for financial transactions
2. Offset those emissions.

</div>
<div>

## Who is this guide for?

This guide is primarily aimed at Product Managers and developers looking
to integrate CO₂ emissions estimations and offsetting into an existing end-user experience.

Feel free to contact our [support team](mailto:support@lune.com) if you encounter any issues integrating our spend management use case.

</div>
<div>

## Concepts

- **Client account** - You can optionally create a client account for each of your clients to define their basic characteristics, such as name, currency, and beneficiary.  Clients will be provided a Lune defaults
- **Lune defaults** - Lune has provided a default Project bundle for each of our clients.  Every order will be placed against the following projects and ratios:
  - Conserving forests in Asia - 95%
  - Ocean Carbon Removal - 5%
- **Project bundle** - Group of offsetting projects with similar characteristics., e.g., _Conserving forests in Asia_ and _Ocean Carbon Removal_

</div>
</div>

<>

![spend-management-dashboard](/img/spend-management-dashboard.png)

</>

</ApiReferenceSection>

<div>

## API flow

![fintech-apiflow](/img/fintech-apiflow.png)

</div>

<ApiKeySection />

<ClientAccountSection />

<ApiReferenceSection>

<div className="paragraphSections">

<div>

## Calculate emissions for transactions

To calculate an [estimate of CO₂ emissions](/api-reference/emission-estimates/create-batch-transaction-estimate/) for up to 100 transactions, pass in the transaction amount, the MCC (Merchant Category Code), and Merchant country for each transaction.

<Tip>

As product input you can use MCC (eg `"category_code": "5411"`) or free text search (eg `"search_term": "iphone"`).

</Tip>

<Tip>

To prevent batch failure, each transaction is processed individually.

Within the response, any failed transactions will be returned with an error code and message.

</Tip>

</div>
<div>

### Sample request

**Where**:

- `$CLIENT_ACCOUNT_ID` is the unique identifier for the client
- `value.value` defines the monetary amount; in this example, 8.99.
- `value.currency` is the currency in which the transaction was completed
- `merchant.category_code` is the Merchant Category Code (MCC) used to classify the type of goods and services that are transacted
- `merchant.name` is the name of merchant in the transaction
- `merchant.country_code` is the 3-character (ISO 3166) country code for the country in which the transaction was completed

</div>
<div>

### Sample response

A successful 200 response will result in an estimate of CO₂ emissions for each transaction, which can be presented in-app.

<Tip>

The following example shows the CO₂ emissions estimate for one of the three transactions from the request above.

</Tip>

**Where**:

- `mass.amount` is the calculated amount of CO₂ emissions for the transaction
- `mass.unit` is the mass unit
- `quote.bundles` is a container object for the Project bundles that will be used to offset the emissions associated with the transaction and includes the bundle id, bundle name, and unit price
- `quote.estimated_total_cost` is the total cost of offsetting the CO₂ emissions for that transaction in the client's currency

<Tip>

Calculate the sum of emissions from the `transaction` response and store it.  This is the amount that will need to be offset in the next request.

<br />

Convert `mass.amount`s to the same unit before summing.

</Tip>

</div>
</div>

<div className="miniSections">

<Snippet
    header="Sample request"
    language="bash"
    code={`curl https://api.lune.co/v1/estimates/transactions/batch \\
  -H 'Content-Type: application/json' \\
  -H "Authorization: Bearer $API_KEY" \\
  -H "Lune-Account: $CLIENT_ACCOUNT_ID" \\
  -X POST \\
  -d '[
    {
      "value": {
        "value": "8.99",
        "currency": "USD"
      },
      "merchant": {
        "category_code": "5411",
        "name": "Starbucks",
        "country_code": "USA"
      }
    },
    {
      "value": {
        "value": "120",
        "currency": "USD"
      },
      "merchant": {
        "category_code": "3001",
        "name": "British Airways",
        "country_code": "USA"
      }
    },
    {
      "value": {
        "value": "8.99",
        "currency": "USD"
      },
      "merchant": {
        "category_code": "5818",
        "name": "Netflix",
        "country_code": "USA"
      }
    }
  ]'`} />

<Snippet
    header="Sample response"
    language="json"
    code={`[
  {
    "mass": {
      "unit": "t",
      "amount": "0.01388"
    },
    "quote": {
      "bundles": [
        {
          "quantity": "0.013186",
          "bundle_id": "q9aKx7b6nNXMk3Yv3pD1mlW5Od2eLZE8",
          "unit_price": "12.8",
          "bundle_name": "Conserving forests in Asia",
          "offset_cost": "0.17",
          "gross_unit_price": "14.22",
          "insufficient_available_quantity": null
        },
        {
          "quantity": "0.000694",
          "bundle_id": "xWaKJL3okjD46VpJ4yGXnQNZRe1vzP0w",
          "unit_price": "250",
          "bundle_name": "Ocean Carbon Removal",
          "offset_cost": "0.17",
          "gross_unit_price": "277.78",
          "insufficient_available_quantity": null
        }
      ],
      "currency": "USD",
      "requested_value": null,
      "estimated_quantity": "0.01388",
      "requested_quantity": "0.01388",
      "estimated_commission": "0.04",
      "estimated_total_cost": "0.38",
      "estimated_offset_cost": "0.34"
    },
    "id": "0M3zv7Qr2OGRqY9QVoEYVdbwKPx5XWao",
    "request": {
      "value": {
        "value": "8.99",
        "currency": "USD"
      },
      "merchant": {
        "category_code": "5411",
        "name": "Starbucks",
        "country_code": "USA"
      }
    }
  }
]`} />

![spend-management-transactions](/img/spend-management-transactions.png)

</div>
</ApiReferenceSection>


<ApiReferenceSection>
<div className="paragraphSections">

<div>

## Displaying emissions and the cost

To [display the emissions which have not yet been offset and the cost](/api-reference/orders/get-order-quote-by-mass), pass in the calculated sum of emissions.

</div>
<div>

### Sample request

**Where**:

- `mass.amount` is the total amount of CO₂ emissions for the transactions to be offset
- `mass.unit` is the mass unit

</div>
<div>

### Sample response

A successful 200 request will return the total cost of offsetting the CO₂ emissions, along with options for offsetting (Lune defaults) which can be presented in-app:

**Where**:

- `estimated_total_cost` is the total cost of offsetting the CO₂ emissions in the client's currency
- `bundles` is a container object for the Project bundles that will be used to offset the emissions associated with the transactions and includes the bundle id, bundle name, and unit price

</div>
</div>

<div className="miniSections">

<Snippet
    header="Sample request"
    language="bash"
    code={`curl https://api.lune.co/v1/orders/by-mass/quote \\
  -H 'Content-Type: application/json' \\
  -H "Authorization: Bearer $API_KEY" \\
  -H "Lune-Account: $CLIENT_ACCOUNT_ID" \\
  -X POST \\
  -d '{
    "mass": {
      "amount": "259.111",
      "unit": "kg"
    }
  }'`} />

<Snippet
    header="Sample response"
    language="json"
    code={`{
  "currency": "USD",
  "estimated_quantity": "0.25911",
  "estimated_offset_cost": "6.39",
  "estimated_total_cost": "7.1",
  "estimated_commission": "0.71",
  "requested_quantity": "0.259111",
  "requested_value": null,
  "bundles": [
    {
      "bundle_id": "q9aKx7b6nNXMk3Yv3pD1mlW5Od2eLZE8",
      "bundle_name": "Conserving forests in Asia",
      "quantity": "0.246155",
      "unit_price": "12.8",
      "gross_unit_price": "14.22",
      "offset_cost": "3.15",
      "insufficient_available_quantity": null
    },
    {
      "bundle_id": "xWaKJL3okjD46VpJ4yGXnQNZRe1vzP0w",
      "bundle_name": "Ocean Carbon Removal",
      "quantity": "0.012955",
      "unit_price": "250",
      "gross_unit_price": "277.78",
      "offset_cost": "3.24",
      "insufficient_available_quantity": null
    }
  ]
}`} />

![spend-management-offsetnow](/img/spend-management-offsetnow.png)

</div>

</ApiReferenceSection>

<ApiReferenceSection>

<div className="paragraphSections">

<div>

## Offset emissions

To [offset emissions](/api-reference/orders/create-order-by-mass), pass in the calculated sum of emissions.


</div>
<div>

### Sample request

**Where**:

- `mass.amount` is the total amount of CO₂ in tonnes to offset
- `mass.unit` is the mass unit

</div>
<div>

### Sample response

**Where**:

- `id` is the unique identifier for the booking
- `idempotency_key` is a unique token that you submit as a request header, that guarantees that only one order will be created regardless of how many times a request is sent to us
- `status`is the order status.  `placed` means the order has been validated, accepted and will be fulfilled
- `offset_cost` is the cost of purchasing the offsets
- `total_cost` is the total cost of purchasing the offsets, including Lune's fee
- `commission` is Lune's fee
- `quantity` is the total quantity of offsets purchased, expressed in tonnes
- `bundles.bundle_id` are the Lune default project bundles against which CO₂ emissions will be offset

</div>
</div>

<div className="miniSections">

<Snippet
    header="Sample request"
    language="bash"
    code={`curl https://api.lune.co/v1/orders/by-mass \\
  -H 'Content-Type: application/json' \\
  -H "Authorization: Bearer $API_KEY" \\
  -H "Lune-Account: $CLIENT_ACCOUNT_ID" \\
  -X POST \
  -d '{
  "mass": {
    "amount": "259.111",
    "unit": "kg"
  }
}'`} />

<Snippet
    header="Sample response"
    language="json"
    code={`{
  "id": "dk23N8xjQLEnvY0XPgbYgX79RB4zDKOl",
  "metadata": {},
  "idempotency_key": null,
  "type": "quantity",
  "status": "placed",
  "currency": "USD",
  "offset_cost": "6.54",
  "total_cost": "7.27",
  "commission": "0.73",
  "quantity": "0.25911",
  "created_at": "2022-11-17T18:05:04.057Z",
  "bundles": [
    {
      "bundle_id": "q9aKx7b6nNXMk3Yv3pD1mlW5Od2eLZE8",
      "bundle_name": "Conserving forests in Asia",
      "quantity": "0.246155",
      "unit_price": "13.39",
      "gross_unit_price": "14.88",
      "offset_cost": "3.3",
      "insufficient_available_quantity": null
    },
    {
      "bundle_id": "xWaKJL3okjD46VpJ4yGXnQNZRe1vzP0w",
      "bundle_name": "Ocean Carbon Removal",
      "quantity": "0.012955",
      "unit_price": "250",
      "gross_unit_price": "277.78",
      "offset_cost": "3.24",
      "insufficient_available_quantity": false
    }
  ],
  "projects": [],
  "certificate": null,
  "offset_link_id": null,
  "email": null,
  "estimate_id": null,
  "requested_quantity": "0.259111",
  "requested_value": null
}`} />

![spend-management-confirmation](/img/spend-management-confirmation.png)

</div>

</ApiReferenceSection>

</div>
