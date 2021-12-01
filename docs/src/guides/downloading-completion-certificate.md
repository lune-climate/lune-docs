# Downloading Lune's order completion certificate

## Pre-requisites
* Please ensure you have access to [Lune’s dashboard](https://dashboard.lune.co/)
* API Keys required in this guide can be found in the [dashboard](https://dashboard.lune.co/api-keys)

## Order completion

An order completes when all carbon offsets purchased by placing the order are fully retired.

When the order's status transitions to `complete`, the order object includes a `certificate` field.

The `certificate` field contains the url that can be used to download the certificate.

```json
{
    "id": "Vxg3b7MoBkrNQA329N0pnvmw1J8a6Lqj",

    // Status
    "status": "complete",

    // Certificate URL
    "certificate": "https://api.lune.co/v1/orders/Vxg3b7MoBkrNQA329N0pnvmw1J8a6Lqj/certificate",

    "idempotency_key": "b4e2e26f-bf52-41b5-b6ee-6ce854bda0f2",
    "type": "quantity",
    "currency": "GBP",
    "offset_cost": "1.22",
    "total_cost": "1.34",
    "commission": "0.12",
    "quantity": "0.171",
    "created_at": "2019-08-24T14:15:22Z",
    "bundles": [
        {
          "bundle_id": "L0M3zv7Qr2OGRqY9WAVdbwKPx5XWao64",
          "bundle_name": "Latin America Forestry",
          "quantity": "0.171",
          "unit_price": "7.13",
          "offset_cost": "1.22"
        },
    ],
    "projects": [
      {
        "quantity": "0.05",
        "unit_price": "7.13",
        "offset_cost": "0.36"
        "project_id": "gMbvJoOaX54V1wpNaRY8dWDGQ7m239Bx",
        "project_name": "Madre De Dios",
        "project_type": "Forest Conservation",
        "project_slug": "madre-de-dios"
      },
      {
        "quantity": "0.121",
        "unit_price": "7.13",
        "offset_cost": "0.86",
        "project_id": "xe1BEV2VZqnzPkYxJgALg0GeQDoXlWO5",
        "project_name": "Alto Mayo",
        "project_type": "Forest Conservation",
        "project_slug": "alto-mayo"
      },
    ],
    "requested_value": "1.34"
  }
}
```

<br />

::: tip Notice

Please familiarise yourself with [order statuses and their lifecycle]().

:::

<br />

## The Certificate

An order's certificate looks like the following. Please note names are fictitious.

<img width="600" :src="$withBase('/certificate.png')" alt="sample certificate">

## Download the certificate

First, identify the `id` of the completed order for which you would like to download the certificate.

Then, get your [API Key](https://dashboard.lune.co/api-keys).

Now, [download the certificate](/api-reference/orders.html#get-a-carbon-offset-certificate):

```bash
curl -X GET \
	-H "Authorization: <API_KEY>" \
	"https://api.lune.co/v1/orders/Vxg3b7MoBkrNQA329N0pnvmw1J8a6Lqj/certificate"
```

The response consists of the order's certificate pdf.
