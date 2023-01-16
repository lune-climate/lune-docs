---
hide_table_of_contents: true
---

import { ApiReferenceSection, Button } from 'lune-ui-lib'
import Snippet  from '@site/src/components/Snippet';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

# Lune Documentation

<div className="sections">

<ApiReferenceSection>
<div className="homeParagraphSections">

<div>

Learn how to use Lune to make your product or service climate positive.

</div>
</div>

<>

</>

</ApiReferenceSection>

<ApiReferenceSection>
<div className="homeParagraphSections">

<div>

## Sustainable Logistics

</div>
<div>

In this guide, you will learn how to interact with the Lune API to:

* Calculate emissions for shipments
* Offset emissions for shipments

</div>
<div>

<Button
    className="whiteHover"
    leftIcon={<ArrowCircleRightIcon />}
    sx={{ textTransform: 'none' }}
    href="/guides/integrate-logistics"
>Get Started
</Button>

</div>
</div>

<>

![logistics](/img/home-acmecargo.png)

</>

</ApiReferenceSection>

<ApiReferenceSection>
<div className="homeParagraphSections">

<div>

## Payments Contribution

</div>
<div>

In this guide, you will learn how to interact with the Lune API to:

1. Enable merchants to opt-in to contribute a percentage of a transaction value towards carbon removal at checkout
2. Purchase carbon removal credits

</div>
<div>

<Button
    className="whiteHover"
    leftIcon={<ArrowCircleRightIcon />}
    sx={{ textTransform: 'none' }}
    href="/guides/integrate-payments"
>Get Started
</Button>

</div>
</div>

<>

![payments](/img/home-acmepay.png)

</>

</ApiReferenceSection>


<ApiReferenceSection>
<div className="homeParagraphSections">

<div>

## Green Banking

</div>
<div>

In this guide, you will learn how to interact with the Lune API to:

1. Calculate emissions for financial transactions
2. Offset those emissions.

</div>
<div>

<Button
    className="whiteHover"
    leftIcon={<ArrowCircleRightIcon />}
    sx={{ textTransform: 'none' }}
    href="/guides/integrate-payments"
>Get Started
</Button>

</div>
</div>

<>

![payments](/img/home-acmebank.png)

</>

</ApiReferenceSection>

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
    href="/api/quickstart"
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
