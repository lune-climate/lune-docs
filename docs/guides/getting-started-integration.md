---
hide_table_of_contents: true
---

import LuneApiSection from '@site/src/md/luneapi.md';
import ApiKeySection from '@site/src/md/apikey.md';
import ClientAccountSection from '@site/src/md/clientaccount.md';
import Snippet  from '@site/src/components/Snippet';
import Tip from '@site/src/components/Tip';
import { ApiReferenceSection } from 'lune-ui-lib'
import ReactPlayer from 'react-player'


# Getting started

<div className="sections">

<ApiReferenceSection>
<div className="paragraphSections">

<div>

<LuneApiSection />

</div>
<div>

## Overview

This guide is designed to help you get started with the Lune API.  It is suitable for both consumer and eCommerce apps.

In this guide, you will learn how to use a single API call to:
*  Offset your product
*  Round up &mdash; contribute your spare change toward carbon removal

<Tip>

Feel free to implement the examples in this guide or make your own.

</Tip>

</div>
<div>

## Who is this guide for?

This guide is primarily aimed at developers looking
to integrate CO₂ removal into an existing end-user experience.

Feel free to contact our [support team](mailto:support@lune.com) if you encounter any issues integrating our payments use case.

</div>
<div>

## Concepts

- **Lune defaults** - Lune has provided a default Project bundle for each of our clients.  Every order will be placed against the following projects and ratios:
  - Conserving forests in Asia - 95%
  - Ocean Carbon Removal - 5%
- **Project bundle** - Group of offsetting projects with similar characteristics., e.g., _Conserving forests in Asia_ and _Ocean Carbon Removal_

</div>
</div>

<div className="react-player-getting-started-wrapper">
<ReactPlayer loop className="react-player"playing muted url='/videos/offset-roundup.mp4' width="100%" height="100%" />
</div>

</ApiReferenceSection>

<ApiKeySection />

<div>

## Offset your product

## API flow

![api-flow](/img/offset-your-product-apiflow.png)

</div>

<ApiReferenceSection>
<>

## Estimate your product's emissions

Calculate your product's emissions using your preferred provider or [Lune's dashboard](https://dashboard.lune.co/calculate-emissions/everyday-purchases)


<Tip>

For each product, store its emissions in your database.

</Tip>

</>

<>

![offsetting-decision](/img/estimate-product-emissions.png)

</>

</ApiReferenceSection>

<ApiReferenceSection>

<div className="paragraphSections">

<div>

## Offsetting emissions

On successful checkout, [place an order by mass](/resources/orders/create-order-by-mass).


</div>
<div>

### Sample request

**Where**:

* `mass.amount` is the total amount of CO₂ emissions to be offset
* `mass.unit` is the mass unit

</div>
<div>

### Sample response

A 200 response code confirms the order has been successfully placed.


**Where**:

- `id` is the unique identifier for the booking
- `status` is the order status.  `placed` means the order has been validated and accepted and will be fulfilled
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
  -X POST \\
  -d '
    {
      "mass": {
        "amount": "12.07"
        "unit": "kg"
      }
    }'`} />

<Snippet
    header="Sample response"
    language="json"
    code={`{
  "id": "VfdoQ0PZjGMzvYO46lNA6kbgN1eOJx9B",
  "metadata": {},
  "idempotency_key": null,
  "type": "quantity",
  "status": "placed",
  "currency": "USD",
  "offset_cost": "0.31",
  "total_cost": "0.35",
  "commission": "0.04",
  "quantity": "0.012069",
  "created_at": "2023-01-04T15:00:27.349Z",
  "bundles": [
    {
      "bundle_id": "q9aKx7b6nNXMk3Yv3pD1mlW5Od2eLZE8",
      "bundle_name": "Conserving forests in Asia",
      "quantity": "0.011466",
      "unit_price": "13.57",
      "gross_unit_price": "15.08",
      "offset_cost": "0.16",
      "insufficient_available_quantity": null
    },
    {
      "bundle_id": "xWaKJL3okjD46VpJ4yGXnQNZRe1vzP0w",
      "bundle_name": "Ocean Carbon Removal",
      "quantity": "0.000603",
      "unit_price": "250",
      "gross_unit_price": "277.78",
      "offset_cost": "0.15",
      "insufficient_available_quantity": false
    }
  ],
  "projects": [],
  "certificate": null,
  "offset_link_id": null,
  "email": null,
  "estimate_id": null,
  "requested_quantity": "0.01207",
  "requested_value": null
}`} />

</div>

</ApiReferenceSection>

<div>

## Round up

## API flow

![api-flow](/img/round-up-apiflow.png)

</div>

<ApiReferenceSection>
<>

## Calculate carbon removal contribution

Calculate the amount required to round up your checkout cost to the nearest unit.

</>

<>

![payments-intro](/img/round-up-calculate-contribution.png)

</>

</ApiReferenceSection>

<ApiReferenceSection>

<div className="paragraphSections">

<div>

## Offsetting emissions

On successful checkout, [place an order by value](/resources/orders/create-order-by-value).


</div>
<div>

### Sample request

**Where**:

* `value` is the rounded-up carbon removal contribution

</div>
<div>

### Sample response

A 200 response code confirms the order has been successfully placed.


**Where**:

- `id` is the unique identifier for the booking
- `status` is the order status.  `placed` means the order has been validated and accepted and will be fulfilled
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
  -X POST \\
  -d '
    {
      "value": "0.54"
    }'`} />

<Snippet
    header="Sample response"
    language="json"
    code={`{
  "id": "2718zf6QGj9xMpwWKMbp2wrVXaK14OJq",
  "metadata": {},
  "idempotency_key": null,
  "type": "value",
  "status": "placed",
  "currency": "USD",
  "offset_cost": "0.49",
  "total_cost": "0.54",
  "commission": "0.05",
  "quantity": "0.019137",
  "created_at": "2023-01-04T15:19:06.280Z",
  "bundles": [
    {
      "bundle_id": "q9aKx7b6nNXMk3Yv3pD1mlW5Od2eLZE8",
      "bundle_name": "Conserving forests in Asia",
      "quantity": "0.018181",
      "unit_price": "13.57",
      "gross_unit_price": "15.08",
      "offset_cost": "0.25",
      "insufficient_available_quantity": null
    },
    {
      "bundle_id": "xWaKJL3okjD46VpJ4yGXnQNZRe1vzP0w",
      "bundle_name": "Ocean Carbon Removal",
      "quantity": "0.000956",
      "unit_price": "250",
      "gross_unit_price": "277.78",
      "offset_cost": "0.24",
      "insufficient_available_quantity": false
    }
  ],
  "projects": [],
  "certificate": null,
  "offset_link_id": null,
  "email": null,
  "estimate_id": null,
  "requested_value": "0.54",
  "requested_quantity": null
}`} />

</div>

</ApiReferenceSection>

</div>
