---
hide_table_of_contents: true
sidebar_position: 2
title: Carbon intensity
---

<head>
<meta property="og:image" content="https://docs.lune.co/img/carbon-intensity-preview.png" />
<meta property="twitter:image" content="https://docs.lune.co/img/carbon-intensity-preview.png" />
</head>

import Snippet  from '@site/src/components/Snippet';
import { ApiReferenceSection } from 'lune-ui-lib'

<div className="sections">

<ApiReferenceSection>

<div className="paragraphSections">

<div>

Carbon intensity measures how polluting a product or service is.

The more CO₂e a product or service emits – per unit – the higher its carbon intensity.

</div>
<div>

## Measuring logistics carbon intensity

Logistics carbon intensity is measured in gCO₂e / tkm.

That’s a mouthful, let’s unpack it:
* gCO₂e means: how many grams of CO₂e are emitted
* t means: for each tonne transported
* km means: for each kilometre travelled

</div>
</div>

<>

![carbon-intensity](/img/carbon-intensity.png)

</>

</ApiReferenceSection>


<ApiReferenceSection>

<div className="paragraphSections">

<div>

## Flight, maritime, road, and rail freight

Carbon intensity varies significantly depending on the transport method used. For example flights’ carbon intensity ranges between 560 and 1,390 gCO₂e / tkm, while maritime shipments range between 6 and 50 gCO₂e / tkm.

Even within the same transport method category, carbon intensity can vary significantly. For example for container ships there’s a few things to consider:
* The age of the ship
* The size of the ship
* The type of engine it uses
* The type of fuel it uses

*Data from the Fourth IMO GHG Study 2020* shows for example that within the same bulk carrier category the carbon intensity can range between 2.2 and 37.6 gCO₂e / tkm.

</div>
</div>

<>

![intensities-by-method](/img/intensities-by-method.png)

</>

</ApiReferenceSection>


<ApiReferenceSection>

<div className="paragraphSections">

<div>

## Visualising carbon intensity

In this example, a company wants to nudge customers in using more EVs for shipping goods. To achieve this they want to show each customer’s carbon intensity, compared to the average.

Carbon intensity ranges between 0 and 97 gCO₂ / tkm (based on their customers’ aggregate data). The average is 42 gCO₂ / tkm.

</div>
</div>

<>

![visualise-carbon-intensity](/img/visualise-carbon-intensity.png)

</>

</ApiReferenceSection>


<ApiReferenceSection>

<div className="paragraphSections">

<div>

In this other example, a company allows users to ship their goods with many transport methods, ranging from maritime to air freight.

They want to nudge their users to become sustainability leaders and move them away from excessively using air freight, which has a high carbon intensity.

Again, using aggregate data they have defined 3 bands:
* Leader, below 200 gCO₂ / tkm
* Average, between 200 and 400 gCO₂ / tkm
* Too much air freight, above 400 gCO₂ / tkm

</div>
</div>

<>

![average-carbon-intensity](/img/average-carbon-intensity.png)

</>

</ApiReferenceSection>

<ApiReferenceSection>

<div className="paragraphSections">

<div>

## Carbon intensity over time

With regulations asking companies to disclose and reduce their emissions, you can help your users by visualising their carbon intensity over time.

Companies investing effort in decarbonising their operations, will be able to see their efforts materialise in lower carbon intensity month over month.

Companies not paying much attention to the issue might see their carbon intensity go up over time.

</div>
</div>

<>

![intensity-over-time](/img/intensity-over-time.png)

</>

</ApiReferenceSection>

</div>
