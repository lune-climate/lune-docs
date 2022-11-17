# Integrate Financial Services

## Intro

### The Lune API

Lune provides a single [API](/api/quickstart) for use in-app and web channels to fetch, mutate, and deliver the data necessary to offset CO₂ emissions across a range of verticals.

Our API-first approach allows our customers to embed offsetting into logistics, payments, and Fintech platforms to deliver a unique and programmatically driven experience that brings climate into client operations.

### Overview

In this guide, you will learn how to interact with the Lune API to calculate emissions for financial transactions and offset those emissions.

### Who is this guide for?

This guide is primarily aimed at Product Managers and developers looking
to integrate CO₂ emissions estimations and offsetting into an existing end-user experience.

Feel free to contact our [support team](mailto:support@lune.com) if you encounter any issues integrating our logistics use case.

### Concepts

- **Client account** - You must create a client account for each of your clients to define their basic characteristics, such as name, currency, and beneficiary.  Clients will be provided a Lune defaults
- **Lune defaults** - Lune has provided a default Project bundle for each of our clients.  Every order will be placed against the following projects and ratios:
  - Conserving forests in Asia - 95%
  - Ocean Carbon Removal - 5%
- **Project bundle** - Group of offsetting projects with similar characteristics., e.g., _Conserving forests in Asia_ and _Ocean Carbon Removal_

## API flow

![payments-flow](/img/logistics-flow.png)

## Getting an API key

First, head over to the Lune dashboard and generate a new API key.

1) Navigate to [https://dashboard.lune.co/developers](https://dashboard.lune.co/developers)

2) Select **New Test API Key**, enter a value in the _Name_ field, and select an account from _Default account_

3) Select **Save**

4) Copy your API key, as you'll need it to interact with the Lune API

## Create a client account

A [client account](/resources/client-accounts/create-client-account) is required for each of your clients and defines their basic characteristics, for example, the currency used to display emissions.

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
- `currency` defines the currency used to display the price for each offsetting option
- `type` defines the type of account.  Use `test` for your playground
- `beneficiary` is the legal entity shown on the Carbon Offset Certificate and carbon registries

Following a successful response, a client account will be added to your dashboard:

![new-client-account](/img/new-client-account.png)

You can access the dedicated client account page by appending the `id` to `/client-account` e.g., `https://dashboard.lune.co/settings/client-accounts/K4enjo9g08vx3MpjnbpPrEZ57XJkDVdb`.

## Calculate emissions for transactions

To calculate an [estimate of CO₂ emissions](/resources/emission-estimates/create-batch-transaction-estimate/) for up to 100 transactions, pass in the transaction amount, the MCC (Merchant Category Code), and Merchant country for each transaction.

**NOTE**: Lune is in the process of rolling out support for merchant-level emissions calculations.

**NOTE**: To prevent batch failure, each transaction is processed individually. Within the response, any failed transactions will be returned with an error code and message.

### Sample request

```js
curl https://api.lune.co/v1/estimates/transactions/batch \
    -s \
	-H 'Content-Type: application/json' \
	-H "Authorization: Bearer $API_KEY" \
	-H "Lune-Account: <CLIENT_ACCOUNT_ID>" \
	-X POST \
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
    ]'
```

**Where**:

- `<CLIENT_ACCOUNT_ID>` is the unique identifier for the client
- `value.value` defines the shipment load; in this example, 40 tonnes
- `value.currency` is the currency in which the transaction was completed
- `merchant.category_code` is the Merchant Category Code (MCC) used to classify the type of goods and services that are transacted
- `merchant.name` is the name of merchant in the transaction
- `merchant.country_code` is the 3-character (which standard? ISO) country code for the country in which the transaction was completed

### Sample response

A successful 200 request will result in an estimate of CO₂ emissions for each transaction, which can be presented in-app:

![transaction-calc](/img/transaction-calc.png)


```js

[
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
]


```

**Where**:

- `mass.amount` is the calculated amount of CO₂ emissions for the transaction
- `quote.bundles` is a container object for the Project bundles that will be used to offset the emissions associated with the transaction and includes the bundle id, bundle name, and unit price
- `quote.estimated_total_cost` is the total cost of offsetting the CO₂ emissions for that transaction in the client's currency

## Offsetting emissions

To [calculate the cost of offsetting the emissions](/resources/orders/get-order-quote-by-mass) from those transactions, pass in the total CO₂ emissions as returned in `mass.amount` in each transaction object in the above response.

### Sample request

```js
curl https://api.lune.co/v1/orders/by-mass/quote \
        -H 'Content-Type: application/json' \
        -H "Authorization: Bearer $API_KEY" \
        -H "Lune-Account: <CLIENT_ACCOUNT_ID>" \
        -X POST \
        -d '
{
  "mass": {
    "amount": "259.111",
    "unit": "kg"
  }
}'
```

**Where**:

- `mass.amount` is the total amount of CO₂ emissions for the transactions to be offset

### Sample response

A successful 200 request will return the total cost of offsetting the CO₂ emissions, along with options for offsetting (Lune defaults) which can be presented in-app:

![monthly-emissions](/img/monthly-emissions.png)

```js
{
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
}
```

**Where**:

- `estimated_total_cost` is the total cost of offsetting the CO₂ emissions in the client's currency
- `bundles` is a container object for the Project bundles that will be used to offset the emissions associated with the transactions and includes the bundle id, bundle name, and unit price

## Payment processing

To complete the offsetting process, clients can forward customers to a checkout step and present the:

- Emissions for the processed transactions in tonnes
- Cost of offsetting a tonne of CO₂ for the chosen Project bundle
- Total cost of offsetting CO₂ emissions

![payment-processing](/img/checkout.png)
