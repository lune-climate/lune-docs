---
sidebar_position: 1
sidebar_label: Quick Start
hide_table_of_contents: true
---

# Intro

The Lune API makes it very easy to purchase carbon offsets:

1. [Sign up](https://dashboard.lune.co/signup) to Lune
2. Validate your email
3. Get your [API Key](https://dashboard.lune.co/api-keys) from the dashboard

then:

import { Snippet } from 'lune-ui-lib';

<Snippet header={"Create Order By Mass"} lineNumbers={false} language={"curl"} children={`curl https://api.lune.co/v1/orders/by-mass \\
  -H 'Authorization: Bearer <API_KEY>' \\
  -X POST \\
  -d '{"mass": { "amount": "100.510", "unit": "t"} }'
`}/>

**You've just purchased 100.51 tonnes of Carbon Offsets! 🎉**

## API Reference

The OpenAPI schema can be downloaded [here](/openapi.yml).

::: warning
Please note the API reference is still in **beta**.
:::

If you encounter any issues, it would be greatly appreciated if you could take one of the following actions:
* Submit an issue or pull request on [github](https://github.com/lune-climate/lune-docs)
* Email us: [support@lune.co](mailto:support@lune.co)

🙏
