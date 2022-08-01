# Table of Contents
1. [Payments use case](#payments-use-case)
2. [Logistics use case](#logistics-use-case)
3. [Fintech use case](#fintech-use-case)

# Payments use case

https://www.figma.com/proto/hzIyN9eG4ba1Q0qHDhiWs0/Demos?node-id=494%3A26389&scaling=min-zoom&page-id=95%3A743&starting-point-node-id=494%3A26389&hide-ui=1

## Merchant dashboard

### Fetch bundles and bundle mixes:
```
curl https://api.lune.co/v1/bundles \
    -H "Authorization: Bearer $API_KEY"
```

```
curl https://api.lune.co/v1/bundle-mixes \
    -H "Authorization: Bearer $API_KEY"
```

### Create a client account:

For each merchant, create a Client Account:
```
curl "https://api.lune.co/v1/accounts/client" \
    -s \
    -X POST \
    -H "Authorization: Bearer $API_KEY" \
    -H "Content-Type: application/json" \
    -d '
{
    "name": "ACME Jul22-2",
    "currency": "GBP",
    "type": "test",
    "beneficiary": "ACME Inc"
}'
```

**Store response's id (Client Account Id) with the Merchant.**

### For the Client Account, set bundle selection or bundle mixes:
Note: the `Lune-Account` header: must contain the Client Account Id.
```
curl "https://api.lune.co/v1/bundle-selections" \
    -X PUT \
    -H "Authorization: Bearer $API_KEY" \
    -H "Lune-Account: <CLIENT_ACCOUNT_ID>" \
    -H "Content-Type: application/json" \
    -d '
[
    {
        "bundle_id": "BmWxrvXo29eGqzA1qjANL5PwnkgaO8R3",
        "percentage": 100
    }
]'
```

TODO (make consistent Client Account Id to header, support partial update)
```
curl "https://api.lune.co/v1/accounts/CLIENT_ACCOUNT_ID" \
    -X PUT \
    -H "Authorization: Bearer $API_KEY" \
    -H "Content-Type: application/json" \
    -d '
[
    {
        ...
    }
]'
```


### Create a sustainability page:
Note: the `Lune-Account` header: must contain the Client Account Id.
```
curl "https://api.lune.co/v1/sustainability-pages" \
    -X POST \
    -H "Authorization: Bearer $API_KEY" \
    -H "Lune-Account: <CLIENT_ACCOUNT_ID>" \
    -H "Content-Type: application/json" \
    -d '
{
    "status": "enabled",
    "slug": "acme"
    "title": "by_price",
    "description": "by_equivalent",
    "sections": ["bundles_breakdown", "certificates"],
}'
```


## Checkout

Message: *'We commit 1% of the purchase to carbon removal, at no extra cost to you'*

On successful checkout:

Value must be 1% of checkout amount.
Currency is the Client Account's currency.
Note: the `Lune-Account` header: must contain the Client Account Id.

```
curl https://api.lune.co/v1/orders/by-value \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $API_KEY" \
    -H "Lune-Account: <CLIENT_ACCOUNT_ID>" \
    -X POST \
    -d '
{
  "value": "10.50"
}'
```

# Logistics use case

https://www.figma.com/proto/hzIyN9eG4ba1Q0qHDhiWs0/Demos?node-id=463%3A27382&scaling=min-zoom&page-id=0%3A1&starting-point-node-id=463%3A27382&hide-ui=1

## Customer dashboard.

### Create a client account:

For each customer, create a Client Account:
```
curl "https://api.lune.co/v1/accounts/client" \
    -s \
    -X POST \
    -H "Authorization: Bearer $API_KEY" \
    -H "Content-Type: application/json" \
    -d '
{
    "name": "ACME Jul22-2",
    "currency": "GBP",
    "type": "test",
    "beneficiary": "ACME Inc"
}'
```
**Store response's id (Client Account Id) with the Merchant.**

### Create a sustainability page:
Note: the `Lune-Account` header: must contain the Client Account Id.
```
curl "https://api.lune.co/v1/sustainability-pages" \
    -X POST \
    -H "Authorization: Bearer $API_KEY" \
    -H "Lune-Account: <CLIENT_ACCOUNT_ID>" \
    -H "Content-Type: application/json" \
    -d '
{
    "status": "enabled",
    "slug": "acme"
    "title": "by_price",
    "description": "by_equivalent",
    "sections": ["bundles_breakdown", "certificates"],
}'
```

### Fetch bundles and bundle mixes:
```
curl https://api.lune.co/v1/bundles \
    -H "Authorization: Bearer $API_KEY"
```

```
curl https://api.lune.co/v1/bundle-mixes \
    -H "Authorization: Bearer $API_KEY"
```

## Shipment

### Calculate shippping emissions for all options in the demo:

```
curl https://api.lune.co/v1/estimates/shipping \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $API_KEY" \
    -H "Lune-Account: <CLIENT_ACCOUNT_ID>" \
    -X POST \
    -d '
{
    "shipment": { "mass": { "amount": "1137.97", "unit": "kg" } },
    "route": {
        "source": {
            "lat": 31.14340019,
            "lon": 121.8050003
        },
        "destination": {
            "lat": 50.02640152,
            "lon": 8.543129921
        }
    },
    "method": "cargo_plane"
}'
```
or/and
```
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

Each emission estimate returns and id (ESTIMATE_ID), amount of CO2 emitted (mass property) and `total_cost`.

### Once the shipment is booked, offset the shipment:

```
curl https://api.lune.co/v1/orders/by-estimate \
    -s \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $API_KEY" \
    -H "Lune-Account: <CLIENT_ACCOUNT_ID>" \
    -X POST \
    -d '
{
  "estimate_id": "<ESTIMATE_ID>"
}'
```

# Fintech use case

## Create a client account:

For each user, create a Client Account:
```
curl "https://api.lune.co/v1/accounts/client" \
    -s \
    -X POST \
    -H "Authorization: Bearer $API_KEY" \
    -H "Content-Type: application/json" \
    -d '
{
    "name": "James Smith",
    "currency": "GBP",
    "type": "test",
    "beneficiary": "James Smith"
}'
```

## Transactions (Home)

Calculate emissions for each line item:

```
curl https://api.lune.co/v1/estimates/transactions \
	-H 'Content-Type: application/json' \
	-H "Authorization: Bearer $API_KEY" \
    -H "Lune-Account: <CLIENT_ACCOUNT_ID>" \
	-X POST \
	-d '
{
  "value": {
    "value": "56.14",
    "currency": "GBP"
  },
  "merchant": {
    "category_code": "5411",
    "name": "Waitrose",
    "country_code": "GBR"
  }
}'
```

Each emission estimate returns and id (ESTIMATE_ID), amount of CO2 emitted (mass property) and `total_cost`.
Clients should store emissions (mass) with each transaction.

## Analytics

**All managed by the client**

* kgCO2 over time: can be calculated by looking up emissions stored with transactions
* kgCO2 by category: can be calculated by looking up emissions stored with transactions
* Your top project: can be calculated by looking at all orders

```
curl https://api.lune.co/v1/orders \
    -H "Lune-Account: <CLIENT_ACCOUNT_ID>" \
	-H "Authorization: Bearer $API_KEY"

or via webhook
```

* Sustainably development goals you support: same as above
* Highest footprint purchases: can be calculated by looking up emissions stored with transactions

## Offsetting

### Fetch bundles and bundle mixes:
```
curl https://api.lune.co/v1/bundles \
    -H "Authorization: Bearer $API_KEY"
```

```
curl https://api.lune.co/v1/bundle-mixes \
    -H "Authorization: Bearer $API_KEY"
```

Fetch projects:
```
curl https://api.lune.co/v1/projects \
    -H "Authorization: Bearer $API_KEY"
```

### Quotes

Perform quotes by mass
```
curl https://api.lune.co/v1/orders/by-mass/quote \
	-H 'Content-Type: application/json' \
    -H "Lune-Account: <CLIENT_ACCOUNT_ID>" \
	-H "Authorization: Bearer $API_KEY" \
	-X POST \
	-d '
{
  "mass": {
    "amount": "50.4",
    "unit": "t"
  },
  "bundle_selection": [
    {
      "bundle_id": "DVndoQ0PZjGMzvYOWY6kbgN1eOJx9B82",
      "percentage": 34
    },
    {
      "bundle_id": "L0M3zv7Qr2OGRqY9WAVdbwKPx5XWao64",
      "percentage": 66
    }
  ]
}'
```
This returns the cost to offset emissions with the particular bundle selection.


Offset emissions:
```
curl https://api.lune.co/v1/orders/by-mass\
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $API_KEY" \
    -H "Lune-Account: <CLIENT_ACCOUNT_ID>" \
    -X POST \
    -d '
{
  "mass": {
    "amount": "50.4",
    "unit": "t"
  },
  "bundle_selection": [
    {
      "bundle_id": "DVndoQ0PZjGMzvYOWY6kbgN1eOJx9B82",
      "percentage": 34
    },
    {
      "bundle_id": "L0M3zv7Qr2OGRqY9WAVdbwKPx5XWao64",
      "percentage": 66
    }
  ]
}'
```
