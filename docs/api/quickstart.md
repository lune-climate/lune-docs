---
sidebar_position: 1
sidebar_label: Quick start
hide_table_of_contents: true
---

# Quick start

The Lune API makes it very easy to purchase carbon offsets:

1. [Sign up](https://dashboard.lune.co/signup) to Lune
2. Get your [API Key](https://dashboard.lune.co/developers) from the dashboard

then:

import { Snippet } from 'lune-ui-lib';

<Snippet header="Place an order" language="bash" children={`curl https://api.lune.co/v1/orders/by-mass \\
  -H 'Authorization: Bearer <API_KEY>' \\
  -X POST \\
  -d '{"mass": { "amount": "100.510", "unit": "t"} }'
`}/>

<br />

**You've removed 100.51 tonnes of carbon! 🎉**


Any issues? Email us [support@lune.co](mailto:support@lune.co) 🙏
