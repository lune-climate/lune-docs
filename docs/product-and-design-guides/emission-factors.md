---
hide_table_of_contents: true
sidebar_position: 3
title: Emission factors
---

<head>
<meta property="og:image" content="https://docs.lune.co/img/what-is-an-emission-factor.png" />
<meta property="twitter:image" content="https://docs.lune.co/img/what-is-an-emission-factor.png" />
</head>

import Snippet  from '@site/src/components/Snippet';
import { ApiReferenceSection } from 'lune-ui-lib'

<div className="sections">

<ApiReferenceSection>

<div className="paragraphSections">

<div>

## What is an Emission Factor?

A value that represents the amount of CO₂e released into the environment per unit of activity (such as km driven, fuel burned, number of items). It is used to estimate emissions from various sources of air pollution.

Examples of Emissions Factors include:
* Paddy rice: 0.4867 kgCO₂e / EUR
* Oil tanker: 61 gCO₂e / tkm
* Petrol: 0.062 kgCO₂e / kWh

To get the total emissions of something, we multiple the Emissions Factor by the activity or spend.

</div>
</div>

<>

![what-is-an-emisison-factor](/img/what-is-an-emission-factor.png)

</>

</ApiReferenceSection>

<ApiReferenceSection>

<div className="paragraphSections">

<div>

## Paddy rice example

The complete Emission Factor for paddy rice has the following structure:
* Value: 0.4867 kgCO₂e / EUR
* Source: EXIOBASE
* Region: Portugal
* Year: 2021

**This EF uses a currency unit (EUR)**, which means that in order to use it to calculate emissions, the monetary value of the paddy rice produced must be known.

**The source of this EF is EXIOBASE**, a consortium of scientific organisations and universities who are experts in this type of data.

**The region of this EF is Portugal**, which means that it has been calculated from Portuguese data.

**The year of this EF is 2021**, which means that it has been calculated using data from 2021, and published on that year.

</div>
</div>

<>

![paddy-rice](/img/paddy-rice.png)

</>

</ApiReferenceSection>

<ApiReferenceSection>

<div className="paragraphSections">

<div>

## Oil tanker example

The complete Emission Factor for an oil tanker has the following structure:
* Value: 61 gCO₂e / tkm
* Source: GLEC
* Region: Global
* Year: 2019
* Size: Medium, 5–60 dwkt
* Fuel: Heavy Fuel Oil

**This EF uses a mass-distance unit (tkm)**. Tkm (tonne-kilometre) means that this EF refers to 1 tonne transported over 1km. In order to use this EF to calculate emissions, the load and distance of the transported goods must be known.

**The source of this EF is GLEC**, the leading international standard for logistics emissions calculations, created by the Smart Freight Centre.

**The region of this EF is Global**, as sea shipping is generally global.

**The year of this EF is 2019**, as the GLEC Framework version 2.0 was released in 2019.

**This EF refers to a medium-sized oil tanker**, as opposed to small or large ones, which would have different Emission Factors.

**This EF refers to an oil tanker running on Heavy Fuel Oil**, as opposed to those running on Marine Gas Oil, which would have a different Emission Factor.

</div>
</div>

<>

![oil-tanker](/img/oil-tanker.png)

</>

</ApiReferenceSection>

<ApiReferenceSection>

<div className="paragraphSections">

<div>

## Petrol example

The complete Emission Factor for petrol has the following structure:
* Value: 0.0655 kgCO₂e / kWh
* Source: BEIS
* Region: United Kingdom
* Year: 2022
* Calorific value: net
* Blend: 100% mineral petrol

**This EF uses an energy unit (kWh)**, which means that in order to use this EF to calculate emissions, the energy produced with the petrol (in kWh) must be known.

**The source of this EF is BEIS**, the Department for Business, Energy & Industrial Strategy in the UK government.

**The region of this EF is United Kingdom**, which means that it has been calculated from UK data.

**The year of this EF is 2022**, which means that it has been calculated using data from 2022, and published on that year.

**This EF refers to the net calorific value produced burning the fuel**. Without getting too technical, this simply refers to the net amount of energy produced, ignoring any dissipation, as opposed to the gross calorific value which would have a different Emission Factor.

**This EF refers to a 100% mineral oil blend**, as opposed to a biofuel blend, which would have a different Emission Factor.

</div>
</div>

<>

![petrol](/img/petrol.png)

</>

</ApiReferenceSection>

</div>
