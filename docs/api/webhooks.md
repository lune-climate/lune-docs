---
sidebar_position: 8
sidebar_label: Webhooks
---

# Webhooks

After creating a webhook you can listen to events that occur in your Lune Account. This enables you to react to these events. Think of a webhook as a way to get notifications of activity that happens in your account.

API calls are a mechanism for *you*, the API client, to send requests to Lune (for example to place an
order). Webhooks are a mechanism for Lune to send notifications to you, right when a relevant event happens,
without you having to repeatedly call the API and ask for the information (which is wasteful in terms
of resources).

Currently, webhooks events are limited to order status changes that changes in your account (an event is generated whenever an order status changes).

Your webhook endpoint has to respond with a 2xx HTTP status code within 30 seconds. If we don't get a 2xx status code or the request times out we will treat is as failure and try to resend it with a delay.

The events sent to the webhook endpoint are batched – we send multiple events in a single request.
There's a limit to the number of events we send at once, if there are more events waiting to be sent
we only send a number of the oldest ones.

# Delivery guarantees

* Events are always delivered in the order they happened from the point of view of Lune's systems.
  The order may not be obvious when multiple actions are performed concurrently (for example when
  you place multiple orders at the same time you can't know which order will generate events first).
* Particularly, order events corresponding to one order are always delivered in the order
  consistent with the transitions described in the "Order status and lifecycle" documentation section.
* Events are always delivered in the same order (this concerns retries).
* Events are delivered at least once – they may be tried to be delivered multiple times
  if there were earlier attemps that failed (either because of a communication error or a non-2xx HTTP
  status code). If you endpoint responds with a 2xx status code there's no guarantee that the response
  will be registered by Lune's systems – the response may be lost in transit.
* Lune only attempts one request to your webhook endpoint at a time. There are some caveats:

  * If we successfully manage to send a request but the communication is interrupted before we get
    a response we have no way to know if the request reached your webhook endpoint.
  * If the 30 second timeout is reached we abandon the request on our side but we have no way
    of ensuring that the processing of the request on your side isn't continuing.

  With that in mind, if you depend on there being strictly one and only one webhook request being
  processed at any given time it's your responsibility to ensure that.

# Idempotency
It is necessary to handle the same events being delivered multiple times (for the reasons mentioned
above). This is achieved by keeping track of already processed `event_id`s – if you see the same
`event_id` again you know you can ignore the event it corresponds to. Alternatively, you can keep
track of the events `sequence`s – this string value is guaranteed to be monotonically increasing and
you can use it as a last processed event marker. If you stored `B` as last processed event sequence
value and you receive a re-delivered event with sequence `A` that contains a value lexicographically
"smaller" than `B` then you know you can ignore the event.

# Payload authentication and integrity
[HMAC](https://en.wikipedia.org/wiki/HMAC) is a security measure which allows you to verify the
integrity and authenticity of the data you’re receiving. Every request we make to your webhook
endpoint has a header `Lune-HMAC` set. The header has to be used to validate the integrity and
authenticity of the payload, which ensures that the request actually comes from Lune and no one has
tampered with it.

The header has the following format:

**timestamp=TIMESTAMP,account=ACCOUNT_ID,v1=HMAC_VALUE,...**

Where:
* `TIMESTAMP` is the current [Unix epoch](https://en.wikipedia.org/wiki/Unix_time). It is used to
verify the message has an acceptable age.
* `ACCOUNT_ID` is the account id associated with the webhook. It can be used to distinguish multiple
webhooks pointed to the same URL.
* `HMAC_VALUE` is the value calculated in the following way:

**HMAC-256(SECRET, TIMESTAMP + "." + BODY)**

* `HMAC-256` is the HMAC version using the SHA-256 hashing algorithm
* `SECRET` is a per-webhook secret generated when the webhook is created. The secret can be
  regenerated and fetched from the API.
* `BODY` is the body of the incoming request

Lune reserves the right to send multiple `v1=...` blocks in the header (in case there are multiple
secrets active) and your code has to handle that.

To verify the integrity and authenticity of the request you have to follow these steps\:
* (Optional) Determine which webhook is sending you data and select the appropriate `SECRET` by
extracting the account from the header (`ACCOUNT_ID` referrenced above)
* Extract the timestamp from the header (we call it `TIMESTAMP` from now on)
* Verify that the `TIMESTAMP` is no more than two minutes in the past (this ensures that you don't
  try to process old requests). If the `TIMESTAMP` is too old you should reject the request with
  a non-2xx status code.
* Calculate `YOUR_HMAC = HMAC-256(SECRET, TIMESTAMP + "." + BODY)
* Verify that the header contains an `v1=...` block with value equal to your `YOUR_HMAC` value.

An HTTP request with missing or malformed `Lune-HMAC` header or for which the HMAC verification
fails (the calculated HMAC does not match any of the HMACs in the `Lune-HMAC` header) must not be
processed in any way (no action to be performed based on the payload) and must be rejected by
returning a non-2xx HTTP status code.

# A mock webhook Request
The request itself consist of two headers and the payload. One of the headers is the previously mentioned HMAC header, the other is the *Content-Type* which is *application/json*.

For testing purposes, if you want to produce an example request, this can be simulated with

import { Snippet } from 'lune-ui-lib';

<Snippet header="Sample request" language="bash" children={`curl https://api.lune.co/v1/orders/by-mass \\
  -H 'Authorization: Bearer <API_KEY>' \\
  -X POST \\
  -d '{"mass": { "amount": "100.510", "unit": "t"} }'
`}/>

where `WEBHOOK_URL` is your webhook endpoint and `THE_HEADER_VALUE` of form `timestamp=...,v1=...`
can be produced using the algorithm above.

# Handling unknown event_types
Lune may introduce events with new `event_type`s. Your code should ignore unknown `event_type`s
to make sure it remains future-proof.

# The payload format
The <a href="../resources/webhook-request">WebhookRequest</a> mock endpoint documents the data format that the webhook endpoints should expect.
