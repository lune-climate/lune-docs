---
hide_table_of_contents: true
sidebar_position: 1
title: CO₂ unit of measurement
---

<head>
<meta property="og:image" content="https://docs.lune.co/img/co2-units-of-measurement-preview.png" />
<meta property="twitter:image" content="https://docs.lune.co/img/co2-units-of-measurement-preview.png" />


</head>


import Snippet  from '@site/src/components/Snippet';
import { ApiReferenceSection } from 'lune-ui-lib'

<div className="sections">

<ApiReferenceSection>

<div className="paragraphSections">

<div>

Carbon dioxide and the other greenhouse gases are generally measured in metric tonnes (1,000 kg), but kilos and grams can also be used.

</div>
<div>

## What is tCO₂e?

Greenhouse gases are typically given as tCO₂e – tonnes of carbon dioxide equivalent. The e – standing for equivalent – means that the measurement includes greenhouse gases which aren’t carbon dioxide, converted into equivalent amounts of CO₂ based on warming potential.

For example, methane has 28–36 times the global warming potential of CO₂, so 1 tonne of methane would count as 28–36 tonnes of CO₂e.

</div>
</div>

<>

![tCO2e](/img/tco2e.png)

</>

</ApiReferenceSection>

<ApiReferenceSection>

<div className="paragraphSections">

<div>

## Explaining CO₂e to your users

A simple, unobtrusive way of explaining what CO₂e is to your users is to add a small info icon the user can hover for additional context:

_"CO₂e includes all greenhouse gases emitted, converted to the warming power of CO₂."_

</div>
</div>

<>

![maersk](/img/maersk.png)

</>

</ApiReferenceSection>



<ApiReferenceSection>

<div className="paragraphSections">

<div>

## When to use tonnes, kilos, grams

Depending on the product or service that you sell, the carbon emissions will vary drastically.

For example, an intercontinental shipment of goods via sea typically emits a few tonnes of CO₂e. Running cloud computing services for a small company emits a few hundred kilos of CO₂e. Buying most fruits and vegetables emits a few hundred grams of CO₂e.

</div>
</div>

<>

![which-unit](/img/which-unit.png)

</>

</ApiReferenceSection>


<ApiReferenceSection>

<div className="paragraphSections">

<div>

## Keeping units consistent

If you need to display the emissions of products and services in your platform, you should consider a couple things to decide on whether to keep units consistent, or to mix them:
* The relative scale of emissions
* Whether it is important to compare emissions across different items

If the scale of emissions you need to display is relatively consistent (mostly in the tonnes, kilos, or grams range), or you need to make emissions comparable, consider keeping the unit consistent.

</div>
</div>

<>

![unit-consistency](/img/unit-consistency.png)

</>

</ApiReferenceSection>

<ApiReferenceSection>

<div className="paragraphSections">

<div>

## Mixing units

On the other hand, if the scale of emissions you need to display varies significantly (spanning 4 orders of magnitude or more), and comparing emissions isn’t key, consider using the most appropriate unit for each value.

</div>
</div>

<>

![mixing-units](/img/mixing-units.png)

</>

</ApiReferenceSection>
</div>
