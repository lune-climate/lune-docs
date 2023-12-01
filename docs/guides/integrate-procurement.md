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

# Eco procurement

<div className="sections">

<ApiReferenceSection>
<div className="paragraphSections">

<div>

<LuneApiSection />

</div>
<div>

## Overview

In this guide, you will learn how to interact with the Lune API in order for suppliers to
1. Pick the most appropriate emission factor
2. Calculate emissions for one unit of their product

and buyers to
1. View emissions for the products they wish to acquire
2. Offset those emissions

</div>
<div>

## Who is this guide for?

This guide is primarily aimed at Product Managers and developers looking
to integrate CO₂ emissions estimations and offsetting into an existing end-user experience.

Feel free to contact our [support team](mailto:support@lune.com) if you encounter any issues integrating our logistics use case.

</div>
<div>

## Concepts

- **Client account** - You can optionally create a client account for each of your clients to define their basic characteristics, such as name, currency, and beneficiary.  Clients will be provided a Lune defaults
- **Lune defaults** - Lune has provided a default Project bundle for each of our clients.  Every order will be placed against the following projects and ratios:
  - Conserving forests in Asia - 95%
  - Ocean Carbon Removal - 5%
- **Project bundle** - Group of offsetting projects with similar characteristics., e.g., _Conserving forests in Asia_ and _Ocean Carbon Removal_
- **Emission factor** - A coefficient representing the amount of emissions per unit of an activity, eg 0.354kgCO&#8322;/USD

</div>
</div>

<>

![sustainable-procurement](/img/sustainable-procurement.png)

</>

</ApiReferenceSection>

<ApiKeySection />

<div>

## API flow

![procurement-api-flow-supplier](/img/procurement-apiflow-supplier.png)

![procurement-api-flow-buyer](/img/procurement-apiflow-buyer.png)

</div>

## For suppliers

<ApiReferenceSection>

<div className="paragraphSections">

<div>

## Pick the most appropriate emission factor

To calculate your supplier's product emissions, you need to allow them to pick an emission factor that matches their product.

On the page where your supplier adds a product, enable them to [search for the most appropriate emission factor](/api-reference/emission-factors/list-emission-factors/).

You may combine multiple filters for a more accurate emission factor match.

<Tip>

You can explore emission factors in the [Lune dashboard](https://dashboard.lune.co/emission-factors)

</Tip>

<div>
</div>

### Sample request

**Where**:

- `name` is a case-insensitive search term
- `source` is the emission factors database
- `region` is the geographical location the emission factor applies to

</div>
<div>

### Sample response

A successful 200 response will return a paginated list of emission factors ordered by best match.

**Where**:

- `id` is the unique identifier for the emission factor, which you must use to perform an emission calculation
- `name` is the emission factor's name
- `region` is the geographical location the emission factor applies to
- `numerator_unit` is the emission factor's numerator unit
- `denominator_unit` is the emission factor's denominator unit. `numerator_unit` / `denominator_unit` for the emission factor's `unit`


</div>

<div>

### Recommended UX

1. Display the returned emission factors to your supplier.  As a minimum, it is recommended that you display `name`, `region`
2. Enable suppliers to pick the emission factor that matches their product
3. If necessary, ask your supplier to enter the unit of activity required by the emission factor.  For instance, the emission factor's unit for "Concrete pipe, bricks, and blocks" is `kgCO2e/USD`.  This means that to calculate the emissions of your supplier's product, a USD monetary amount is required (the emission's factor denominator).

</div>

</div>

<div className="miniSections overflow-hidden">

<Snippet
    header="Sample request"
    language="bash"
    code={`curl https://api.lune.co/v1/emission-factors \\
  --get \\
  --data-urlencode "name=pipe" \\
  --data-urlencode "region=United States of America" \\
  -H "Authorization: Bearer $API_KEY"`} />


<Snippet
    header="Sample response (truncated)"
    language="json"
    code={`{
  "has_more": false,
  "data": [
    {
      "id": "VndoQ0PZjGMzvYON4vy6kbgN1eOJx9B8",
      "name": "Concrete pipe, bricks, and blocks",
      "source": "epa",
      "publication_year": 2022,
      "numerator_unit": "kg",
      "denominator_unit": "USD",
      "created_at": "2023-04-27T15:34:02.746Z",
      "region": "United States of America"
    },
    {
      "id": "MbvJoOaX54V1wpNvgrp8dWDGQ7m239Bx",
      "name": "Fabricated pipe and pipe fittings",
      "source": "epa",
      "publication_year": 2022,
      "numerator_unit": "kg",
      "denominator_unit": "USD",
      "created_at": "2023-04-27T15:34:02.846Z",
      "region": "United States of America"
    },
    {
      "id": "gWvGZXeEK9QjMyd0DxyLmBVoNr3n2lxq",
      "name": "Pipeline transport",
      "source": "epa",
      "publication_year": 2022,
      "numerator_unit": "kg",
      "denominator_unit": "USD",
      "created_at": "2023-04-27T15:34:03.306Z",
      "region": "United States of America"
    }
  }`} />

<div className="react-player-procurement-supplier-wrapper">
<ReactPlayer loop className="react-player"playing muted url='/videos/procurement-supplier.mp4' width="100%" height="100%" />
</div>

</div>

</ApiReferenceSection>

<ApiReferenceSection>

<div className="paragraphSections">

<div>

## Calculate a product's emissions

Once an emission factor has been picked, use its `id` to [calculate the emissions](/api-reference/emission-estimates/create-emission-factor-estimate) for <u>one unit</u> of your supplier's product.

<div>
</div>

### Sample request

**Where**:

- `id` is the emission factor's unique identifier
- `activity` is measure of the activity being estimated in the emission factor's unit

</div>
<div>

### Sample response

A successful 200 request will returns an emission estimate.


**Where**:

- `id` is the unique identifier for the CO₂ emissions estimate
- `mass.amount` is the CO₂ estimated for the product
- `emission_factor` is the emission factor object used to produce the estimate

Store the emissions for one unit of your product in your database.

</div>

</div>

<div className="miniSections overflow-hidden">

<Snippet
    header="Sample request"
    language="bash"
    code={`
curl 'https://api.lune.co/v1/estimates/emission-factor' \\
  -H 'Authorization: Bearer $API_KEY' \\
  -H 'Content-Type: application/json' \\
  -X POST \\
  -d '{
    "emission_factor_id": "VndoQ0PZjGMzvYON4vy6kbgN1eOJx9B8",
    "activity": {
      "value": "32.13",
      "unit": "USD"
    }
  }'`} />
  


<Snippet
    header="Sample response"
    language="json"
    code={`{
  "mass": {
    "unit": "t",
    "amount": "0.01654695"
  },
  "quote": {
    "bundles": [
      {
        "quantity": "0.015719",
        "bundle_id": "q9aKx7b6nNXMk3Yv3pD1mlW5Od2eLZE8",
        "unit_price": "9.09",
        "bundle_name": "Conserving forests in Asia",
        "offset_cost": "0.15",
        "gross_unit_price": "10.1",
        "insufficient_available_quantity": null
      },
      {
        "quantity": "0.000827",
        "bundle_id": "xWaKJL3okjD46VpJ4yGXnQNZRe1vzP0w",
        "unit_price": "250",
        "bundle_name": "Ocean Carbon Removal",
        "offset_cost": "0.21",
        "gross_unit_price": "277.78",
        "insufficient_available_quantity": null
      }
    ],
    "currency": "USD",
    "requested_value": null,
    "estimated_quantity": "0.016546",
    "requested_quantity": "0.01654695",
    "estimated_commission": "0.05",
    "estimated_total_cost": "0.39",
    "estimated_offset_cost": "0.34"
  },
  "emission_factor": {
    "id": "VndoQ0PZjGMzvYON4vy6kbgN1eOJx9B8",
    "name": "Concrete pipe, bricks, and blocks",
    "region": "United States of America",
    "source": "epa",
    "created_at": "2023-04-27T15:34:02.746Z",
    "numerator_unit": "kg",
    "denominator_unit": "USD",
    "publication_year": 2022
  },
  "id": "G3gQ20wWdPJXMyrZ2jmyzvje61OnB9Kx",
  "request": {
    "emission_factor_id": "VndoQ0PZjGMzvYON4vy6kbgN1eOJx9B8",
    "activity": {
      "value": "32.13",
      "unit": "USD"
    }
  }
}`} />

</div>

</ApiReferenceSection>

## For buyers

<ApiReferenceSection>

<div className="paragraphSections">

<div>

## Display product emissions

To display products' emissions to your buyers, use the emissions that you have calculated and stored in your database as explained in the previous paragraph.

</div>
</div>

<div className="miniSections">

![procurement-display-emissions](/img/procurement-display-emissions.png)

</div>
</ApiReferenceSection>

<ClientAccountSection />

<ApiReferenceSection>

<div className="paragraphSections">

<div>

## Offset emissions

To enable your buyer to offset a product's emissions, multiply the product's emissions times the number of units the buyer is purchasing.
Then [place an order by mass](/api-reference/orders/create-order-by-mass).

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
    "amount": "215.11",
    "unit": "kg"
  }
}'`} />

<Snippet
    header="Sample response"
    language="json"
    code={`{
  "id": "mWxruXo29eGqzA14agjpNL5PwnkgaO8R",
  "metadata": {},
  "idempotency_key": null,
  "type": "quantity",
  "status": "placed",
  "currency": "USD",
  "offset_cost": "4.55",
  "total_cost": "5.06",
  "commission": "0.51",
  "quantity": "0.215109",
  "payment_method": "invoice",
  "created_at": "2023-05-22T14:48:51.857Z",
  "bundles": [
    {
      "bundle_id": "q9aKx7b6nNXMk3Yv3pD1mlW5Od2eLZE8",
      "bundle_name": "Conserving forests in Asia",
      "primary_image": "https://assets.lune.co/bundles/asia-forestry.png",
      "quantity": "0.204354",
      "unit_price": "9.13",
      "gross_unit_price": "10.14",
      "offset_cost": "1.87",
      "insufficient_available_quantity": null
    },
    {
      "bundle_id": "xWaKJL3okjD46VpJ4yGXnQNZRe1vzP0w",
      "bundle_name": "Ocean Carbon Removal",
      "primary_image": "https://assets.lune.co/bundles/seaweed-sequestration.png",
      "quantity": "0.010755",
      "unit_price": "250",
      "gross_unit_price": "277.78",
      "offset_cost": "2.69",
      "insufficient_available_quantity": null
    }
  ],
  "projects": [],
  "certificate": null,
  "public_certificate_url": null,
  "offset_link_id": null,
  "email": null,
  "estimate_id": null,
  "requested_quantity": "0.21511",
  "requested_value": null
}`} />

![procurement-offset-emissions](/img/procurement-offset-emissions.png)

</div>

</ApiReferenceSection>

</div>
