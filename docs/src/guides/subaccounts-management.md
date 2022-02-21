# Using sub-accounts to manage organisation

To better accomodate complex organisations, sub-accounts can be used to better reflect organisation
levels and provide a better experience throughout. This allows to use dashboard or API functionalities
as a merchant of your organisation.
This guide will take you through the steps required to create and use sub-accounts.

## Pre-requisites

- Please ensure you have access to [Lune’s dashboard](https://dashboard.lune.co/).
- API Keys required in this guide can be found in the [dashboard](https://dashboard.lune.co/api-keys)

## Overview

To use a sub-account as merchant:

1. Access the dashboard and head to the [Sub-Accounts](https://dashboard.lune.co/settings/sub-accounts). A list of all your accounts are present with the possibility of creating new ones.
2. Create accounts for your merchants as necessary. Remember that an account is tied to a currency, so if a merchant requires multiple currencies several accounts need to be created.
3. After creating the accounts, your merchant can now use Lune functionalities under your organisation via the dashboard or the API.
   - Via the dashboard, simply use the account picker as normal and select the merchant account.
   - Via the API, use the `Lune-Account` header to specify which merchant account to use when performing any action.

## Real world example

Let us go through a real world scenario. In this case, we have created three new accounts, one for each merchant we have. The list of our accounts as seen on [Sub-Accounts](https://dashboard.lune.co/settings/sub-accounts) is now:

<img width="600" :src="$withBase('/organisation_accounts.png')" alt="sample organisation accounts">

To perform dashboard operations from a merchant standpoint, simply select the desired account via the `Account Picker`. All functionalities of the dashboard will behave as normal. You can create orders, check your activity etc.

<img width="600" :src="$withBase('/account_picker.png')" alt="sample account picker">

To perform API operations, head over to the [Sub-Accounts](https://dashboard.lune.co/settings/sub-accounts) section and copy the `account id` value. Use it in the `Lune-Account` header for any operation and that account will be used. Alternatively, you can simply create a new API Key and have the default account be the desired merchant account, the header can then be ommited.

An example of placing an order for the presented `Merchant 2` via [place an order by value](/api-reference/endpoints-orders.html#create-an-order-by-value):

```bash
curl -X POST "https://api.lune.co/v1/orders/by-value" \
	-H "Content-Type: application/json" \
	-H "Lune-Account: Bj6Omz2RXaDnr7ygnA5NLQ4g9lbZxP0v" \
	-H "Authorization: Bearer <API_KEY>" \
	-d '{ "value": "60.24" }'
```

## Orders aggregated view

To aid in the visualization of all the orders under your organisation(s), you can head over to the [User Orders](https://dashboard.lune.co/settings/user-orders) section. All orders from which you have access to will be presented. You can filter by organisation, account and account type, providing you with a quick view of all your merchant accounts.

<img width="1000" :src="$withBase('/user_orders.png')" alt="sample user orders">
