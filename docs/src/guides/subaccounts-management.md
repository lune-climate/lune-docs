# Using Subaccounts to perform operations on behalf of your customers

As a Lune account holder, you are able to track emissions and place orders on behalf of your customers.
This will allow you to provide segregated datasets and reflect the quantitive outcome of their impact.

For example, a payments company purchasing carbon offsets on behalf of their customers, or a logistics
company calculating and offsetting the shipping emissions for their customers.

To accommodate this use case, Subaccounts can be created to enable a customer-by-customer view
alongside the main account. This is performed directly through your current dashboard and API.

This guide will take you through the steps required to create and use Subaccounts.

::: tip Terminology

**Customer**: An individual or organisation a current Lune account holder performs actions on behalf of.

**Subaccount**: An ad-hoc account within Lune, purposefully created to enable segregated operations associated with organisation.
:::

## Prerequisites

- Please ensure you have access to [Lune’s dashboard](https://dashboard.lune.co/).
- API keys required in this guide can be found in the [dashboard](https://dashboard.lune.co/api-keys)

## Overview

To perform operations on behalf of a customer:

1. Create a Subaccount for your Customer.
2. Place an order against the Subaccount.
3. View 'All Orders' in the dashboard.

## Create a Subaccount for your customer

Access the dashboard and head to the [Create Subaccounts](https://dashboard.lune.co/settings/sub-accounts/create) section.
Create Subaccounts for your customers as necessary. It is important to note that accounts are tied
to one currency, therefore if a customer requires multiple currencies you will need to set up multiple
Subaccounts in their name.

As an example, this will be your list view of accounts with the addition of three customer Subaccounts as seen on [List Accounts](https://dashboard.lune.co/settings/sub-accounts/list).

<img width="800" :src="$withBase('/organisation_accounts.png')" alt="sample organisation accounts">

## Place an order against the Subaccount

After creating a Subaccount, you are able to use all of the original Lune functionalities on behalf
of your customer via the dashboard or the API. Let us go through both.

### Dashboard

To perform operations for a specific customer standpoint, simply select the desired
Subaccount via the `Account Picker`. All functionalities of the dashboard will behave as normal.
You can create orders, check your activity etc.

<img width="600" :src="$withBase('/account_picker.png')" alt="sample account picker">

### API

To perform operations, head over to the [List Accounts](https://dashboard.lune.co/settings/sub-accounts/list) section and copy the `Account Id` value of
the Subaccount you want to use. Then, in any request to the API, use this `Account Id` in the `Lune-Account` header.
The selected Subaccount will be used as the source of the operation instead of the default account tied to the API key.
Alternatively, you can simply create a new API Key and have the default account be the desired customer account. In this case, the header can be ommitted.

An example of placing an order for the presented customer `Customer 2` via [place an order by value](/api-reference/endpoints-orders.html#create-an-order-by-value):

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
a quick view of all your customer accounts.

<img width="1000" :src="$withBase('/user_orders.png')" alt="sample user orders">
