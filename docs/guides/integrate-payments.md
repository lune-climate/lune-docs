# Integrate Payments

## Intro

### The Lune API and our approach

Lune provides a single [API](/api/quickstart) for use in-app and web channels to fetch, mutate, and deliver the data necessary to offset CO₂ emissions across a range of verticals.

Our API-first approach allows our customers to embed offsetting into logistics, payments, and Fintech platforms to deliver a unique and programmatically driven experience that brings climate into client operations.

## Overview

In this guide, you will learn how to interact with the Lune API to enable merchants to contribute a percentage of a transaction value towards carbon removal at checkout.

## Who is this guide for?

This guide is primarily aimed at developers looking
to integrate CO₂ removal into an existing end-user experience.

Feel free to contact our [support team](mailto:support@lune.com) if you encounter any issues integrating our payments use case.

## Concepts

- **Client account** - You must create a client account for each client to define their basic characteristics, such as name, currency, and beneficiary.  Clients will be provided Lune default Project bundles
- **Project bundle** - Group of offsetting projects with similar characteristics., e.g., _Conserving forests in Asia_ and _Ocean Carbon Removal_
- **Offsetting preferences page** - Present your customers with offsetting options for use in their payments flow

## API flow

![logistics-flow](/img/payments-flow.png)

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

You can optionally pass in `beneficiary` to link a client account to the legal entity that will be listed in the carbon offset registry for retired credits.

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
    "type": "test",
    "scope": "client_account",
    "beneficiary": "MY TEST COMPANY INC",
    "organisation_id": "42O097M13DKvo5pmlJYZjmVlGzqJwXbE",
    "bundle_portfolio_id": null,
    "logo": null
}
```

**Where**:

- `id` is the unique identifier for each of your clients, which you must map in your code base
- `name` is a name that you will use to identify your client and present offsetting options to
- `currency` defines the currency used to display the contribution to carbon offsetting projects
- `type` defines the type of account.  Use `test` for your playground
- `beneficiary` is the legal entity shown on the Carbon Offset Certificate and carbon registries

Following a successful response, a client account will be added to your dashboard:

![new-client-account](/img/new-client-account.png)

You can access the dedicated client account page by appending the `id` to `/client-account` e.g., `https://dashboard.lune.co/settings/client-accounts/K4enjo9g08vx3MpjnbpPrEZ57XJkDVdb`.

## Store a client's offsetting decision

On the Offsetting preferences page, your clients will be able to select the percentage of the transaction amount that will be contributed towards the preset carbon offsetting project:

![offsetting-decision](/img/payments-offsetting-decision.png)

**INFO**: Store this decision in your database.  

## Present a client's offsetting decision

You can present the decision in a checkout step, for example, "_We commit 1% of the purchase to carbon removal, at no extra cost to you_!":

![present-offsetting-decision](/img/present-offsetting-decision.png)

## Calculate contribution to CO₂ emission offsetting

On successful checkout, [calculate](/resources/orders/create-order-by-value), and place the order.

### Sample request

```js
curl https://api.lune.co/v1/orders/by-value \
        -H 'Content-Type: application/json' \
        -H "Authorization: Bearer $API_KEY" \
    	-H "Lune-Account: <CLIENT_ACCOUNT_ID>" \
        -X POST \
        -d '
        {
          "value": "2.83",
          "metadata": {
            "my_own_id": "anything",
          }
        }'
```

**Where**:

- `<CLIENT_ACCOUNT_ID>` is the unique identifier for the client
- `value` is the percentage contribution as selected in the Offsetting preferences page
- `metadata` is a set of key-value pairs that you can attach to your request This can be useful for storing additional information about the order


### Sample response

A successful 200 request will result in the value that the client will contribute to CO₂ emission offsetting (taken from the chosen percentage of the transaction cost).

```js
{
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
}
```

**Where**:

- `id` is the unique identifier for the booking
- `idempotency_key` is a unique token that you submit as a request header, that guarantee that only one order will be created regardless of how many times a request is sent to us
- `status`is the order status.  `placed` means the order has been validated and accepted and will be fulfilled
- `offset_cost` is the cost of purchasing the offsets
- `total_cost` is the total cost of purchasing the offsets, including Lune's fee
- `commission` is Lune's fee
- `quantity` is the total quantity of offsets purchased, expressed in tonnes
- `bundles.bundle_id` are the Lune default project bundles against which CO₂ emissions will be offset

## Present offsetting commitment

For clients that have [opted to offset their emissions](#store-a-clients-offsetting-decision) in their Offsetting preferences page, when a transaction is completed, you can present a summary of their offsetting commitment with details of the value of the commitment and the Lune default offsetting project bundle:

![present-offsetting-committment](/img/present-offsetting-committment.png)
