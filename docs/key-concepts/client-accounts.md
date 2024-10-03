---
sidebar_position: 4
sidebar_label: Client Accounts
hide_table_of_contents: true
---
import Tip from '@site/src/components/Tip';
import { ApiReferenceSection } from 'lune-ui-lib'

# Client Accounts

<div className="sections">

<ApiReferenceSection>
<div className="paragraphSections">

<div>

## Intro

Lune supports two types of accounts: [Accounts and Client Accounts](/key-concepts/live-test-accounts#accounts).

* Accounts are designed for your own use. It is the simplest way of using the Lune Dashboard and API.
* Client Accounts are designed for B2B customers operating multi-tenant applications.

Accounts and Client Accounts support the same feature set, the fundamental difference is that a Client Account maps one-to-one to your customers and can only be operated via API.

</div>
<div>

### When to use Client Accounts

If you are a B2B business and the ultimate consumer of Lune's services is your customer, we recommend you use Client Accounts.


### When not to use Client Accounts

It is recommend that you don't use Client Accounts if:
* you use Lune not for you customers but for your own company's needs
* your customers are consumers

<br />

By using Client Accounts, you may provide your customer with the following benefits.

</div>
<div>

</div>
</div>

<div className="miniSections">

<>

![intro](/img/client-accounts-intro.png)

</>

</div>

</ApiReferenceSection>

## Client Account benefits


<ApiReferenceSection>

<div className="paragraphSections">

<div>

### Customer segregation

Orders and emission calculation are segregated per Client Account.

Because your customers' activity is segregated from others, you are able query orders and emission calculations per customer.

This enables you to keep mapping logic in your application to a minimum.

</div>
<div>

</div>
</div>

<>

![customer-segregation](/img/client-accounts-segregation.png)

</>

</ApiReferenceSection>

<ApiReferenceSection>

<div className="paragraphSections">

<div>

### Out-of-the-box Customer Analytics

Because of customer segregation, each Client Account provides its own analytics.

You will be able to expose analytics to your customers in your application easily.

</div>
<div>

</div>
</div>

<>

![analytics](/img/client-accounts-analytics.png)

</>

</ApiReferenceSection>

<ApiReferenceSection>

<div className="paragraphSections">

<div>

### Retirement beneficiary

Each Client Account supports a named beneficiary.

When credits are retired, your customer's company name is displayed as the official beneficiary in the registry's public ledger.

</div>
<div>

</div>
</div>

<>

![beneficiary](/img/client-accounts-beneficiary.png)

</>

</ApiReferenceSection>

<ApiReferenceSection>

<div className="paragraphSections">

<div>

### Sustainability page

Each Client Account gets its own public [sustainability page](/guides/share-your-impact).

Your customers will automatically get links to their public sustainability page and retirement certificates to communicate their climate efforts.

</div>
<div>

</div>
</div>

<>

![sustainability-page](/img/client-accounts-sustainability-page.png)

</>

</ApiReferenceSection>

<ApiReferenceSection>

<div className="paragraphSections">

<div>

### Default Project Bundle Selection

Each Client Account gets its own default project bundle selection.

This enables you to set defaults per customer which reduces integration complexity if you need to support different project bundles per customer.

[Learn more](/guides/selecting-project-bundles).

</div>
<div>

</div>
</div>

<>

![default-bundle-selection](/img/client-accounts-default-bundle-selection.png)

</>

</ApiReferenceSection>

<ApiReferenceSection>

<div className="paragraphSections">

<div>

### Itemised billing

We break down offsetting charges by Client Account.

This enables you reconcile any charges with your customers.

</div>
<div>

</div>
</div>

<>

![itemised-billing](/img/client-accounts-itemised-billing.png)

</>

</ApiReferenceSection>

<ApiReferenceSection>

<div className="paragraphSections">

<div>

### Lune Pay support

[Lune Pay](/guides/lune-pay) supports Client Accounts.

Lune Pay enables customers to stay out of the [flow of funds](/key-concepts/flow-of-funds) required to settle Lune invoices and therefore removes the need to manage clients' monies for offsetting.

</div>
<div>

</div>
</div>

<>

![lune-pay](/img/client-accounts-lune-pay.png)

</>

</ApiReferenceSection>

</div>
