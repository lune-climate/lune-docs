---
sidebar_position: 4
sidebar_label: Authentication
---

# Authentication

The Lune API uses API Keys to authenticate requests.

An API key corresponds to a specific account (a user can have access to multiple accounts, including test accounts, see the <a href="live-test-accounts">Live and test accounts section</a>).

You can view and manage your keys from the Lune Dashboard.

Please keep the keys secret.

If a key is compromised you can delete and re-create a new one at any time.

API keys are used as Bearer tokens included in the Authorization header.

`Authorization: Bearer <API_KEY>`

An API key corresponds to a specific account but can target other accounts from the organisation that owns the API key.
Only a subset of accounts can be targeted, depending on the type of account the API key is associated with.
If a live account is associated, any live accounts can be targeted but not test accounts. Vice-versa for test accounts.
Accounts matching the type of account the API key is associated with can be targeted with the `Lune-Account` header.
Provide a different account ID in the header and that account will be used to perform the API call.
