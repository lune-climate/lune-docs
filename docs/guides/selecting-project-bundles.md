---
hide_table_of_contents: true
---

import LuneApiSection from '@site/src/md/luneapi.md';
import ApiKeySection from '@site/src/md/apikey.md';
import Concepts from '@site/src/md/concepts.md';
import ClientAccountSection from '@site/src/md/clientaccount.md';
import Snippet  from '@site/src/components/Snippet';
import Tip from '@site/src/components/Tip';
import { indent } from '@site/src/utils';
import { ApiReferenceSection } from 'lune-ui-lib'

# Selecting project bundles

<div className="sections">
<ApiReferenceSection>
<div className="paragraphSections">

<div>

<LuneApiSection />

</div>
<div>

## Overview

By default, and as a starting point for each of our customers, Lune provides default Project bundles, referred to as "Lune defaults," for each Account and Client Account.  

Using these defaults means that each order to offset CO₂ emissions will be placed against the following projects and ratios:

- Conserving forests in Asia - 95%
- Ocean Carbon Removal - 5%

For more advanced use cases, it is possible to overwrite the Lune defaults by defining a Project bundle or Bundle portfolio for an Account or Client account.

In this guide, you will learn how to interact with the Lune API to:

1.  Get the available Project bundles and Bundle portfolios
2.  Define a default Project bundle or Bundle portfolio for an Client account

</div>
<div>

## Who is this guide for?

This guide is primarily aimed at Product Managers and developers looking to integrate CO₂ emissions estimations and offsetting into an existing end-user experience.

Feel free to contact our [support team](mailto:support@lune.com) if you encounter any issues integrating our logistics use case.

</div>
<div>

## Concepts

<Concepts />

</div>
<div>

## Working with Accounts

When working with an Account, Lune recommends viewing the Project bundles in your [dashboard](https://dashboard.lune.co/) and Bundle portfolios in your [account page](https://dashboard.lune.co/settings/accounts).

This is the equivalent of fetching Project bundles and Bundle portfolios and storing your selection via the Lune API.

As per Client accounts, you will need to store the [offsetting selection](/api-reference/bundle-selections/update-bundle-selection) for your account.

</div>
</div>

<>

![selecting-project-bundles](/img/selecting-project-bundles.png)

</>

</ApiReferenceSection>

<div>

## API flow

![selecting-bundles-apiflow](/img/selecting-bundles-apiflow.png)

</div>

<ApiKeySection />

<ClientAccountSection />

<ApiReferenceSection>

<div className="paragraphSections">

<div>

## Fetching Project bundles and Bundle portfolios

By [fetching Project bundles](/api-reference/projects/list-bundles) and [Bundle portfolios](/api-reference/bundle-portfolios/list-all-bundle-portfolios) and storing the id of one or more of those bundles (and other bundle properties you wish to expose in-app, e.g., bundle images, bundle name, bundle description), you can present your clients with a choice of CO₂ offsetting options.

Fetching both project bundles and bundle portfolios is optional. Retrieve what you need.


<Tip>

Lune recommends fetching Project bundles and Bundle portfolios daily to ensure the presentation of titles, labels, prices, and assets is based on the latest available data.

</Tip>

</div>
<div>

### Project bundles

#### Sample response (truncated)

A successful request will return a container object `data` for each available bundle and the details of each offsetting project in the bundle in `data.projects`.

**Where**:

- `data.id` is the unique identifier of a project bundle that you will you need to store in your code base if you intend to present the bundle to your client on their Offsetting preferences page
-  `data.name` is the name of the project bundle as displayed in the [projects page](https://dashboard.lune.co/projects), e.g., *Renewable energy transition*
- `data.primary_image` is the URL for the primary bundle image
- `data.projects.id` is the unique identifier of a project that forms part of the project bundle, as displayed on the projects page
- `data.projects.name` is the name of a project that forms part of the project bundle, e.g., _De Aar Wind_

We can see how the response message above corresponds to a project in the example:

</div>
</div>

<div class="miniSections">

<Snippet
    header="Sample request - project bundles"
    language="bash"
    code={`curl https://api.lune.co/v1/bundles \\
  -H "Authorization: Bearer $API_KEY"`}
/>

<Snippet
    header="Sample response (truncated)"
    language="json"
    code={`{
  "has_more": true,
  "data": [
    {
      "id": "ljmkOq7vXd239gAEmALWQ8ZGVD5ExNzr",
      "name": "Renewable energy transition",
      "unit_price": "5.78",
      "gross_unit_price": "6.42",
      "currency": "USD",
      "background_colour": "#10348B",
      "primary_image": "https://assets.lune.co/bundles/global-renewables.png",
      "primary_image_hires": "https://assets.lune.co/bundles/global-renewables.png",
      "small_thumbnail": null,
      "description": "Renewable energy projects, e.g., in Central America or India, help the regions shift away from fossil fuels, avoiding carbon emissions as well as creating job opportunities in local communities.",
      "disabled": false,
      "available_quantity": "10166.510933",
      "offset_type": "emissions_reduction",
      "carbon_permanence": null,
      "projects": [
        {
          "id": "rENwqonba279JQAKJpeVL3K6MGR4zjvX",
          "name": "De Aar Wind",
          "short_name": "De Aar Wind",
          "description": "The De Aar Wind Farm project involves the construction and operation of a wind farm in the Northern Cape province of South Africa.  The project consists of 96 wind turbines and the associated infrastructure.\r\n\r\nWith an installed capacity of 144 MW, it is one of the largest wind farms in the country.  Built in 2017, the farm has helped the area shift away from a pollutive fossil fuel powered grid.  ",
          "slug": "de-aar-wind",
          "project_type": "Wind Farm",
          "registry_name": "Verra",
          "registry_link": "https://registry.verra.org/app/projectDetail/VCS/1950",
          "latitude": -30.528424,
          "longitude": 24.246146,
          "country_name": "South Africa",
          "country_code": "ZAF",
          "region": null,
          "logo": "https://assets.lune.co/projects/project-images-v1/de-aar-wind/de-aar-wind-logo.png",
          "primary_image": "https://assets.lune.co/projects/de-aar-1.png",
          "thumbnail_image": "https://assets.lune.co/projects/de-aar-thumb.png",
          "results": [
            "Average emission reductions of over 400,000 tonnes CO2e per year\r",
            "Employment opportunities for local professionals\r",
            "Reduced air pollution\r",
            "CORSIA eligible and certified project"
          ],
          "un_sdg": [
            3,
            4,
            6,
            13
          ],
          "disabled": false,
          "media": [
            {
              "type": "image",
              "url": "https://assets.lune.co/projects/project-images-v1/de-aar-wind/de-aar-wind-1.jpeg",
              "attribution_text": "mulilo.com",
              "attribution_url": "https://mulilo.com/wind-projects/"
            }
          ]
        }
      ]
    }
  ]
}`} />

</div>

</ApiReferenceSection>

<ApiReferenceSection>

<div className="paragraphSections">

<div>

### Bundle portfolios

#### Sample response (truncated)

A successful request will return an object for each bundle in the bundle portfolio and the allocation of that bundle, which must always equal 100.

</div>
<div>

**Where**:

- `id` is the unique identifier of the bundle portfolio that you will you need to store in your code base if you intend to present the bundle to your client on their Offsetting preferences page
- `label` is the name of the bundle portfolio as displayed on your account page, e.g., *Innovative*
- `bundle_selection.bundle_id` is the unique identifier of a project that forms part of the bundle portfolio
-  `bundle_selection.percentage` is the allocation assigned to a project in a bundle portfolio and which must always equal to 100

</div>
</div>

<div className="miniSections">

<Snippet
    header="Sample request - bundle portfolios"
    language="bash"
    code={`curl https://api.lune.co/v1/bundle-portfolios \\
  -H "Authorization: Bearer $API_KEY"`}
/>

<Snippet
    header="Sample request"
    language="json"
    code={`[
  {
    "id": "ljmkOq7vXd239gAEmALWQ8ZGVD5ExNzr",
    "identifier": "oxf",
    "label": "Oxford Principles",
    "bundle_selection": [
      {
          "bundle_id": "ljmkOq7vXd239gAEmALWQ8ZGVD5ExNzr",
          "percentage": 50
      },
      {
          "bundle_id": "va1BER4JZqnzPkYxZALg0GeQDoXlWO5x",
          "percentage": 40
      },
      {
          "bundle_id": "DVndoQ0PZjGMzvYOWY6kbgN1eOJx9B82",
          "percentage": 5
      },
      {
          "bundle_id": "aKBx9NvPQZwGeDyb3Y1j5RWm8b3dJrEM",
          "percentage": 5
      }
    ]
  },
  {
    "id": "q9aKx7b6nNXMk3Yv3pD1mlW5Od2eLZE8",
    "identifier": "inv",
    "label": "Innovative",
    "bundle_selection": [
      {
        "bundle_id": "xWaKJL3okjD46VpJ4yGXnQNZRe1vzP0w",
        "percentage": 10
      },
      {
        "bundle_id": "Dj85vWbLVZNlOayVxpM1K29RgJq4xXze",
        "percentage": 10
      },
      {
        "bundle_id": "15xRmEXZq0NnJLpPnydPr7akGOjV9g3z",
        "percentage": 80
      }
    ]
  },
  {
    "id": "gMbvJoOaX54V1wpNwA8dWDGQ7m239Bx0",
    "identifier": "ntr",
    "label": "Nature-based",
    "bundle_selection": [
      {
        "bundle_id": "q9aKx7b6nNXMk3Yv3pD1mlW5Od2eLZE8",
        "percentage": 33
      },
      {
        "bundle_id": "va1BER4JZqnzPkYxZALg0GeQDoXlWO5x",
        "percentage": 34
      },
      {
        "bundle_id": "L0M3zv7Qr2OGRqY9WAVdbwKPx5XWao64",
        "percentage": 33
      }
    ]
  }
]`}
/>

</div>

</ApiReferenceSection>

<ApiReferenceSection>

<div className="paragraphSections">

<div>

## Storing the offsetting selection

Where you have provided your clients with a choice of offsetting options, you will need to update each [client's offsetting selection](/api-reference/bundle-selections/update-bundle-selection).

To do this, [pass in the Project bundle `id`](/api-reference/bundle-portfolios/update-bundle-portfolio) or [Bundle portfolio `id`](/api-reference/bundle-portfolios/update-bundle-portfolio) along with the client's unique identifier.

<Tip>

If you provide clients with the option not to offset, there is no need to pass in the _No offsetting_ selection.

</Tip>

</div>
</div>

<>
</>

</ApiReferenceSection>

<ApiReferenceSection>

<div className="paragraphSections">

<div>

### Project bundles

#### Sample request - Project bundles

**Where**:

- `$CLIENT_ACCOUNT_ID` - is the unique identifier for the client
- `bundle_id` - is the unique identifier for the chosen Project bundle

</div>
<div>

#### Sample response

A successful request will return the `bundle_id` for the chosen project.

</div>
</div>

<div className="miniSections">

<Snippet
    header="Sample request - project bundles"
    language="bash"
    code={`curl "https://api.lune.co/v1/bundle-selections" \\
  -X PUT \\
  -H "Authorization: Bearer $API_KEY" \\
  -H "Lune-Account: $CLIENT_ACCOUNT_ID" \\
  -H "Content-Type: application/json" \\
  -d '
    [
      {
        "bundle_id": "BmWxrvXo29eGqzA1qjANL5PwnkgaO8R3"
      }
    ]'`} />


<Snippet
    header="Sample response"
    language="json"
    code={`[
  {
    "bundle_id": "ljmkOq7vXd239gAEmALWQ8ZGVD5ExNzr",
    "percentage": 100
  }
]`} />

</div>

</ApiReferenceSection>

<ApiReferenceSection>

<div className="paragraphSections">

<div>

### Bundles portfolios

#### Sample request

**Where**:

- `$CLIENT_ACCOUNT_ID` - is the unique identifier for the client
- `bundle_portfolio_id`- is the unique identifier for the chosen Bundle portfolio

</div>
<div>

#### Sample response

A successful request will return the `id` for the chosen portfolio and the `bundle_id` for each bundle in the portfolio.

**Where**:

- `id` is the unique identifier of the bundle portfolio that you will you need to store in your code base if you intend to present the bundle to your customers
- `label` is the name of the bundle portfolio as displayed on your account page, e.g., *Innovative*
- `bundle_selection.bundle_id` is the unique identifier of a project that forms part of the bundle portfolio
- `bundle_selection.percentage` is the allocation assigned to a project in a bundle portfolio and which must always equal to 100

</div>
</div>

<div className="miniSections">

<Snippet
    header="Sample request - bundle portfolios"
    language="bash"
    code={`curl "https://api.lune.co/v1/bundle-portfolios" \\
  -X PUT \\
  -H "Authorization: Bearer $API_KEY" \\
  -H "Lune-Account: $CLIENT_ACCOUNT_ID" \\
  -H "Content-Type: application/json" \\
  -d '
    [
      {
          "bundle_portfolio_id": "ljmkOq7vXd239gAEmALWQ8ZGVD5ExNzr"
      }
    ]'`} />


<Snippet
    header="Sample response"
    language="json"
    code={`{
  "id": "q9aKx7b6nNXMk3Yv3pD1mlW5Od2eLZE8",
  "identifier": "inv",
  "label": "Innovative",
  "bundle_selection": [
    {
       "bundle_id": "xWaKJL3okjD46VpJ4yGXnQNZRe1vzP0w",
       "percentage": 10
    },
    {
      "bundle_id": "Dj85vWbLVZNlOayVxpM1K29RgJq4xXze",
      "percentage": 10
    },
    {
      "bundle_id": "15xRmEXZq0NnJLpPnydPr7akGOjV9g3z",
      "percentage": 80
    }
  ]
}`} />

</div>

</ApiReferenceSection>

</div>
