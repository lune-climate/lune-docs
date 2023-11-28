---
hide_table_of_contents: true
---
import Tip from '@site/src/components/Tip';
import { ApiReferenceSection } from 'lune-ui-lib'

# No-code analytics for end-customers

<div className="sections">

<ApiReferenceSection>
<div className="paragraphSections">

<div>

## Overview

In this guide, you will learn how to embed a link to a no-code analytics page in order for you customers to:
1. view shipment emissions analytics
2. explore emission estimates for their shipments
3. understand how individual estimates were calculated.

</div>
<div>

## Who is this guide for?

This guide is aimed at Sustainability Specialists or Product Managers.

Feel free to contact our [support team](mailto:support@lune.com) if you encounter any issues.

</div>

</div>

<>

![logistics-csv-upload](/img/logistics-sheets-overview.png)

</>
</ApiReferenceSection>

<ApiReferenceSection>

<div className="paragraphSections">

<div>

## Requirements

1. Create Client Accounts with handles
2. Calculate emission estimates through Client Accounts
3. Mark emission estimates as shipments

</div>
<div>

### Create Client Accounts with handles

In order for your customers to have their own analytics and individual emission estimates pages, you are required to create a Client Account for each customer.
Client Accounts can be created via [API](/api-reference/client-accounts/create-client-account) or [Logistics CSV spreadsheet](/guides/logistics-sheets#reference).

For Client Account details follow [this link](/key-concepts/client-accounts).

When creating a Client Account provide a `handle`.
The handle must be unique per organisation and can only contain lowercase alphanumeric characters, underscore and dashes.

<Tip>

The handle is defined by clients to uniquely identify their customers.

It is URL friendly, therefore it can be included in links.

</Tip>

</div>
<div>

### Calculate emission estimates through Client Accounts

Emission estimates must be performed with a specific Client Account.

To act as a Client Account
* via the API through [single](/api-reference/emission-estimates/create-shipping-estimate/) or [multi-leg](/api-reference/emission-estimates/create-multi-leg-shipping-estimate/) requests, clients can issue requests using the `Lune-Account` header.
* via the [Logistics CSV spreadsheet](/guides/logistics-sheets), provide a `handle` in the `client_account_handle` column. Client Accounts are created if required.

</div>
<div>

### Mark emission estimates as shipment

Emission estimates are not always performed for shipments. For instance, you may perform estimates during the booking flow.

In order for the analytics page to display analytics for shipments, emission estimates must be marked as shipments, either:
* via the API through **[PLACEHOLDER]** endpoint
* via the Logistics CSV spreadsheet by populating the `is_shipment` column with `true`


</div>
</div>

<>

![emission-estimates-client-accounts](/img/logistics-sheets-download-csv-template.png)

</>

</ApiReferenceSection>

<ApiReferenceSection>

<div className="paragraphSections">

<div>

## Client Account analytics URL

Each of your customer is representated by a distinct Client Account and therefore gets its own analytics and individual emission estimates pages.

Because the `handle` was define by you, you are able to construct the URL for your customer's analytics page.

The URL is as follows:

```
https://sustainabilty.lune.co/logistics/<ORG_ID>/<HANDLE>
```

**Where**:

- `<ORG_ID>` is your organisation id. This value does not change. Your id can be copied from your [settings page](https://dashboard.lune.co/settings).
- `<HANDLE>` is the handle defined by you.


Note: for test Client Accounts use the following url: `https://sustainabilty.lune.co/logistics/test/<ORG_ID>/<HANDLE>`.

</div>
</div>

<>

![construct-analytics-url](/img/logistics-sheets-download-csv-template.png)

</>

</ApiReferenceSection>

<ApiReferenceSection>

<div className="paragraphSections">

<div>

## Embed the URL in your app

Once you've constructed the URL, you can embed it in a link or button within your app. We recommend opening a new tab or window.

This enables your customers to:
1. view emissions analytics
2. explore emission estimates for their shipments
3. understand how individual estimates were calculated.

</div>
</div>

<>

![](/img/logistics-sheets-download-csv-template.png)

</>

</ApiReferenceSection>

</div>
