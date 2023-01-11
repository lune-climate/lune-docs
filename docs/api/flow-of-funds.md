---
sidebar_position: 3
sidebar_label: Payment - flow of funds
---

# Payment - flow of funds

## Payment flows

Lune provides two payment flows, **direct invoicing** and **Lune Pay**.  

### Direct invoicing

Customers get invoiced by Lune. Customers receive and settle their invoices according to their terms. Invoices contain an itemized breakdown of charges by Account and Client Account. When customers opt to pay by credit card, the card is charged automatically.

You can manage your billing preferences on the [Lune dashboard](https://dashboard.lune.co/settings/billing).

### Lune Pay

## Which payment flow should be used?

The decision as to which flow to implement ultimately depends on the use case.

### Use case 1 - Customers purchase carbon credits for themselves

Customers also pay for their credits, and their company name is displayed as the official beneficiary when credits are retired - Use **direct invoicing**.

### Use case 2 - Customers that operate a b2b platform business

Examples include a digital logistics company or a payments company. The platform business is Lune's customer. However, carbon credits are purchased and ultimately paid for by their customers. Their customers have a Lune Client Account, and their company's name also appears as the official beneficiary when credits are retired - Use **Lune Pay** and use a Client Account for each of their customers.

### Use case 3 - Customers that operate a b2c platform business

Examples include a consumer Neobank app. The platform business is Lune's customer. However, carbon credits are purchased and ultimately paid for by their users. Integration does not require Client Accounts. The official beneficiary when credits are retired is usually Neobank's customers - Use **Lune Pay** where there is a preference to stay out of the flow of funds; otherwise, use **direct invoicing**.
