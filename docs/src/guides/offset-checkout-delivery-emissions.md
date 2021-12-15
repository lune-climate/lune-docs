# Offset checkout delivery emissions

The Lune API allows you to estimate carbon dioxide emissions for [specific categories](/api-reference/emission-estimates.html).

This guide will explain how to calculate shipping-related emissions for a parcel bought through an ecommerce site and delivered to the customer’s address as well as how to place an order to neutralise the emissions.

<br />

## Pre-requisites
* Please ensure you have access to [Lune’s dashboard](https://dashboard.lune.co/)
* API Keys required in this guide can be found in the [dashboard](https://dashboard.lune.co/api-keys)
* Ensure that you have selected your desired [default Project Bundle Selection](https://dashboard.lune.co/settings/bundle-selection). Orders are going to be placed according to your default Project Bundle Selection ratios.
* You must know the weight of the parcel and where your parcel is shipped from (the address of your distribution center or warehouse).

## Overview
Implementing this feature requires the following steps:
1. On your checkout page, communicate to your users that, by completing the purchase, you are commiting to offset emissions for all deliveries.
2. When a delivery address is entered, calculate and display delivery emissions.
3. Once the checkout process is complete, place an order to purchase a specific mass of carbon offsets.

<br />

## Communicate you are committing to offset all deliveries
It is recommended that, when you place a message describing your commitment, you do so in a clean and unintrusive way.
This will increase conversions.

For instance:

<img width="600" :src="$withBase('/shipping-checkout-pre-address.png')" alt="hipping-checkout-pre-address">


## Calculate and display emissions

When your user enters a valid and complete address, calculate delivery emissions.

::: danger

Please ensure that all requests to the Lune API are performed server-side.

All API requests require an API key which must be kept secret.

:::


Dependending on your source and destination location and/or your delivery methods, you may need to perform one or multiple API emissions calculations.

For detailed [shipping emissions calculations, refer to the API reference](/api-reference/emission-estimates.html#estimate-shipping-emissions).

Here are a few examples::

**Shipping a parcel by diesel truck**:

`mass` is the weight of the parcel.

```bash
curl -X POST "https://api.lune.co/v1/estimates/shipping" \
    -H "Authorization: Bearer <API_KEY>" \
    -H 'Content-Type: application/json' \
    -d '
        {
          "shipment": { "mass": { "amount": "10.0", "unit": "kg" } },
          "route": {
            "source": {
              "street_line1": "Karl-Liebknecht-Str. 13",
              "country_code": "DEU",
              "city": "Berlin",
              "postcode": "10178"
            },
            "destination": {
              "street_line1": "62 Great Russell St",
              "country_code": "GBR",
              "city": "London",
              "postcode": "WC1B 3BG"
            }
          },
          "method": "diesel_truck"
        }'
```

<br />

**Shipping a parcel with a small cargo ship**:

`route` requires a distance (kilometers or miles):

```bash
curl -X POST "https://api.lune.co/v1/estimates/shipping" \
    -H "Authorization: Bearer <API_KEY>" \
    -H 'Content-Type: application/json' \
    -d '
        {
          "shipment": { "mass": { "amount": "10.0", "unit": "kg" } },
          "route": { "amount": "2000.0", "unit": "km" },
          "method": { "vessel_type": "sea_general_cargo_small" }
        }'

```

<br />

**Shipping a parcel by cargo plane**:

`route` requires a distance (kilometers or miles):

```bash
curl -X POST "https://api.lune.co/v1/estimates/shipping" \
    -H "Authorization: Bearer <API_KEY>" \
    -H 'Content-Type: application/json' \
    -d '
        {
          "shipment": { "mass": { "amount": "10.0", "unit": "kg" } },
          "route": { "amount": "8000.0", "unit": "km" },
          "method": "cargo_plane"
        }'
```

<br />

Each response returns the estimated carbon dioxide emitted in the same format:


```json
{
  "mass": { "amount": "0.055", "unit":"t" }
}
```

::: tip Notice
You may sum the emissions of multiple responses if you use multiple shipping methods.
:::


### Display the delivery emissions to your customers

It is recommended to convert the emissions result to kilograms for a more comprehensible value.

Therefore 0.055 tonnes becomes 55.0 kilograms.

Now display the result to your customers.

Here's an example:

<img :src="$withBase('/shipping-emissions.png')" alt="shipping-emissions">

## Place an order to offset delivery emissions

Once the checkout process has been successfully completed, place an order to offset the delivery's emissions.

You know that the delivery emitted 55kg by performing an emissions calculation in your previous step.

Now, [place an order by mass](/api-reference/orders.html#create-an-order-by-mass) to offset 55kg CO2.

```bash
curl -X POST "https://api.lune.co/v1/orders/by-mass" \
    -H "Authorization: Bearer <API_KEY>" \
    -H 'Content-Type: application/json' \
    -d '{ "mass": { "amount": "55", "unit": "kg" } }'
```

and the response should contain an [order object](/api-reference/order.html):

```json
{
  "id": "A4jqOd30mnP5ZAQQxLnADQ1WJz9v2keR",
  "metadata": {},
  "type": "quantity",
  "status": "placed",
  "currency": "GBP",
  "offset_cost": "0.84",
  "total_cost": "0.89",
  "commission": "0.05",
  "quantity": "0.055",
  "created_at": "2021-12-06T13:40:44.383Z",
  "bundles": [
    {
      "bundle_id": "L0M3zv7Qr2OGRqY9WAVdbwKPx5XWao64",
      "bundle_name": "Latin America Forestry",
      "quantity": "0.050",
      "unit_price": "8.37",
      "offset_cost": "0.41",
      "insufficient_available_quantity": false
    },
    {
      "bundle_id": "DVndoQ0PZjGMzvYOWY6kbgN1eOJx9B82",
      "bundle_name": "Enhanced Weathering",
      "quantity": "0.005",
      "unit_price": "86",
      "offset_cost": "0.43",
      "insufficient_available_quantity": false
    }
  ],
  "projects": [],
  "requested_quantity": "0.055"
}
```

The above order purchased 50kg CO2 Latin America Forestry and 5kg CO2 Enhanced Weathering because the account's default project bundle selection ratio was:
90% Latin America Forestry and 10% Enhanced Weathering.
