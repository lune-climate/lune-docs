# Allow your customers to select project bundles

The Lune API allows you to expose all or a subset of project bundles to your customers.

They are then able to review their impact and may decide to finance them by purchasing their carbon offsets.

This is a great feature if you, as a merchant, want to engage with your customers on an order confirmation page.

The following guide assumes your are an ecommerce merchant. Feel free to adapt this guide to your use case.

::: warning Notice
All orders are placed on bundles, not on specific projects.

Why? [Read on](#project-bundles).
:::

<br />

## Project Bundles

Project bundles are a group of projects of similar price and characteristics.

Project bundles allow us to add and remove projects at any time, pre and post order, for the following two reasons:
1. At Lune we only list very reputable projects which sell high quality carbon offsets. We assess the claims each project makes and only once they satisfy our rigorous selection criteria, we list them on Lune. We may decide, at any time, to de-list a project, if we think their carbon offsets are not achieving their purpose.
2. Balancing supply: we many not have many carbon offsets for a particular, conversely we may have more carbon offsets from a different but similar project.

## Pre-requisites
* Please ensure you have access to [Lune’s dashboard](https://dashboard.lune.co/)
* API Keys required in this guide can be found in the [dashboard](https://dashboard.lune.co/api-keys)

## Overview
Implementing this feature requires the following steps:
1. On your checkout page, communicate to your users that, by completing the purchase, you are commiting to remove carbon dioxide from the atmosphere.
2. Retrieve project bundles from the Lune API and store them in your database.
3. On your order confirmation screen, display the project bundles and allow your customers to pick their preferred ones.
4. Place an order on specific project bundles.

<br />

## Communicate that you are committing to remove carbon dioxide from the atmosphere
It is recommended that, when you place a message describing your commitment, you do so in a clean and unintrusive way.
This will increase conversions.

Two examples:

*Use 1% of the transactions cost towards carbon removal:*

<img width="600" :src="$withBase('/one-percent.png')" alt="one-percent-towards-carbon-removal">

*Offset shipping emissions:*

<img :src="$withBase('/shipping-emissions.png')" alt="shipping-emissions">


## Retrieve project bundles

The following example shows you how to [retrieve project bundles](/api-reference/endpoints-projects.html#get-bundles):

```bash
curl -X GET "https://api.lune.co/v1/bundles" \
	-H "Authorization: Bearer <API_KEY>"
```

The response includes paginated project bundles. For each bundle all projects are also returned.

An example response can be seen below:

```json
{
  "has_more": false,
  "data": [
    {
      "id": "q9aKx7b6nNXMk3Yv3pD1mlW5Od2eLZE8",
      "name": "Asia Forestry",
      "unit_price": "8.98",
      "currency": "GBP",
      "primary_image": "https://assets.lune.co/bundles/asia-forest-bundle-1.jpg",
      "primary_image_hires": "https://assets.lune.co/bundles/asia-forestry-hires.jpg",
      "description": "Reforestation and forest conservation projects in countries like Indonesia and Cambodia, removing carbon from the atmosphere, avoiding future emissions and improving the lives of local communities.",
      "disabled": false,
      "projects": [
        {
          "id": "PkdBeZnaJxQ5G1ponY3Rb04KgmEwlWzN",
          "name": "Rimba Raya",
          "short_name": "Rimba Raya",
          "description": "Rimba Raya, nearly the size of Singapore, protects one of the most highly endangered ecosystems in the world. Located on the southern coast of Borneo, in the province of Central Kalimantan, Indonesia it was once designated for destruction and conversion into a palm oil plantation. The project covers over 64,000 hectares of tropical peat forest and forms a vital patrolled buffer zone between the ever-encroaching bulldozers of the palm oil industry and the Tanjung Puting National Park. The area is home to several endangered animal species, including one of the last remaining wild populations of orangutans on earth, the Bornean Orangutan, whose population has declined over 95% in the last century. The project is estimated to contribute to emissions reductions of 3.5 million tonnes of CO2 per year.",
          "slug": "rimba-forest",
          "project_type": "Forest conservation",
          "registry_name": "Verra",
          "registry_link": "https://registry.verra.org/app/projectDetail/VCS/674",
          "latitude": -3.182846,
          "longitude": 112.2951,
          "country_name": "Indonesia",
          "country_code": "IDN",
          "primary_image": "https://assets.lune.co/projects/rimba-raya-1.png",
          "thumbnail_image": "https://assets.lune.co/projects/rimba-raya-1-thumbnail.png",
          "results": [
            "3.5 million tonnes CO2 per year\r",
            "Co-benefits include: improved job opportunities and education, community development programs focused on the welfare of women and children, protection of endangered plants and animal species"
          ],
          "un_sdg": [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17 ],
          "disabled": false
        },
        {
          "id": "gMbvJoOaX54V1wpNwA8dWDGQ7m239Bx0",
          "name": "Southern Cardamom",
          "short_name": "Southern Cardamom",
          ...
        }
      ]
    }
    ...
  ]
}
```

Please refer to the [API reference](/api-reference/bundle.html) for a field by field explanation.

The bundle `id` will be used when placing orders.

::: tip Notice
All currencies are relative to the API Key's account currency. Therefore if you have a USD account, bundle prices are returned in USD.
:::

Now, store the bundles and projects in your database.

You are free to store them all or just a subset. It is up to you and your company's goals.

## Display project bundles on the order confirmation screen

Once you have project bundles store in your database, you need to expose them in your order confirmation screen.

It is up to you which project bundles to expose to your customers.

As an example, you order confirmation screen with project bundles may look like the following:

<img width="600" :src="$withBase('/bundle-selection.png')" alt="bundle-selection">

Your customers can select their preferred bundles, it is fine to select multiple bundles, and then press **'Offset Now'**.

## Place an order on specific project bundles

Once you know what project bundles the order needs to be placed on, you can place an order [by mass](/api-reference/endpoints-orders.html#create-an-order-by-mass) or [by value](/api-reference/endpoints-orders.html#create-an-order-by-value), depending on your use case. The requests and responses are very similar for both cases.

The following examples places an order by mass (10 tonnes CO2) on two bundles (Asia Forestry and Concrete Mineralisation) in equal ratios.

```bash
curl -X POST "https://api.lune.co/v1/orders/by-mass" \
	-H "Content-Type: application/json" \
	-H "Authorization: Bearer <API_KEY>" \
    -d '{ "mass": { "amount": "10", "unit": "t" }, "bundle_selection": [{ "bundle_id": "q9aKx7b6nNXMk3Yv3pD1mlW5Od2eLZE8" }, { "bundle_id": "aKBx9NvPQZwGeDyb3Y1j5RWm8b3dJrEM" }] }'
```

and the response should contain an [order object](/api-reference/order.html):

```json
{
  "id": "XJvWdBbNaDVokYzQXqZyP9lZG6zwj7K1",
  "metadata": {},
  "type": "quantity",
  "status": "placed",
  "currency": "GBP",
  "offset_cost": "801.91",
  "total_cost": "811.91",
  "commission": "10",
  "quantity": "10",
  "created_at": "2021-12-06T13:40:44.383Z",
  "bundles": [
    {
      "bundle_id": "q9aKx7b6nNXMk3Yv3pD1mlW5Od2eLZE8",
      "bundle_name": "Asia Forestry",
      "quantity": "5",
      "unit_price": "8.98",
      "offset_cost": "44.88"
    },
    {
      "bundle_id": "aKBx9NvPQZwGeDyb3Y1j5RWm8b3dJrEM",
      "bundle_name": "Concrete Mineralisation",
      "quantity": "5",
      "unit_price": "151.41",
      "offset_cost": "757.03",
      "insufficient_available_quantity": false
    }
  ],
  "projects": [],
  "requested_quantity": "10"
}
```
