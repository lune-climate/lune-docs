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


## Which payment flow should be used?

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

## 2. Your business customers purchase carbon credits through you (B2B)

Examples include a digital logistics company or a payments company. Your companuy is Lune's customer. However, carbon credits are purchased and ultimately paid for by your customers. Your customers have a Lune Client Account, and their company's name also appears as the official beneficiary when credits are retired - Use **Lune Pay** and use a Client Account for each of yout customers.

</div>
</div>

<>

![payment-use-case-1](/img/payment-use-case-2.png)

</>

</ApiReferenceSection>

<ApiReferenceSection>
<div className="paragraphSections">

<div>

## 3. Your consumer customers purchase carbon credits through you (B2C)

Examples include a consumer Neobank app. Your company is Lune's customer. However, carbon credits are purchased and ultimately paid for by your users. Integration does not require Client Accounts. The official beneficiary when credits are retired is usually 'Neobank's customers' - Use **Lune Pay** where there is a preference to stay out of the flow of funds; otherwise, use **direct invoicing**.

</div>
</div>

<>

![payment-use-case-1](/img/payment-use-case-3.png)

</>

</ApiReferenceSection>

</div>
