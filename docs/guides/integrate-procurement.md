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

# Climate-friendly supply-chains

<div className="sections">

<ApiReferenceSection>
<div className="paragraphSections">

<div>

<LuneApiSection />

</div>
<div>

## Overview

In this guide, you will learn how to interact with the Lune API in order for suppliers to
1. Chose the most appropriate emission factor
2. Calculate emissions for their product

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

## Enable suppliers to calculate their product's emissions

To calculate your supplier's product emissions, you need to allow them to pick an emission factor that matches their product.

On the page where your supplier adds a product, enable them to [search for the most appropriate emission factor](/resources/emission-factors/list-emission-factors/).

You may combine multiple filters for a more accurate emission factor match.

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

- `id` is the unique identifier for the emission factor
- `name` is the emission factor's name
- `region` is the geographical location the emission factor applies to
- `gas_emissions.co2e` is amount of CO2 equivalent emitted for each `unit`
- `numerator_unit` is the emission factor's numerator unit
- `denominator_unit` is the emission factor's denominator unit. `numerator_unit` / `denominator_unit` for the emission factor's `unit`


</div>

<div>

### Recommended UX

1. Display the returned emission factors to your supplier.  As a minimum, it is recommended that you display `name`, `region`
2. Enable suppliers to pick the emission factor that matches their product
3. If necessary, ask your supplier to enter the unit of activity required by the emission factor.  For instance, the emission factor for "Concrete pipe, bricks, and blocks" is `0.515kgCO2e/USD`.  This means that to calculate the emissions of your supplier's product, a USD monetary amount is required (the emission's factor denominator).
4. Calculate and display the product emissions by multiplying the activity by the emissions factors.
5. Store the emissions of your supplier's product in your database

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
      "gas_emissions": {
        "co2": "0.461",
        "co2e": "0.515",
        "other": "0.004",
        "methane": "0.002",
        "nitrous_oxide": "0"
      },
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
      "gas_emissions": {
        "co2": "0.354",
        "co2e": "0.41",
        "other": "0.006",
        "methane": "0.002",
        "nitrous_oxide": "0"
      },
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
      "gas_emissions": {
        "co2": "0.978",
        "co2e": "1.666",
        "other": "0.013",
        "methane": "0.027",
        "nitrous_oxide": "0"
      },
      "created_at": "2023-04-27T15:34:03.306Z",
      "region": "United States of America"
    }
  }`} />

<div className="react-player-procurement-supplier-wrapper">
<ReactPlayer loop className="react-player"playing muted url='/videos/procurement-supplier.mp4' width="100%" height="100%" />
</div>

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

To enable your buyer to offset a product's emissions, [place an order by mass](/resources/orders/create-order-by-mass).


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
    "amount": "8200",
    "unit": "kg"
  }
}'`} />

<Snippet
    header="Sample response"
    language="json"
    code={`{
  "id": "xLZ6q1PJvBeOzyWOXD3yoWkbAjnK38lE",
  "metadata": {},
  "idempotency_key": null,
  "type": "quantity",
  "status": "placed",
  "currency": "USD",
  "offset_cost": "174.01",
  "total_cost": "193.35",
  "commission": "19.34",
  "quantity": "8.2",
  "payment_method": "invoice",
  "created_at": "2023-05-16T12:49:06.194Z",
  "bundles": [
    {
      "bundle_id": "q9aKx7b6nNXMk3Yv3pD1mlW5Od2eLZE8",
      "bundle_name": "Conserving forests in Asia",
      "primary_image": "https://assets.lune.co/bundles/asia-forestry.png",
      "quantity": "7.79",
      "unit_price": "9.18",
      "gross_unit_price": "10.2",
      "offset_cost": "71.52",
      "insufficient_available_quantity": null
    },
    {
      "bundle_id": "xWaKJL3okjD46VpJ4yGXnQNZRe1vzP0w",
      "bundle_name": "Ocean Carbon Removal",
      "primary_image": "https://assets.lune.co/bundles/seaweed-sequestration.png",
      "quantity": "0.41",
      "unit_price": "250",
      "gross_unit_price": "277.78",
      "offset_cost": "102.5",
      "insufficient_available_quantity": null
    }
  ],
  "projects": [],
  "certificate": null,
  "public_certificate_url": null,
  "offset_link_id": null,
  "email": null,
  "estimate_id": null,
  "requested_quantity": "8.2",
  "requested_value": null
}`} />

![procurement-offset-emissions](/img/procurement-offset-emissions.png)

</div>

</ApiReferenceSection>

</div>
