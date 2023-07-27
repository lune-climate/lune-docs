---
sidebar_position: 1
sidebar_label: Introduction
hide_table_of_contents: true
---
import { ApiReferenceSection } from 'lune-ui-lib'
import Snippet  from '@site/src/components/Snippet';

# Introduction

<div className="sections">

<ApiReferenceSection>

<div className="paragraphSections">
<div>

## Place an order with a few lines of code

The Lune API makes it very easy to purchase carbon offsets:

1. [Sign up](https://dashboard.lune.co/signup) to Lune
2. Get your [API Key](https://dashboard.lune.co/developers) from the dashboard
3. Copy paste the following snippet in a terminal

**You've removed 100.51 tonnes of carbon! 🎉**


You can now head over to the [dashboard](https://dashboard.lune.co/orders) review your order.

</div>
<div>

Lune's OpenAPI specification is available for [download](https://docs.lune.co/openapi.yml).

</div>
</div>

<div className="miniSections">

<Snippet
    header="Place an order"
    language="bash"
    code={`curl https://api.lune.co/v1/orders/by-mass \\
  -H 'Content-Type: application/json' \\
  -H "Authorization: Bearer $API_KEY" \\
  -X POST \\
  -d '{
  "mass": {
    "amount": "100.51",
    "unit": "t"
  }
}'`} />

</div>

</ApiReferenceSection>

<ApiReferenceSection>

<div className="paragraphSections">
<div>

## Support

Contact our [support team](mailto:support@lune.co) if you encounter any issues integrating.

</div>
</div>

<>
</>

</ApiReferenceSection>

</div>
