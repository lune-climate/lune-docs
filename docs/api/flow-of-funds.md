---
sidebar_position: 3
sidebar_label: Paying for carbon credits
hide_table_of_contents: true
---

import { ApiReferenceSection } from 'lune-ui-lib'
import LunePaySection from '@site/src/md/lunepay.md';

# Paying for carbon credits

<div className="sections">

<ApiReferenceSection>
<div className="paragraphSections">

Lune provides two payment flows, [**direct invoicing**](#direct-invoicing) and [**Lune Pay**](#lune-pay).

<div>

## Direct invoicing

Customers get invoiced by Lune. Customers receive and settle their invoices according to their terms. Invoices contain an itemized breakdown of charges by Account and Client Account. When customers opt to pay by credit card, the card is charged automatically.

You can manage your billing preferences on the [Lune dashboard](https://dashboard.lune.co/settings/billing).

</div>
</div>

<>

![direct-invoicing](/img/direct-invoicing.png)

</>
</ApiReferenceSection>


<ApiReferenceSection>

<div>

## Lune Pay

<LunePaySection />

</div>

<>

![lune-pay](/img/payment-lunepay.png)

</>

</ApiReferenceSection>


## Which option do we recommend?

<ApiReferenceSection>
<div className="paragraphSections">

<div>

The decision as to which flow to implement ultimately depends on the use case.

## 1. You purchase carbon credits for your company

Your company pays for its credits, and your company name is displayed as the official beneficiary when credits are retired - Use **direct invoicing**.

</div>
</div>

<>

![payment-use-case-1](/img/payment-use-case-1.png)

</>

</ApiReferenceSection>

<ApiReferenceSection>
<div className="paragraphSections">

<div>

## 2. You have integrated the API and want to control the user experience

Your company is Lune's customer. However, carbon credits are purchased and ultimately paid for by your customers.

Use **direct invoicing** if

* You want to control your customer experience
* You are comfortable staying in the flow of funds

</div>
</div>

<>

![payment-use-case-1](/img/payment-use-case-2.png)

</>

</ApiReferenceSection>

<ApiReferenceSection>
<div className="paragraphSections">

<div>

## 3. You have integrated the API and want to stay out of the flow of funds

Your company is Lune's customer. However, carbon credits are purchased and ultimately paid for by your customers.

Use **Lune Pay** if

* You prefer staying out of the flow of funds
* Are comfortable redirecting your users to a Lune hosted page to handle payment

</div>
</div>

<>

![payment-use-case-1](/img/payment-use-case-3.png)

</>

</ApiReferenceSection>

</div>
