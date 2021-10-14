# 1% contribution towards carbon removal

## Pre-requisites
* Please ensure you have access to [Lune’s dashboard](https://dashboard.lune.co/).
* Check that you are happy with your [default Bundle Selection](https://dashboard.lune.co/settings/bundle-selection). Orders are going to be placed according to your default Bundle Selection ratios.

## Overview
Implementing this feature requires the following steps:
1. On your checkout page, communicate to the user that 1% of the total cost will be devolved to financing carbon removal projects.
2. Once the checkout process is complete and payment is confirmed, calculate 1% of the total cost and place an order by value.
3. Implement a webhook receiver to receive order updates. Retiring carbon offsets does not occur immediately. Lune will send a webhook `order.completed` event every time an order is fully retired. The order will now contain the completion [Certificate URL which allows you to download the certificate](/guides/downloading-completion-certificate). The certificate includes projects defails, carbon offset retirements and links to official public ledgers (for verified projects).

<br />

::: tip Notice
For testing purposes, Lune provides Test Accounts.

The following guide applies to both Test and Live accounts.

It is recommended that you develop this feature using your Test account.

Only once you are happy with your implementation, switch to the Live account.

If you are ready to switch from Test Account to Live Account, you only need to swap your [Test API Key with your Live API Key](https://dashboard.lune.co/api-keys).
:::

<br />

## Communicate that 1% of the total cost will be devolved to financing carbon removal
It is recommended that, when you place a message that describes that 1% of the total cost will be devolved to finance carbon removal on the checkout page, you do so in a clean and unintrusive way.
It is not our intention to reduce conversions, on the contrary, we believe this feature increases conversions.

As an example:

<img :src="$withBase('/one-percent.png')" alt="one-percent-towards-carbon-removal">

## Place an order by value
First, calculate 1% of the checkout’s total cost.

For instance, assuming your account’s currency is GBP, if the total cost is **£145.95**, 1% would equal **£1.46**.

Now, [place an order by value](/api-reference/orders.html#create-an-order-by-value):

```bash
curl -X POST "https://api.lune.co/v1/orders/by-value" \
	-H "Content-Type: application/json" \
	-H "Authorization: <API_KEY>" \
	-d '{ "value": "1.46" }'
```

The payload, optionally, takes an `idempotency_key` which you can set to enforce order uniqueness and also allows you to reconcile order updates that you receive through a webhook receiver.

You should get a response looking like:

```json
{
  // Lune unique Order Id
  "id": "Vxg3b7MoBkrNQA329N0pnvmw1J8a6Lqj",

  // idempotency_key is returned only if it has been set provided in the request.
  "idempotency_key": "b4e2e26f-bf52-41b5-b6ee-6ce854bda0f2",

  // free key/values pairs that can be set client-side
  "metadata": {},
  "type": "value",

  // the order has been successfully placed against bundles
  "status": "placed",
  "currency": "GBP",

  // net carbon offset cost
  "offset_cost": "1.31",

  // gross carbon offset cost
  "total_cost": "1.4",

  // Lune commission
  "commission": "0.09",

  // tonnes CO2
  "quantity": "0.172",
  "created_at": "2021-10-14T10:54:17.353Z",

  // bundle breakdown for this particular order
  "bundles": [
    {
      "bundle_id": "L0M3zv7Qr2OGRqY9WAVdbwKPx5XWao64",
      "bundle_name": "Latin America Forestry",
      "quantity": "0.171",
      "unit_price": "7.13",
      "offset_cost": "1.22"
    },
    {
      "bundle_id": "DVndoQ0PZjGMzvYOWY6kbgN1eOJx9B82",
      "bundle_name": "Enhanced Weathering",
      "quantity": "0.001",
      "unit_price": "90",
      "offset_cost": "0.09",
      "insufficient_available_quantity": false
    }
  ],

  // the order has not been matched to projects yet, therefore this is empty
  "projects": [],

  // the value requested
  "requested_value": "1.46"
}
```

Next, Lune will take care of allocating projects to the order and then retire their offsets. This occurs after some time.

## Get order updates through a webhook receiver

Webhooks are used to automatically receive notifications of events that happen within Lune. For example, when an order transitions from `allocated` to `complete`.

For detailed information regarding implementing a webhook receiver, see [Implement a Webhook receiver](/guides/implement-a-webhook-receiver).

Lune will send a webhook `order.completed` event every time an order is fully retired.

When the above order completes, you should expect an event as the following:

```json
{
  "events": [
    {
      "api_version": "v1",
      "event_id": "va1BER4JZqnzPkYxJgALg0GeQDoXlWO5",

      // `order.completed` event
      "event_type": "order.completed",
      "sequence": "2021-10-14T16:21:29.067Z",
      "data": {

        // Lune Order Id
        "id": "Vxg3b7MoBkrNQA329N0pnvmw1J8a6Lqj",

        // Idempotency, if provided in the request
        "idempotency_key": "b4e2e26f-bf52-41b5-b6ee-6ce854bda0f2",
        "type": "quantity",
        "status": "complete",
        "currency": "GBP",
        "offset_cost": "1.31",
        "total_cost": "1.4",
        "commission": "0.09",
        "quantity": "1040",
        "created_at": "2019-08-24T14:15:22Z",

        // bundle breakdown for this particular order
        "bundles": [
            {
              "bundle_id": "L0M3zv7Qr2OGRqY9WAVdbwKPx5XWao64",
              "bundle_name": "Latin America Forestry",
              "quantity": "0.171",
              "unit_price": "7.13",
              "offset_cost": "1.22"
            },
            {
              "bundle_id": "DVndoQ0PZjGMzvYOWY6kbgN1eOJx9B82",
              "bundle_name": "Enhanced Weathering",
              "quantity": "0.001",
              "unit_price": "90",
              "offset_cost": "0.09",
              "insufficient_available_quantity": false
            }
        ],
        // project allocations for this particular order
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
          {
            "quantity": "0.001",
            "unit_price": "90",
            "offset_cost": "0.09",
            "project_id": "Vxg3b7MoBkrNQA3r9Vpnvmw1J8a6LqjE"
            "project_name": "greenSand",
            "project_type": "Mineralisation",
            "project_slug": "greensand-ew",
          }
        ],

        // Certificate URL
        "certificate": "https://api.lune.co/v1/orders/Vxg3b7MoBkrNQA329N0pnvmw1J8a6Lqj/certificate",
        "requested_quantity": "1.46"
      }
    }
  ]
}
```

Now [download the certificate](/guides/downloading-completion-certificate) and deliver it to your user.

<br />
<hr />

For support and feedback: [support@lune.co](mailto:support@lune.co).
