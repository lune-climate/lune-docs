---
hide_table_of_contents: true
---

import LuneApiSection from '@site/src/md/luneapi.md';
import ApiKeySection from '@site/src/md/apikey.md';
import ClientAccountSection from '@site/src/md/clientaccount.md';
import Snippet  from '@site/src/components/Snippet';
import Tip from '@site/src/components/Tip';
import { ApiReferenceSection } from 'lune-ui-lib'

# Share your climate impact

<div className="sections">

<ApiReferenceSection>
<div className="paragraphSections">

<div>

<LuneApiSection />

</div>
<div>

## Overview

In this guide, you will learn how to set up a public sustainability page to:

1. Share your climate impact
2. Enable your clients to share their climate impact

A sample Sustainability page can be seen [here](https://sustainability.lune.co/lune-example-impact).

</div>
<div>

## Who is this guide for?

This guide is aimed at heads of Sustainability or Growth Specialists to manage their Sustainability page via the Lune dashboard and developers looking to automatically integrate sustainability pages into an existing end-user experience.

Feel free to contact our [support team](mailto:support@lune.com) if you encounter any issues integrating our payments use case.

</div>
<div>

## Concepts

- **Beneficiary** - Legal entity that can claim the offsetting benefits and is listed in the official public registry
- **Certificate** - Proof of retired carbon credits in the beneficiary's name. Can be used in Net Zero audits
- **Client account** - Customers that wish to provide a Sustainability page to their clients must create a client account for each client to define their basic characteristics, such as name, currency, and beneficiary

</div>
</div>
<>

![Sustainability page](/img/sustainability-page.png)

</>
</ApiReferenceSection>

<ApiReferenceSection>

<>

## Create a sustainability page for your account

Head over to the Lune dashboard.

1. Navigate to https://dashboard.lune.co/share-your-impact

2. Create or edit the page's public URL. The public URL may be changed if not already taken

3. Decide what title, description, and sections you'd like to display. You may opt to display your own description if you prefer

4. The Sustainability page is published by pressing `Save`

<Tip>

A Sustainability page is always linked to an account or client account.

</Tip>

<Tip>

A Sustainability page is created by default on an account's first order.

You may disable the page if you do not wish to share your impact.

</Tip>

</>
<>

![Dashboard sustainability page](/img/dashboard-sustainability-page.png)

</>

</ApiReferenceSection>

<ApiReferenceSection>

<>

## Certificates

Certificates contain links to the official entry in the registry's retirement ledger.

The account's `beneficiary` is the entity in the certificate and the registry claiming the offsetting benefits.

A certificate may list credits as:

* `Retired` - the carbon credits have been fully retired
* `Allocated, pending retirement` - the carbon credits have been purchased but cannot be retired yet.

<br />

</>
<>

![Certificate](/img/certificate.png)

</>

</ApiReferenceSection>


<div>

## Create a sustainability page for your clients

## API flow

![api-flow](/img/payments-apiflow.png)

</div>


<ApiKeySection />

<ClientAccountSection />

<ApiReferenceSection>

<div className="paragraphSections">

<div>

## Create a Sustainability page

You can [create a Sustainability page](/resources/sustainability-page/create-sustainability-page) via the API.

<Tip>

A Sustainability page is created by default on an account's first order.

</Tip>

<Tip>

When using Client Accounts, store the Sustainability page's slug in your database to point your clients to the page.

</Tip>


</div>
<div>

### Sample request
**Where**:

- `$CLIENT_ACCOUNT_ID` is the unique identifier for the client account
- `slug` is the globally unique slug to append to `https://sustainability.lune.co/`

<Tip>

Sustainability pages for test accounts include a `/test/` prefix before `slug`.

</Tip>

</div>
<div>

### Sample response

A 200 response code confirms the Sustainability page has been created.

A 409 response code is returned when:

* A Sustainability page already exists
* The `slug` is not available

</div>

</div>

<div className="miniSections">

<Snippet
    header="Sample request"
    language="bash"
    code={`curl https://api.lune.co/v1/sustainability-pages \\
  -H 'Content-Type: application/json' \\
  -H "Authorization: Bearer $API_KEY" \\
  -H "Lune-Account: $CLIENT_ACCOUNT_ID" \\
  -X POST \\
  -d '
    {
      "status": "enabled",
      "slug": "acme",
      "title": "by_volume",
      "description": "by_equivalent"
      "sections": [
        "bundles_breakdown",
        "certificates",
        "unsdg"
      ],
    }'`} />

<Snippet
    header="Sample response"
    language="json"
    code={`{
  "title": "by_volume",
  "sections": [
    "bundles_breakdown",
    "certificates",
    "unsdg"
  ],
  "slug": "acme",
  "status": "enabled",
  "description": "by_equivalent"
  "custom_description": null
}`} />

</div>

</ApiReferenceSection>

<ApiReferenceSection>

<div className="paragraphSections">

<div>

## Update a Sustainability page

You can also [update a Sustainability page](/resources/sustainability-page/update-sustainability-page) via the API.

</div>
<div>

### Sample request

The request's payload is equivalent to the [create a Sustainability page](#create-a-sustainability-page) request.

Use a `PUT` request instead of a `POST`.

</div>
<div>

### Sample response

A 200 response code confirms the Sustainability page has been updated.

A 409 response code is returned when `slug` is not available.

</div>

</div>

<div className="miniSections">

<Snippet
    header="Sample request"
    language="bash"
    code={`curl https://api.lune.co/v1/sustainability-pages \\
  -H 'Content-Type: application/json' \\
  -H "Authorization: Bearer $API_KEY" \\
  -H "Lune-Account: $CLIENT_ACCOUNT_ID" \\
  -X PUT \\
  -d '
    {
      "status": "enabled",
      "slug": "acme",
      "title": "by_volume",
      "description": "by_equivalent"
      "sections": [
        "bundles_breakdown",
        "certificates",
        "unsdg"
      ],
    }'`} />

<Snippet
    header="Sample response"
    language="json"
    code={`{
  "title": "by_volume",
  "sections": [
    "bundles_breakdown",
    "certificates",
    "unsdg"
  ],
  "slug": "acme",
  "status": "enabled",
  "description": "by_equivalent"
  "custom_description": null
}`} />

</div>

</ApiReferenceSection>

<ApiReferenceSection>

<div className="paragraphSections">

<div>

## Get a Sustainability page

You can [retrieve a Sustainability page](/resources/sustainability-page/get-public-sustainability-page) via the API.

</div>
<div>

### Sample request

**Where**:

- `$CLIENT_ACCOUNT_ID` is the unique identifier for the client account

</div>
<div>

### Sample response

A 404 response code is returned when the Sustainability page has not been created.

</div>

</div>

<div className="miniSections">

<Snippet
    header="Sample request"
    language="bash"
    code={`curl https://api.lune.co/v1/sustainability-pages/current-account \\
  -H 'Content-Type: application/json' \\
  -H "Authorization: Bearer $API_KEY" \\
  -H "Lune-Account: $CLIENT_ACCOUNT_ID"`} />

<Snippet
    header="Sample response"
    language="json"
    code={`{
  "title": "by_volume",
  "sections": [
    "bundles_breakdown",
    "certificates",
    "unsdg"
  ],
  "slug": "acme",
  "status": "enabled",
  "description": "by_equivalent"
  "custom_description": null
}`} />

</div>

</ApiReferenceSection>

</div>
