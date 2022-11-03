---
sidebar_position: 2
sidebar_label: Authentication
---

# Authentication

The Lune API uses API Keys to authenticate requests.

API keys are used as Bearer tokens and must be included in the Authorization header.

`Authorization: Bearer <API_KEY>`


## Creating an API Key

Head over to the [Dashboard](https://dashboard.lune.co/developers) to create an API Key.

API Keys created with test mode enabled can only perform test operations and will never affect your live environment.
Use Test API Keys with confidence while you build your app.

API Keys created with test mode disabled perform live operations.
Use in your production app.
Keep your keys safe.

Note: only *admin*s can create API Keys.

## Accessing Client Accounts

API Keys operate on a default account.
You can, however, perform API requests on any account in your organisation as long as the account's mode, test or live, is consistent with the API Key's mode.

This enables you to operate on [Client Accounts](/resources/client-accounts/client-account) without generating new API Keys.

To operate on an API Key's non-default account, include the following header in your requests:

`Lune-Account: <ACCOUNT_ID>`
