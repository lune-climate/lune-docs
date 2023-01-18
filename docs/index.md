---
hide_table_of_contents: true
---

import { ApiReferenceSection, Button } from 'lune-ui-lib'
import Snippet  from '@site/src/components/Snippet';
import ThreeColumnLayout from '@site/src/components/ThreeColumnLayout';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

# Lune Documentation


<div className="sections">

Learn how to use Lune to make your product or service climate positive.

<ThreeColumnLayout>

<!-- Column0 -->
<div>
<>

![logistics](/img/home-acmecargo.png)

</>

<div className="homeParagraphSections">
<>

## Sustainable Logistics

In this guide, you will learn how to interact with the Lune API to:

* Calculate emissions for shipments
* Offset emissions for shipments

</>
<>

<Button
    className="whiteHover"
    leftIcon={<ArrowCircleRightIcon />}
    sx={{ textTransform: 'none' }}
    href="/guides/integrate-logistics"
>Get Started
</Button>
</>
</div>
</div>


<!-- Column1 -->
<div>
<>

![payments](/img/home-acmepay.png)

</>

<div className="homeParagraphSections">

<>

## Payments Contribution

In this guide, you will learn how to interact with the Lune API to:

1. Enable merchants to opt-in to contribute a percentage of a transaction value towards carbon removal at checkout
2. Purchase carbon removal credits

</>
<>
<Button
    className="whiteHover"
    leftIcon={<ArrowCircleRightIcon />}
    sx={{ textTransform: 'none' }}
    href="/guides/integrate-payments"
>Get Started
</Button>
</>

</div>
</div>


<!-- Column2 -->
<div>
<>

![payments](/img/home-acmebank.png)

</>

<div className="homeParagraphSections">

<>

## Green Banking

In this guide, you will learn how to interact with the Lune API to:

1. Calculate emissions for financial transactions
2. Offset those emissions.

</>
<>
<Button
    className="whiteHover"
    leftIcon={<ArrowCircleRightIcon />}
    sx={{ textTransform: 'none' }}
    href="/guides/integrate-fintech"
>Get Started
</Button>
</>

</div>
</div>
</ThreeColumnLayout>


<hr />


<ApiReferenceSection>
<div className="homeParagraphSections">

<div>

## API Reference

</div>
<div>

Create climate positive customer experiences by integrating innovative carbon removal with just a few lines of code. You are in full control.

</div>
<div>

<Button
    className="whiteHover"
    leftIcon={<ArrowCircleRightIcon />}
    sx={{ textTransform: 'none' }}
    href="/api/introduction"
>View API Reference
</Button>

</div>
</div>

<div className="miniSections">

<Snippet
    header="Sample order"
    language="bash"
    code={`curl https://api.lune.co/v1/orders/by-mass \\
  -H 'Content-Type: application/json' \\
  -H "Authorization: Bearer $API_KEY" \\
  -X POST \\
  -d '{
  "mass": {
    "amount": "259.111",
    "unit": "kg"
  }
}'`} />

</div>

</ApiReferenceSection>


</div>
