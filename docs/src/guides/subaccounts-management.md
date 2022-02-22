# Using Subaccounts to perform operations on behalf of your customers

Certain organisations must place orders, or more generically, perform specific actions on behalf of
their customers.

This is especially true for payments companies who want to purchase carbon offsets on behalf of their
merchants, or logistic companies who want to calculate and offset shipping emissions on behalf of
their customers.

To accomodate for this use case, Subaccounts can be used to perform these operations via the dashboard
or the API.

This guide will take you through the steps required to create and use Subaccounts.

::: tip Terminology

**Merchant**: Any particular customer a Lune User wants to perform actions on behalf of. This is usually
associated with merchants of payment companies, but the term can reflect any customer or entity.

**Subaccount**: Any account that is purposely created to be operated on behalf of a Merchant.
There is technically no difference between a Subaccount and any other Account.
:::

## Prerequisites

- Please ensure you have access to [Lune’s dashboard](https://dashboard.lune.co/).
- API keys required in this guide can be found in the [dashboard](https://dashboard.lune.co/api-keys)

## Overview

To perform operations on behalf of a merchant:

1. Create a Subaccount for your Merchant.
2. Place an order against the Subaccount.
3. View 'All Orders' in the dashboard.

## Create a Subaccount for your merchant

Access the dashboard and head to the [Subaccounts](https://dashboard.lune.co/settings/sub-accounts). A list of all your accounts are present with the possibility of creating new ones. Create accounts for your merchants as necessary. Remember that an account is tied to a currency, so if a merchant requires multiple currencies several accounts need to be created.

As an example, this is a list of accounts after creating three Subaccounts for our merchants:
<img width="600" :src="$withBase('/organisation_accounts.png')" alt="sample organisation accounts">

## Place an order against the Subaccount

After creating the accounts, you can now fully use all Lune functionalities on behalf of the merchant via the dashboard or the API. Let us go through both.

### Dashboard

To perform operations from a merchant standpoint, simply select the desired account via the `Account Picker`. All functionalities of the dashboard will behave as normal. You can create orders, check your activity etc.

<img width="600" :src="$withBase('/account_picker.png')" alt="sample account picker">

### API

To perform operations, head over to the [Subaccounts](https://dashboard.lune.co/settings/sub-accounts) section and copy the `Account Id` value of
the Subaccount you want to use. Then, in any request to the API, use this `Account Id` in the `Lune-Account` header.
That Subaccount will be used as the source of the operation instead of the default account tied to the API key.
Alternatively, you can simply create a new API Key and have the default account be the desired merchant account. In this case, the header can be ommited.

An example of placing an order for the presented `Merchant 2` via [place an order by value](/api-reference/endpoints-orders.html#create-an-order-by-value):

```bash
curl -X POST "https://api.lune.co/v1/orders/by-value" \
	-H "Content-Type: application/json" \
	-H "Lune-Account: Bj6Omz2RXaDnr7ygnA5NLQ4g9lbZxP0v" \
	-H "Authorization: Bearer <API_KEY>" \
	-d '{ "value": "60.24" }'
```

## View 'All orders' in the dashboard.

To aid in the visualization of all the orders under your organisation(s), you can head over to the [All Orders](https://dashboard.lune.co/settings/all-orders) section.
All orders from which you have access to will be presented here. You can filter by organisation, account and account type, providing you with
a quick view of all your merchant accounts.

<img width="1000" :src="$withBase('/user_orders.png')" alt="sample user orders">
