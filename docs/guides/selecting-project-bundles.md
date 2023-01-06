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

# Selecting project bundles

<LuneApiSection />

## Intro

Lune provides a single [API](/api/quickstart) to fetch, mutate, and deliver the data necessary to calculate and offset the climate impact from logistics operations.

With booking and confirmation flows, our customers can plug the Lune API into an app, website, or product to deliver a unique and programmatically driven experience that brings climate into logistics decisions.

Our API-first approach ensures customers retain programmatic control over the end-user experience, deciding, for example, where and how to best to present Project bundles and Bundle portfolios, offsetting options, and CO₂ emission estimations.

## Overview

In this guide, you will learn how to interact with the Lune API to:

1. Create a client account for each of your clients
2. Get the available project bundles and bundle portfolios
3. Define the default project bundle or bundle portfolio
4. Store each client's offsetting choice
5. Present an estimate of CO₂ emissions for a given shipping route and confirm a booking

## Who is this guide for?

This guide is primarily aimed at Product Managers (tell the story, what is the guide for from a story perspective) and developers looking
to integrate CO₂ emissions estimations and offsetting into an existing end-user experience.

Feel free to contact our [support team](mailto:support@lune.com) if you encounter any issues integrating our logistics use case.

## Concepts

- **Client account** - You must create a client account for each of your clients to define their basic characteristics, such as name, currency, and beneficiary
- **Project bundle** - One of Lune's offsetting projects, e.g., _Conserving forests in Asia_
- **Bundle portfolio** - A combination of offsetting projects with a preset allocation
- **Offsetting preferences page** - Fetch and store bundle ids in your code base to present your customers with offsetting options for use in their booking flow

## API flow

[insert flow diagram from draw.io]

## Getting an API key

First, head over to the Lune dashboard and generate a new API key.

1) Navigate to [https://dashboard.lune.co/developers](https://dashboard.lune.co/developers)

2) Select **New Test API Key**, enter a value in the _Name_ field, and select an account from _Default account_

3) Select **Save**

4) Copy your API key, as you'll need it to interact with the Lune API

## Create a client account

A [client account](/resources/client-accounts/create-client-account) is required for each of your clients and defines their basic characteristics.

**INFO**: Store and map the client id map to your client in your code base.

### Sample request

You can optionally pass in `beneficiary` to link a client account to the legal entity receiving the carbon offset.

```js
curl "https://api.lune.co/v1/accounts/client" \
    -s \
    -X POST \
    -H "Authorization: Bearer $API_KEY" \
    -H "Content-Type: application/json" \
    -d '
{
    "name": "MY TEST COMPANY",
    "currency": "USD",
    "beneficiary": "MY TEST COMPANY INC"
}'
```

### Sample response

A successful request will return a unique id, which you will need to pass in later interactions with the Lune API.

```js
{
    "id": "K4enjo9g08vx3MpjnbpPrEZ57XJkDVdb",
    "name": "MY TEST COMPANY",
    "currency": "USD",
    "balance": "0",
    "balance_outstanding": "0",
    "type": "live",
    "scope": "client_account",
    "beneficiary": "MY TEST COMPANY INC",
    "organisation_id": "42O097M13DKvo5pmlJYZjmVlGzqJwXbE",
    "bundle_mix_id": null,
    "logo": null
}
```

**Where**:

- `id` is the unique identifier for each of your clients, which you must map in your code base
- `name` is a name that you will use to identify your client and present offsetting options to
- `currency` defines the currency used to display the price for each offsetting option
- `type` defines the type of account.  Use `test` for your playground
- `beneficiary` is the legal entity shown on the Carbon Offset Certificate and carbon registries

Following a successful response, a client account will be added to your dashboard:

![new-client-account](/img/new-client-account.png)

You can access the dedicated client account page by appending the `id` to `/client-account` e.g. `https://dashboard.lune.co/settings/client-accounts/K4enjo9g08vx3MpjnbpPrEZ57XJkDVdb`.

## Building the Offsetting preferences page

By [fetching project bundles](/resources/projects/list-bundles) and [bundles portfolios](/resources/bundle-portfolios/list-all-bundle-portfolios) and storing the id of one or more of those bundles, you can present your clients with a choice of CO₂ offsetting options on the Offsetting preferences page:

![offsetting-pref-page](/img/offsetting-pref-page.png)

Your clients can then use the Offsetting preferences page to select one of those options for use in their booking flow.

In the following example, we see that _Conserving forests in Asia_ has been selected in the preferences page and now displays as the default offsetting option:

![offsetting-booking-flow](/img/offsetting-booking-flow.png)

**INFO**: Lune recommends fetching project bundles and bundle portfolios daily to ensure the presentation of titles, labels, prices, and assets is based on the latest available data.

### Sample request - Project bundles

```js
curl https://api.lune.co/v1/bundles \
    -H "Authorization: Bearer $API_KEY"
```

### Sample response (truncated)

A successful request will return a container object `data` for each available bundle, and the details of each offsetting project in the bundle in `data.projects`.

```js
{
    "has_more": true,
    "data": [
        {
            "id": "ljmkOq7vXd239gAEmALWQ8ZGVD5ExNzr",
            "name": "Renewable energy transition",
            "unit_price": "5.78",
            "gross_unit_price": "6.42",
            "currency": "USD",
            "background_colour": "#10348B",
            "primary_image": "https://assets.lune.co/bundles/global-renewables.png",
            "primary_image_hires": "https://assets.lune.co/bundles/global-renewables.png",
            "small_thumbnail": null,
            "description": "Renewable energy projects, e.g. in Central America or India, help the regions shift away from fossil fuels, avoiding carbon emissions as well as creating job opportunities in local communities.",
            "disabled": false,
            "available_quantity": "10166.510933",
            "offset_type": "emissions_reduction",
            "carbon_permanence": null,
            "projects": [
                {
                    "id": "rENwqonba279JQAKJpeVL3K6MGR4zjvX",
                    "name": "De Aar Wind",
                    "short_name": "De Aar Wind",
                    "description": "The De Aar Wind Farm project involves the construction and operation of a wind farm in the Northern Cape province of South Africa.  The project consists of 96 wind turbines and the associated infrastructure.\r\n\r\nWith an installed capacity of 144 MW, it is one of the largest wind farms in the country.  Built in 2017, the farm has helped the area shift away from a pollutive fossil fuel powered grid.  ",
                    "slug": "de-aar-wind",
                    "project_type": "Wind Farm",
                    "registry_name": "Verra",
                    "registry_link": "https://registry.verra.org/app/projectDetail/VCS/1950",
                    "latitude": -30.528424,
                    "longitude": 24.246146,
                    "country_name": "South Africa",
                    "country_code": "ZAF",
                    "region": null,
                    "logo": "https://assets.lune.co/projects/project-images-v1/de-aar-wind/de-aar-wind-logo.png",
                    "primary_image": "https://assets.lune.co/projects/de-aar-1.png",
                    "thumbnail_image": "https://assets.lune.co/projects/de-aar-thumb.png",
                    "results": [
                        "Average emission reductions of over 400,000 tonnes CO2e per year\r",
                        "Employment opportunities for local professionals\r",
                        "Reduced air pollution\r",
                        "CORSIA eligible and certified project"
                    ],
                    "un_sdg": [
                        3,
                        4,
                        6,
                        13
                    ],
                    "disabled": false,
                    "media": [
                        {
                            "type": "image",
                            "url": "https://assets.lune.co/projects/project-images-v1/de-aar-wind/de-aar-wind-1.jpeg",
                            "attribution_text": "mulilo.com",
                            "attribution_url": "https://mulilo.com/wind-projects/"
                        }
                    ]
                }
            ]
        }
    ]
}
```

**Where**:

- `data.id` is the unique identifier of a project bundle that you will you need to store in your code base if you intend to present the bundle to your client on their Offsetting preferences page
-  `data.name` is the name of the project bundle as displayed in the [projects page](https://dashboard.lune.co/projects), e.g., *Renewable energy transition*
- `data.projects.id` is the unique identifier of a project that forms part of the project bundle, as displayed on the projects page
- `data.projects.name` is the name of a project that forms part of the project bundle, e.g., _De Aar Wind_

We can see how the response message above corresponds to a project in the following example:

![renewable-energy-transition](/img/renewable-energy-transition.png)

### Sample request - Bundle portfolio

```js
curl https://api.lune.co/v1/bundle-portfolios\
    -H "Authorization: Bearer $API_KEY"
```

### Sample response (truncated)

A successful request will return an object for each bundle in the bundle portfolio and the allocation of that bundle, which must always equal 100.

```js
[
    {
        "id": "ljmkOq7vXd239gAEmALWQ8ZGVD5ExNzr",
        "identifier": "oxf",
        "label": "Oxford Principles",
        "bundle_selection": [
            {
                "bundle_id": "ljmkOq7vXd239gAEmALWQ8ZGVD5ExNzr",
                "percentage": 50
            },
            {
                "bundle_id": "va1BER4JZqnzPkYxZALg0GeQDoXlWO5x",
                "percentage": 40
            },
            {
                "bundle_id": "DVndoQ0PZjGMzvYOWY6kbgN1eOJx9B82",
                "percentage": 5
            },
            {
                "bundle_id": "aKBx9NvPQZwGeDyb3Y1j5RWm8b3dJrEM",
                "percentage": 5
            }
        ]
    },
    {
        "id": "q9aKx7b6nNXMk3Yv3pD1mlW5Od2eLZE8",
        "identifier": "inv",
        "label": "Innovative",
        "bundle_selection": [
            {
                "bundle_id": "xWaKJL3okjD46VpJ4yGXnQNZRe1vzP0w",
                "percentage": 10
            },
            {
                "bundle_id": "Dj85vWbLVZNlOayVxpM1K29RgJq4xXze",
                "percentage": 10
            },
            {
                "bundle_id": "15xRmEXZq0NnJLpPnydPr7akGOjV9g3z",
                "percentage": 80
            }
        ]
    },
    {
        "id": "gMbvJoOaX54V1wpNwA8dWDGQ7m239Bx0",
        "identifier": "ntr",
        "label": "Nature-based",
        "bundle_selection": [
            {
                "bundle_id": "q9aKx7b6nNXMk3Yv3pD1mlW5Od2eLZE8",
                "percentage": 33
            },
            {
                "bundle_id": "va1BER4JZqnzPkYxZALg0GeQDoXlWO5x",
                "percentage": 34
            },
            {
                "bundle_id": "L0M3zv7Qr2OGRqY9WAVdbwKPx5XWao64",
                "percentage": 33
            }
        ]
    }
]
```

**Where**:

- `id` is the unique identifier of the bundle portfolio that you will you need to store in your code base if you intend to present the bundle to your client on their Offsetting preferences page
- `label` is the name of the bundle portfolio as displayed on your account page, e.g., *Innovative*
- `bundle_selection.bundle_id` is the unique identifier of a project that forms part of the bundle portfolio
-  `bundle_selection.percentage` is the allocation assigned to a project in a bundle portfolio and which must always equal to 100

## Passing a client's offsetting selection

To store each [client's offsetting selection](/resources/bundle-selections/update-bundle-selection), pass in the project bundle `id` or bundle portfolio `id` along with the client's unique identifier.

**INFO**: There is no need to pass in the _No offsetting_ selection.

### Sample request - Project bundles

```js
curl "https://api.lune.co/v1/bundle-selections" \
    -X PUT \
    -H "Authorization: Bearer $API_KEY" \
    -H "Lune-Account: <CLIENT_ACCOUNT_ID>" \
    -H "Content-Type: application/json" \
    -d '
    [
        {
            "bundle_id": "BmWxrvXo29eGqzA1qjANL5PwnkgaO8R3"
        }
    ]'
```

**Where**:

- `<CLIENT_ACCOUNT_ID>` - is the unique identifier for the client
- `bundle_id`- is a unique identifier for the project selected in the Offsetting preferences page as the default offsetting option

### Sample response

A successful request will return the `bundle_id` for the project selected in the Offsetting preferences page.  

```js
[
    {
        "bundle_id": "ljmkOq7vXd239gAEmALWQ8ZGVD5ExNzr",
        "percentage": 100
    }
]
```

### Sample request - Bundle portfolio

```js
curl "https://api.lune.co/v1/bundle-portfolios" \
    -X PUT \
    -H "Authorization: Bearer $API_KEY" \
    -H "Lune-Account: <CLIENT_ACCOUNT_ID>" \
    -H "Content-Type: application/json" \
    -d '
    [
      {
          "bundle_portfolio_id": "ljmkOq7vXd239gAEmALWQ8ZGVD5ExNzr"
      }
    ]'
```

**Where**:

- `<CLIENT_ACCOUNT_ID>` - is the unique identifier for the client
- `bundle_portfolio_id`- is a unique identifier for the bundle portfolio selected in the Offsetting preferences page as the default offsetting option

### Sample response

A successful request will return the `id` for the project portfolio selected in the Offsetting preferences page and the `bundle_id` for each bundle in the portfolio.

```js
{
    "id": "q9aKx7b6nNXMk3Yv3pD1mlW5Od2eLZE8",
    "identifier": "inv",
    "label": "Innovative",
    "bundle_selection": [
        {
            "bundle_id": "xWaKJL3okjD46VpJ4yGXnQNZRe1vzP0w",
            "percentage": 10
        },
        {
            "bundle_id": "Dj85vWbLVZNlOayVxpM1K29RgJq4xXze",
            "percentage": 10
        },
        {
            "bundle_id": "15xRmEXZq0NnJLpPnydPr7akGOjV9g3z",
            "percentage": 80
        }
    ]
}
```

## Booking a shipment and offsetting CO₂ emissions

To present an [estimate of CO₂ emissions for a given shipping route](/resources/emission-estimates/create-multi-leg-shipping-estimate), pass in the journey details (e.g., route source and destination for one or more journey legs, shipment mode, load).

### Sample request

```js
curl https://api.lune.co/v1/estimates/shipping/multi-leg \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $API_KEY" \
    -H "Lune-Account: <CLIENT_ACCOUNT_ID>" \
    -X POST \
    -d '
{
    "shipment": { "mass": { "amount": "40.0", "unit": "t" } },
    "legs": [{
        "route": {
            "source": {
                "lat": 51.4402,
                "lon": 6.7652
            },
            "destination": {
                "lat": 51.94995,
                "lon": 4.1453
            }
        },
        "method": "inland_waterway_pushed_convoy_small"
    }, {
        "route": {
            "source": {
                "lat": 51.94995,
                "lon": 4.1453
            },
            "destination": {
                "lat": 52.3676,
                "lon": 4.9041
            }
        },
        "method": "electric_freight_train"
    }]
}'
```

**Where**:

- `<CLIENT_ACCOUNT_ID>` is the unique identifier for the client
- `shipment` defines the shipment load; in this example, 40 tonnes
- `legs` is a container object for one or more journey legs
- `route` is the source and destination for each leg in the chosen journey, which can either be the shipping distance or the start/destination address pair (physical address or coordinates)
- `method` is the chosen form of transport


### Sample response

A successful 200 request will result in an estimate of offsetting costs for the chosen journey.

```js
{
    "id": "9aKx7b6nNXMk3YvaJPyD1mlW5Od2eLZE",
    "legs": [
        {
            "mass": {
                "unit": "t",
                "amount": "0.158841"
            },
            "distance": {
                "unit": "km",
                "amount": "233.5892"
            },
            "methodology": []
        },
        {
            "mass": {
                "unit": "t",
                "amount": "0.062328"
            },
            "distance": {
                "unit": "km",
                "amount": "104.0857"
            },
            "methodology": []
        }
    ],
    "mass": {
        "unit": "t",
        "amount": "0.221169"
    },
    "quote": {
        "bundles": [
            {
                "quantity": "0.022116",
                "bundle_id": "xWaKJL3okjD46VpJ4yGXnQNZRe1vzP0w",
                "unit_price": "223.18",
                "bundle_name": "Ocean Carbon Removal",
                "offset_cost": "4.94",
                "gross_unit_price": "247.98",
                "insufficient_available_quantity": null
            },
            {
                "quantity": "0.022116",
                "bundle_id": "Dj85vWbLVZNlOayVxpM1K29RgJq4xXze",
                "unit_price": "357.08",
                "bundle_name": "Direct Air Capture",
                "offset_cost": "7.9",
                "gross_unit_price": "396.76",
                "insufficient_available_quantity": null
            },
            {
                "quantity": "0.176935",
                "bundle_id": "15xRmEXZq0NnJLpPnydPr7akGOjV9g3z",
                "unit_price": "35.71",
                "bundle_name": "Biotech-Enhanced Reforestation",
                "offset_cost": "6.32",
                "gross_unit_price": "39.68",
                "insufficient_available_quantity": null
            }
        ],
        "currency": "USD",
        "requested_value": null,
        "estimated_quantity": "0.221167",
        "requested_quantity": "0.221169",
        "estimated_commission": "2.13",
        "estimated_total_cost": "21.29",
        "estimated_offset_cost": "19.16"
    },
    "distance": {
        "unit": "km",
        "amount": "337.6749"
    }
}
```

**Where**:

- `id` is the unique identifier for the CO₂ emissions estimate
- `legs` is a container object for one or more journey legs, which includes the CO₂ emissions `legs.mass.amount` and distance per leg
- `mass.amount` is the aggregated CO₂ emissions for the chosen journey
- `quote.bundles` is a container object that confirms the client's offsetting selection and provides the details of each bundle, including the bundle id, bundle name, and unit price
- `quote.estimated_total_cost` is the total cost of offsetting the CO₂ emissions in the client's currency
- `distance` is the total distance for the chosen journey

## Confirming a booking

To present a [confirmation of a booking](/resources/orders/create-order-by-estimate), including the carbon offset, bundle selection (or bundle portfolio), and the total cost of offsetting the CO₂ emissions, pass in the estimate id.

![order-confirmation](/img/order-confirmation.png)

### Sample request

```js
curl https://api.lune.co/v1/orders/by-estimate \
-s \
-H 'Content-Type: application/json' \
-H "Authorization: Bearer $API_KEY" \
-H "Lune-Account: <CLIENT_ACCOUNT_ID>" \
-X POST \
-d '
    {
      "estimate_id": "a1BER4JZqnzPkYxNgvALg0GeQDoXlWO5"
    }'
```

**Where**:

- `<CLIENT_ACCOUNT_ID>` is the unique identifier for the client
- `estimate_id` is the unique identifier for the emissions estimate

### Sample response

A successful request will return an order summary, which can be displayed as part of your confirmation flow.

```js
{
    "id": "9aKx7b6nNXMk3YvOKXKpD1mlW5Od2eLZ",
    "metadata": {},
    "idempotency_key": null,
    "type": "quantity",
    "status": "placed",
    "currency": "USD",
    "offset_cost": "19.16",
    "total_cost": "21.29",
    "commission": "2.13",
    "quantity": "0.221167",
    "created_at": "2022-10-07T17:27:23.113Z",
    "bundles": [
        {
            "bundle_id": "xWaKJL3okjD46VpJ4yGXnQNZRe1vzP0w",
            "bundle_name": "Ocean Carbon Removal",
            "quantity": "0.022116",
            "unit_price": "223.18",
            "gross_unit_price": "247.98",
            "offset_cost": "4.94",
            "insufficient_available_quantity": false
        },
        {
            "bundle_id": "Dj85vWbLVZNlOayVxpM1K29RgJq4xXze",
            "bundle_name": "Direct Air Capture",
            "quantity": "0.022116",
            "unit_price": "357.08",
            "gross_unit_price": "396.76",
            "offset_cost": "7.9",
            "insufficient_available_quantity": false
        },
        {
            "bundle_id": "15xRmEXZq0NnJLpPnydPr7akGOjV9g3z",
            "bundle_name": "Biotech-Enhanced Reforestation",
            "quantity": "0.176935",
            "unit_price": "35.71",
            "gross_unit_price": "39.68",
            "offset_cost": "6.32",
            "insufficient_available_quantity": false
        }
    ],
    "projects": [],
    "certificate": null,
    "offset_link_id": null,
    "email": null,
    "estimate_id": "9aKx7b6nNXMk3YvaJPyD1mlW5Od2eLZE",
    "requested_quantity": "0.221169",
    "requested_value": null
}
```

**Where**:

- `id` is the unique identifier for the booking
