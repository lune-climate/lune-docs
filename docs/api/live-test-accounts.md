---
sidebar_position: 3
sidebar_label: Modes, accounts, and API keys
---
import Tip from '@site/src/components/Tip';

# Modes, accounts, and API keys

Before interacting with the Lune API, you'll need to provision your access through an API key.  API keys can be created in both "live" and "test" modes; there are some important differences between these modes, which we'll look at in depth in this article.  

Once created, your API key can then be used to work with accounts and client accounts.  We'll also cover the differences between these account types and why you would choose to work with client accounts.

## Live and test modes

Lune offers both live and test modes through a single endpoint.  The test mode is essentially a sandbox that provides you with a safe environment to test your interactions with the Lune API.  

You'll find the toggle to turn on test mode on your [dashboard](dashboard.lune.co).

![test-mode](/img/test-mode.png)

The test mode can be used as an effective sandbox to:

- Calculate emissions
- Place orders to offset emissions
- Simulate [order status](/api/order) transitions

The test mode therefore enables you to interact with the Lune API in the same way as you would with in live mode, without being charged and without retiring
and completing orders.

To work in test mode, you'll need a dedicated test API key.  So, once you've enabled test mode, head over to the [Developers](dashboard.lune.co/developers) page and create a test API key.

<Tip>

Your test API key can be used with multiple test accounts and multiple test client accounts but cannot be used with live accounts.

</Tip>


Test accounts behave similarly (you can place orders, get quotes, fetch orders and activity), but there's no real money or real offsets involved. The purpose of test accounts is to be able to experiment with the API with no consequences.



A user can have access to multiple accounts, in the simplest case there'll be one live account and one test account by default.

Live accounts are the accounts through which you purchase real offsets and there'll be real money changing hands.

Test accounts behave similarly (you can place orders, get quotes, fetch orders and activity), but there's no real money or real offsets involved. The purpose of test accounts is to be able to experiment with the API with no consequences.

To better simulate the full order flow there's a process that'll credit your test account every once in a while (to bring the outstanding balance to zero, if there are any orders made) and go through the carbon credit retirement process for any orders needing it.

Orders and acitivity belong to an account used to generate them, so if you make an order using live account A you won't see it on test account B's order list and vice versa.




Lune offers both test and live modes

Accounts are provisioned through an API keys

Test accounts can be used as an effective sandbox:

- place orders but not be charged
- simulated order states
- use in confidence whilst testing

Before interacting with the Lune API provisioning is required through accounts, with both test and live modes, which are then linked with API keys.  

The relationship between modes and API keys is shown in the following diagram:

[insert diagram]

## Account modes

Lune offers a single environment, which can be used with both test and live modes.

## Live vs test

## Client accounts

## API keys

### Live vs test





A user can have access to multiple accounts, in the simplest case there'll be one live account and one test account by default.

Live accounts are the accounts through which you purchase real offsets and there'll be real money changing hands.

Test accounts behave similarly (you can place orders, get quotes, fetch orders and activity),
but there's no real money or real offsets involved. The purpose of test accounts is to be able
to experiment with the API with no consequences.

To better simulate the full order flow there's a process that'll credit your test account every once in a while (to bring the outstanding balance to zero, if there are any orders made) and go through the carbon credit retirement process for any orders needing it.

Orders and acitivity belong to an account used to generate them, so if you make an order using live account A you won't see it on test account B's order list and vice versa.
