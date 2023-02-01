---
sidebar_position: 8
sidebar_label: Webhooks
hide_table_of_contents: true
---
import { ApiReferenceSection } from 'lune-ui-lib'
import Snippet  from '@site/src/components/Snippet';
import Tip from '@site/src/components/Tip';

# Webhooks

<div className="sections">

<ApiReferenceSection>

<div className="paragraphSections">
<div>

Webhooks can be used to automatically receive notifications of events that happen, when they happen.

For example, you can be notified when an order's credits are retired.

When you receive an event, you can process and act on it as you need.

</div>
</div>

<>

![webhook](/img/webhook.png)

</>

</ApiReferenceSection>

<ApiReferenceSection>

<div className="paragraphSections">
<div>

## Steps to receive webhook events

1. Expose a webhook endpoint on your servers ('the webhook receiver')
2. Register your endpoint to start receiving events


<Tip>

These steps must be repeated for both [live and test](/api/live-test-accounts#live-and-test-modes) modes independently

</Tip>


</div>
<div>

### Step 1: Expose a webhook endpoint on your servers

Create an HTTP endpoint to act as your webhook receiver, just like you would for any web page or API endpoint.

Take note of its public URL. You will need it in the next step to register the endpoint.

Note: Lune accepts **HTTPS** but not HTTP endpoints, even for testing.


</div>
<div>

### Step 2: Register your endpoint to start receiving events

You can register your endpoint via the [dashboard](https://dashboard.lune.co/developers#webhooks) or API.

An endpoint registered via the dashboard is going to receive either test or live events, depending on whether 'Test mode' was on or off.

Endpoints registered via the dashboard receive events for all [Accounts and Client Accounts](/api/live-test-accounts#accounts) belonging to the organisation.

[Registering your endpoint via the API](/resources/webhooks/create-webhook) allows a more granular control of the events that you will receive.


<Tip>

Webhooks never mix live and test events.

Webhooks created with test API Keys deliver test events.

Similarly, webhooks created with live API Keys deliver live events.

</Tip>



</div>
</div>

<div className="miniSections">

![webhook-form](/img/webhook-form.png)

<Snippet
    header="Sample request"
    language="bash"
    code={`curl "https://api.lune.co/v1/webhooks" \\
  -X POST \\
  -H "Authorization: Bearer $API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '
    {
        "url": "https://lune.co/webhook-receiver"
    }'`}
/>

<Snippet
    header="Sample response"
    language="json"
    code={`{
  "id": "kjmkOq7zXd139gAE9WALWQ8ZGVD7ExNz",
  "url": "https://lune.co/webhook-receiver",
  "enabled": true,
  "account_type": "live",
  "account_ids": [],
  "created_at": "2000-04-12T23:20:50.52Z",
  "secret": "secret-xxxx"
}`}
/>


</div>

</ApiReferenceSection>

<ApiReferenceSection>

<div className="paragraphSections">
<div>

## Events

Lune delivers events every time an order [transitions from one status to another](/api/order).

Each request to your webhook receiver includes a batch of events.

Process `event_type`s relevant to your use case and ignore the rest.

Your endpoint must return a successful status code (2xx) within 30 seconds to acknowledge the delivery of the events.

Unacknowledged events are redelivered until acknowledged.

</div>
</div>

<div className="miniSections">

<Snippet
    header="Event types"
    language="bash"
    code={`event_type:
  type: string
  enum:
    - order.received
    - order.placed
    - order.paid
    - order.retiring
    - order.cancelled
    - order.failed
    - order.completed`}
/>
</div>

</ApiReferenceSection>

<ApiReferenceSection>

<div className="paragraphSections">
<div>

## System properties and guarantees

* **Ordering** - events are strictly ordered and are delivered in the same order as they have occurred in Lune's system.  The ordering guarantee applies to events belonging to the same [Account or Client Account](/api/live-test-accounts#accounts). You may receive events belonging to different Accounts or Client Accounts out of order

* **At-least-once** - events are delivered at least once. Unacknowledged events are redelivered until acknowledged with a successful response status code (2xx). Backoff policies are applied if, after several attempts, we are unable to successfully deliver events

* **Head-of-line blocking** - given the previous two guarantees, it follows that a few unacknowledged events may hold up several events in your webhook queue

* **Timeout** - requests to your webhook receiver time out after 30 seconds. Unacknowledged requests are redelivered

* **HTTPS** - only https requests are supported

* **Signed requests** - all requests are signed to ensure [authenticity and integrity](#authenticity-and-integrity)

</div>
<div>

## Idempotency

Your webhook receiver may receive some events multiple times ('At-least-once' guarantee). You must ensure you can handle receiving duplicate events.

In order to do so, use your preferred method or one of the following:

1. Track `event_id`s: ignore events that have an `event_id` that you have processed already

2. Track `sequence`s: for each account, ignore events that have a lower lexicographical sequence

</div>
</div>

<>
</>

</ApiReferenceSection>


<ApiReferenceSection>

<div className="paragraphSections">
<div>


## Authenticity and integrity

Lune signs all webhook requests' bodies and includes the signature in a `Lune-HMAC` header.

This enables you to verify that events were sent by Lune and were not tampered with by third parties.


The `Lune-HMAC` has the following format

<Snippet
    header="Lune-HMAC"
    language="bash"
    code={`timestamp=TIMESTAMP,organisation=ORGANISATION_ID,v1=HMAC_VALUE,...`}
/>

<br />

**Where**:

- `TIMESTAMP` is the [Unix epoch](https://en.wikipedia.org/wiki/Unix_time) of when the payload was signed. It may be used to ascertain the payload's age
- `ORGANISATION_ID` is the organisation id associated with the request
- `HMAC_VALUE` is the signature. Lune generates the signature using a [hash-based message authentication code (HMAC)](https://en.wikipedia.org/wiki/HMAC) with SHA-256.

</div>
<div>

### Verify the signature

1. Extract `TIMESTAMP` and the signature from the header
2. Determine the expected signature by computing an HMAC with the SHA256 hash function:

    <Snippet
        header="Expected signature"
        language="bash"
        code={`HMAC-256(SECRET, TIMESTAMP + "." + BODY)`}
    />

    <br />

    **Where**:

    - `SECRET` is the signing secret supplied when you registered the webhook endpoint
    - `TIMESTAMP` is the timestamp in the request's `Lune-HMAC` header
    - `BODY` is the request's body

3. Compare the signature in the header to the expected signature, if they match, process the request, otherwise discard it.

</div>
</div>

<>
</>

</ApiReferenceSection>

<ApiReferenceSection>

<div className="paragraphSections">
<div>

## Webhook request

Consult the [Webhook request](/resources/webhook-request) page to familiarise yourself with webhook requests.

</div>
</div>

<div className="miniSections">

<Snippet
    header="Sample webhook request"
    language="bash"
    code={`curl "https://lune.co/webhook-receiver" \\
  -H "Content-Type: application/json" \\
  -H "Lune-HMAC: timestamp=TIMESTAMP,organisation=va2AER4JyqnzPkYxJgALg0GeQDoXlWO6,v1=TG9yZW0gSXBzdW0gaXMgc2ltcGx5IGR1bW15IHRleHQgb2YgdGhlIHByaW50aW5nIGFuZCB0eXBlc2V0dGluZyBpbmR" \\
  -X POST \\
  -d '{
    "events": [
      {
        "api_version": "v1",
        "event_id": "va1BER4JZqnzPkYxJgALg0GeQDoXlWO5",
        "account_id": "za2BEQ4JZgnzPcYxdiLg1feaoXlWO5"
        "event_type": "order.received",
        "sequence": "2021-09-13T16:21:29.067Z",
        "data": {
          "order": {
            "id": "va1BER4JZqnzPkYxJgALg0GeQDoXlWO5",
            "idempotency_key": "5bd808a954e",
            "type": "quantity",
            "status": "complete",
            "currency": "GBP",
            "offset_cost": "7176.00",
            "total_cost": "7696.00",
            "commission": "520.00",
            "quantity": "1040",
            "created_at": "created_at",
            "bundles": [
              {
                "bundle_id": "va1BEV2VZqnzPkYxJgALg0GeQDoXlWO5",
                "bundle_name": "Latin America Forestry",
                "quantity": "1040",
                "unit_price": "6.90",
                "gross_unit_price": "7.90",
                "offset_cost": "7176.00",
                "insufficient_available_quantity": true
              }
            ],
            "projects": [],
            "certificate": null,
            "email": "john@doe.com",
            "requested_quantity": "1045",
            "requested_value": "7700",
            "estimate_id": null,
          }
        }
      }
    ]
  }'`}
/>

</div>

</ApiReferenceSection>

</div>
