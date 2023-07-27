---
sidebar_position: 3
sidebar_label: Modes, accounts, and API keys
hide_table_of_contents: true
---
import Tip from '@site/src/components/Tip';
import { ApiReferenceSection } from 'lune-ui-lib'
import ReactPlayer from 'react-player'

# Modes, accounts, and API keys

<div className="sections">

<ApiReferenceSection>
<div className="paragraphSections">

<div>

## Intro

Before interacting with the Lune API, you'll need to provision your access through an API key.  API keys are used as bearer tokens and must be included in the Authorization header.

API keys can be created in both "live" and "test" modes; there are some important differences between these modes, which we'll look at in depth in this article.  

Once created, your API key can then be used to work with accounts and client accounts.  We'll also cover the differences between these account types and why you would choose to work with client accounts.

</div>

<div>

### Live keys

- Live keys can be used with multiple live accounts and multiple live client accounts
- Live keys are used to programmatically create live client accounts

</div>
<div>

### Test keys

- Test keys can be used with multiple test accounts and multiple test client accounts
- Test keys are used to programmatically create test client accounts

</div>
</div>

<div className="miniSections">

<>

![live-keys](/img/live-keys.png)

</>

<>

![test-keys](/img/test-keys.png)

</>

</div>

</ApiReferenceSection>

## Live and test modes

<ApiReferenceSection>

<div className="paragraphSections">

<div>

Lune offers both live and test modes through a single endpoint.  Test mode provides you with a safe environment to test your interactions with the Lune API.

You'll find the toggle to turn on test mode on your [dashboard](https://dashboard.lune.co).

</div>
<div>

### Working in test mode

Test mode can be used as an effective sandbox whilst building your app to:

- Calculate emissions
- Place orders to offset emissions
- Simulate [order status](/key-concepts/order) transitions

and enables you to interact with the Lune API in the same way as you would with in live mode, without being charged and without retiring and completing orders.

</div>
<div>

### Your dedicated test API key

To work in test mode, you'll need a dedicated test API key.  So, once you've enabled test mode, head over to the [Developers](https://dashboard.lune.co/developers) page and create a test API key.  You can now use this key to:

- Generate requests to the Lune API for any test accounts
- Create new test client accounts and, once done, generate requests for test client accounts

</div>
<div>

## Accounts

Depending on the use case, Lune clients will work with Accounts or Client accounts.  Let's summmarize the differences:

- Client accounts are designed for B2B customers working with multi-tenancy applications whereas Accounts are designed for consumer apps in the eCommerce vertical
- Client accounts are created programmatically.  The API key (created in live or test mode) determines whether the Client account is a live or test account

### Default accounts

When creating a new key whether live or test, you'll need to select a default account.  When generating requests against this default account, you can simply pass in your bearer token in the Authorization header:

```html
Authorization: Bearer <API_KEY>
```

But you can also use your API key for any other account (account or client account) **as long as the API key mode matches the account's mode**, by including the account Id in your header:

**Example account**:

```html
Authorization: Bearer <API_KEY>
Lune-Account: <ACCOUNT_ID>
```

**Example client account**:

```html
Authorization: Bearer <API_KEY>
Lune-Account: <CLIENT_ACCOUNT_ID>
```

<Tip>

You can generate API requests on any account/client account in your organization as long as the account's mode, test or live, is consistent with the API key's mode.

</Tip>

</div>
</div>



<div className="react-player-test-mode-wrapper">
<ReactPlayer loop className="react-player"playing muted url='/videos/test-mode.mp4' width="100%" height="100%" />
</div>

</ApiReferenceSection>

</div>
