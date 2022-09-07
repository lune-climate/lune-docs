---
sidebar_position: 2
sidebar_label: Live/Test accounts
---

# Live and test accounts

A user can have access to multiple accounts, in the simplest case there'll be one live account and one test account by default.

Live accounts are the accounts through which you purchase real offsets and there'll be real money changing hands.

Test accounts behave similarly (you can place orders, get quotes, fetch orders and activity),
but there's no real money or real offsets involved. The purpose of test accounts is to be able
to experiment with the API with no consequences.

To better simulate the full order flow there's a process that'll credit your test account every once in a while (to bring the outstanding balance to zero, if there are any orders made) and go through the carbon credit retirement process for any orders needing it.

Orders and acitivity belong to an account used to generate them, so if you make an order using live account A you won't see it on test account B's order list and vice versa.
