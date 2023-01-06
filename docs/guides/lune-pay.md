---
hide_table_of_contents: true
---

import LuneApiSection from '@site/src/md/luneapi.md';
import ApiKeySection from '@site/src/md/apikey.md';
import LunePaySection from '@site/src/md/lunepay.md';
import ClientAccountSection from '@site/src/md/clientaccount.md';
import Snippet  from '@site/src/components/Snippet';
import Tip from '@site/src/components/Tip';
import { ApiReferenceSection } from 'lune-ui-lib'

# Lune Pay

<div className="sections">

<ApiReferenceSection>
<div className="paragraphSections">

<div>

<LuneApiSection />

</div>
<div>

## Overview

<LunePaySection />

In this guide, you will learn how to:

1.  Generate a Lune Pay link to redirect users to
2.  Handling redirection to your app

</div>
<div>

## Who is this guide for?

This guide is primarily aimed at developers looking
to integrate CO₂ removal into an existing end-user experience.

Feel free to contact our [support team](mailto:support@lune.com) if you encounter any issues integrating our payments use case.

</div>
<div>

## Concepts

- **Client account** - You must create a Client account for each client to define their basic characteristics, such as name, currency, and beneficiary.  Clients will be provided Lune defaults
- **Lune defaults** - Lune has provided a default Project bundle for each of our clients.  Every order will be placed against the following projects and ratios:
  - Conserving forests in Asia - 95%
  - Ocean Carbon Removal - 5%
- **Project bundle** - Group of offsetting projects with similar characteristics., e.g., _Conserving forests in Asia_ and _Ocean Carbon Removal_

</div>
</div>
<>

![lune-pay](/img/lune-pay.png)

</>
</ApiReferenceSection>

<div>

## Flow

![api-flow](/img/payments-apiflow.png)

</div>


<ApiKeySection />

<ClientAccountSection />


<ApiReferenceSection>

<div className="paragraphSections">

<div>

## Generate and embed a Lune Pay URL

Lune Pay URLs have the following format: `https://pay.lune.co/<CLIENT_ACCOUNT_ID>`.

**Where**:

- `<CLIENT_ACCOUNT_ID>` is the unique identifier for the client

Successful payments credit the Client Account identified by `<CLIENT_ACCOUNT_ID>`.

</div>
<div>

### Configuration

Lune Pay can be configured by providing several optional query parameters:

- `quantity` is used to prefill the mass to offset in tCO₂
- `redurect_url` is the url to redirect to once the payment completes
- `redirect_label` is your company/service name.  It is used to populate a 'Back to <redirect_label>' button
- `external_id` is a customer-defined id.  It serves two purposes:
  1. It enforces flow uniqueness.  If a customer has completed a payment with a specific `external_id`, it cannot complete additional payments with the same `external_id`
  2. it is appended to `redirect_url` as a query parameter.  Customers can use `external_id` for flow reconciliation
- `bundle_id` is the id of the bundle or bundles (multiples are supported) to display.  If not set, the account's default bundle selection is displayed.  You can extract bundle ids by using the API's [list project bundles endpoint](resources/projects/list-bundles)

</div>
<div>

### Embed Lune Pay URL

Embed Lune Pay's URL in your app in a button.

Clicking on the button should redirect the user to Lune Pay's URL.

</div>
<div>

</div>

</div>

<div className="miniSections">

<Snippet
    header="Sample URL"
    language="bash"
    code={`https://pay.lune.co/zK7ExbX0ejgLM5YR3Qp3B2mVnW9rawPl?quantity=100&bundle_id=xWaKJL3okjD46VpJ4yGXnQNZRe1vzP0w&bundle_id=15xRmEXZq0NnJLpPnydPr7akGOjV9g3z&bundle_id=L0M3zv7Qr2OGRqY9WAVdbwKPx5XWao64`} />

<>

![order-confirmation](/img/payments-order-confirmation.png)

</>
</div>

</ApiReferenceSection>

<ApiReferenceSection>

<>

## Handle redirection to your app

On successful payment, the user is shown a confirmation page.

Clicking `Back to <redirect_label>` redirects the user to `redirect_url`.

The following query parameters are appended to `redirect_url`:

- `external_id` if it was provided initially.  `external_id` can be used to identify the flow
- `temporary_id` is a unique temporary identifier representing the payment.  The id is valid for 15 minutes and allows clients to retrieve payment details without authentication using the [get payment by temporary id endpoint](/resources/payments/get-payment-by-temporary-id).  This parameter is useful if a customer wants to build a frontend confirmation screen showing Lune Pay information

</>
<div className="miniSections">
<>

![thank-you](/img/lune-pay-thank-you.png)

</>
<>

![thank-you](/img/lune-pay-thank-you.png)

</>
</div>

</ApiReferenceSection>

</div>
