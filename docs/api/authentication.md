---
sidebar_position: 4
sidebar_label: Authentication
---

# Authentication

The Lune API uses API Keys to authenticate requests.

An API key corresponds to a specific account (a user can have access to multiple accounts, including test accounts, see the <a href="#section/Live-and-test-accounts">Live and test accounts section</a>).

You can view and manage your keys from the Lune Dashboard.

Please keep the keys secret.

If a key is compromised you can delete and re-create a new one at any time.

API keys are used as Bearer tokens included in the Authorization header.

`Authorization: Bearer <API_KEY>`

An API key is linked to a specific account but they can access all accounts that the organisation owning
the API key has access to. This can be done using the `Lune-Account` header. Provide a different account
ID in the header and that account will be used to perform the API call.
