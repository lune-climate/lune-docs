---
hide_table_of_contents: true
---

import LuneApiSection from '@site/src/md/luneapi.md';
import ApiKeySection from '@site/src/md/apikey.md';
import ClientAccountSection from '@site/src/md/clientaccount.md';
import Snippet  from '@site/src/components/Snippet';
import Tip from '@site/src/components/Tip';
import { ApiReferenceSection } from 'lune-ui-lib'

# Payments Contribution

<div className="sections">

<ApiReferenceSection>
<div className="paragraphSections">

<div>

<LuneApiSection />

</div>
<div>

## Overview

In this guide, you will learn how to interact with the Lune API to

1. Enable merchants to opt-in to contribute a percentage of a transaction value towards carbon removal at checkout
2. Purchase carbon removal credits

</div>
<div>

## Who is this guide for?

This guide is primarily aimed at developers looking
to integrate CO₂ removal into an existing end-user experience.

Feel free to contact our [support team](mailto:support@lune.com) if you encounter any issues integrating our payments use case.

</div>
<div>

## Concepts

- **Client account** - You must create a client account for each client to define their basic characteristics, such as name, currency, and beneficiary.  Clients will be provided Lune defaults
- **Lune defaults** - Lune has provided a default Project bundle for each of our clients.  Every order will be placed against the following projects and ratios:
  - Conserving forests in Asia - 95%
  - Ocean Carbon Removal - 5%
- **Project bundle** - Group of offsetting projects with similar characteristics., e.g., _Conserving forests in Asia_ and _Ocean Carbon Removal_
- **Offsetting preferences page** - Present your customers with offsetting options for use in their payments flow

</div>
</div>
<>

![payments-intro](/img/payments-checkout.png)

</>
</ApiReferenceSection>

<div>

## API flow

![api-flow](/img/payments-apiflow.png)

</div>


<ApiKeySection />

<ClientAccountSection />

<ApiReferenceSection>

<>

## Store a client's offsetting decision

On the Offsetting preferences page, your clients will be able to select the percentage of the transaction amount that will be contributed towards the preset carbon offsetting project:

<Tip>

Store this decision in your database.

</Tip>

</>

<>

![offsetting-decision](/img/payments-offsettingdecision.png)

</>

</ApiReferenceSection>

<ApiReferenceSection>

<>

## Present a client's offsetting decision

You can present the decision in a checkout step, for example, "_We commit 1% of the purchase to carbon removal, at no extra cost to you_!"

</>

<>

![present-offsetting-decision](/img/payments-checkout.png)

</>


</ApiReferenceSection>

<ApiReferenceSection>

<div className="paragraphSections">

<div>

## Calculate contribution to CO₂ emission offsetting

On successful checkout, calculate, and [place the order](/resources/orders/create-order-by-value).


</div>
<div>

### Sample request

**Where**:

- `$CLIENT_ACCOUNT_ID` is the unique identifier for the client
- `value` is the percentage contribution as selected in the Offsetting preferences page
- `metadata` is a set of key-value pairs that you can attach to your request This can be useful for storing additional information about the order

</div>
<div>

### Sample response

A successful 200 request will result in the value that the client will contribute to CO₂ emission offsetting (taken from the chosen percentage of the transaction cost).


**Where**:

- `id` is the unique identifier for the booking
- `idempotency_key` is a unique token that you submit as a request header, that guarantee that only one order will be created regardless of how many times a request is sent to us
- `status`is the order status.  `placed` means the order has been validated and accepted and will be fulfilled
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
    code={`curl https://api.lune.co/v1/orders/by-value \\
  -H 'Content-Type: application/json' \\
  -H "Authorization: Bearer $API_KEY" \\
  -H "Lune-Account: $CLIENT_ACCOUNT_ID" \\
  -X POST \\
  -d '
    {
      "value": "2.83",
      "metadata": {
        "my_own_id": "anything",
      }
    }'`} />

<Snippet
    header="Sample response"
    language="json"
    code={`{
  "id": "4enjo9g08vx3Mpj2KompPrEZ57XJkDVd",
  "metadata": {},
  "idempotency_key": null,
  "type": "value",
  "status": "placed",
  "currency": "USD",
  "offset_cost": "2.55",
  "total_cost": "2.83",
  "commission": "0.28",
  "quantity": "0.102934",
  "created_at": "2022-10-27T13:43:48.158Z",
  "bundles": [
    {
      "bundle_id": "q9aKx7b6nNXMk3Yv3pD1mlW5Od2eLZE8",
      "bundle_name": "Conserving forests in Asia",
      "quantity": "0.097788",
      "unit_price": "12.89",
      "gross_unit_price": "14.32",
      "offset_cost": "1.26",
      "insufficient_available_quantity": null
    },
    {
      "bundle_id": "xWaKJL3okjD46VpJ4yGXnQNZRe1vzP0w",
      "bundle_name": "Ocean Carbon Removal",
      "quantity": "0.005146",
      "unit_price": "250",
      "gross_unit_price": "277.78",
      "offset_cost": "1.29",
      "insufficient_available_quantity": false
    }
  ],
  "projects": [],
  "certificate": null,
  "offset_link_id": null,
  "email": null,
  "estimate_id": null,
  "requested_value": "2.83",
  "requested_quantity": null
}`} />

</div>

</ApiReferenceSection>

<ApiReferenceSection>

<>

## Present offsetting commitment

For clients that have [opted to offset their emissions](#store-a-clients-offsetting-decision) in their Offsetting preferences page, when a transaction is completed, you can present a summary of their offsetting commitment with details of the value of the commitment and the Lune default offsetting project bundle:

</>
<>

![order-confirmation](/img/payments-order-confirmation.png)

</>

</ApiReferenceSection>

</div>
