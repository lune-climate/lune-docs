---
hide_table_of_contents: true
---

import LuneApiSection from '@site/src/md/luneapi.md';
import ApiKeySection from '@site/src/md/apikey.md';
import ClientAccountSection from '@site/src/md/clientaccount.md';
import Snippet  from '@site/src/components/Snippet';
import Tip from '@site/src/components/Tip';
import { indent } from '@site/src/utils';
import { ApiReferenceSection } from 'lune-ui-lib'

# Sustainable logistics

<div className="sections">

<ApiReferenceSection>
<div className="paragraphSections">

<div>

<LuneApiSection />

</div>

<div>

## Overview

In this guide, you will learn how to interact with the Lune API to:

1.  Calculate emissions for shipments
2.  Offset emissions for shipments

</div>

<div>

## Who is this guide for?

This guide is primarily aimed at Product Managers and developers looking
to integrate CO₂ emissions estimations and offsetting into an existing end-user experience.

Feel free to contact our [support team](mailto:support@lune.com) if you encounter any issues integrating our logistics use case.

<Tip>

Lune is [Smart Freight Centre](https://www.notion.so/luneco/Shipping-Emission-Calculations-f591e8b57c72421ebb4790a88ef8d0e9) accredited, following the GLEC Framework.

</Tip>

</div>
<div>

## Concepts

- **Client account** - You must create a client account for each of your clients to define their basic characteristics, such as name, currency, and beneficiary.  Clients will be provided Lune defaults
- **Lune defaults** - Lune has provided a default Project bundle for each of our clients.  Every order will be placed against the following projects and ratios:
  - Conserving forests in Asia - 95%
  - Ocean Carbon Removal - 5%
- **Project bundle** - Group of offsetting projects with similar characteristics., e.g., _Conserving forests in Asia_ and _Ocean Carbon Removal_
- **Offsetting preferences page** - Your clients will [decide whether to offset CO₂ emissions](#store-a-clients-offsetting-decision) on this page

</div>
</div>
<>

![logistics-calcs](/img/logistics-calcs.png)

</>
</ApiReferenceSection>

<div>

## API flow

![logistics-flow](/img/logistics-apiflow.png)

</div>


<ApiKeySection />

<ClientAccountSection />


<ApiReferenceSection>
<>

## Store a client's offsetting decision

On the Offsetting preferences page, your clients will be able to select whether to offset the CO₂ emissions from their logistics operation:

Store this decision in your database.

</>
<>


![offsetting-decision](/img/logistics-offsettingdecision.png)

</>
</ApiReferenceSection>

<ApiReferenceSection>

<div className="paragraphSections">

<div>

## Calculating CO₂ emissions for a shipment


To present an [estimate of CO₂ emissions for a given shipping route](/resources/emission-estimates/create-multi-leg-shipping-estimate), pass in the journey details (e.g., route source and destination for one or more journey legs, shipment mode, load).

</div>
<div>


### Sample request


**Where**:

- `$CLIENT_ACCOUNT_ID` is the unique identifier for the client
- `shipment` defines the shipment load; in this example, 40 tonnes
- `legs` is a container object for one or more journey legs
- `route` is the source and destination for each leg in the chosen journey, which can either be the shipping distance or the start/destination address pair (physical address or coordinates)
- `method` is the chosen form of transport

</div>
<div>

### Sample response

A successful 200 request will result in an estimate of offsetting costs for the chosen journey.


**Where**:

- `id` is the unique identifier for the CO₂ emissions estimate
- `legs` is a container object for one or more journey legs, which includes the CO₂ emissions `legs.mass.amount` and distance per leg
- `mass.amount` is the aggregated CO₂ emissions for the chosen journey
- `quote.bundles` is a container object that confirms the client's offsetting decision (as defined in the Offsetting preferences page) and provides the details of each bundle, including the bundle id, bundle name, and unit price
- `quote.estimated_total_cost` is the total cost of offsetting the CO₂ emissions in the client's currency
- `distance` is the total distance for the chosen journey

</div>
</div>

<div className="miniSections">

<Snippet
    header="Sample request"
    language="bash"
    code={`curl https://api.lune.co/v1/estimates/shipping/multi-leg \\
${indent(`-H 'Content-Type: application/json' \\
-H "Authorization: Bearer $API_KEY" \\
-H "Lune-Account: $CLIENT_ACCOUNT_ID" \\
-X POST \\
-d '
{
  "shipment": {
    "mass": {
      "amount": "10.36",
      "unit": "t"
    }
  },
  "legs": [
    {
      "route": {
        "source": {
          "lon": 120.960515,
          "lat": 23.69781
        },
        "destination": {
          "lon": 120.5075,
          "lat": 24.255
        }
      },
      "method": "diesel_truck"
    },
    {
      "route": {
        "source": {
          "lon": 120.5075,
          "lat": 24.255
        },
        "destination": {
          "lon": 121.51,
          "lat": 25.03
        }
      },
      "method": {
        "vessel_type": "container_ship"
      }
    },
    {
      "route": {
        "source": {
          "lon": 121.51,
          "lat": 25.03
        },
        "destination": {
          "lon": 9.9619,
          "lat": 53.5231
        }
      },
      "method": {
        "vessel_imo_number": "9893890"
      }
    },
    {
      "route": {
        "source": {
          "lon": 9.9619,
          "lat": 53.5231
        },
        "destination": {
          "lon": 13.49587,
          "lat": 52.4857
        }
      },
      "method": "electric_freight_train"
    },
    {
      "route": {
        "source": {
          "lon": 13.49587,
          "lat": 52.4857
        },
        "destination": {
          "lon": 13.2937333,
          "lat": 52.362524
        }
      },
      "method": "diesel_truck"
    }
  ]
}'`, 2)}`}
/>

<Snippet
    header="Sample response"
    language="json"
    code={`{
  "legs": [
    {
      "mass": {
        "unit": "t",
        "amount": "0.089758"
      },
      "distance": {
        "unit": "km",
        "amount": "106.9614"
      },
      "methodology": []
    },
    {
      "mass": {
        "unit": "t",
        "amount": "0.030356"
      },
      "distance": {
        "unit": "km",
        "amount": "266.02"
      },
      "methodology": []
    },
    {
      "mass": {
        "unit": "t",
        "amount": "0.897291"
      },
      "distance": {
        "unit": "km",
        "amount": "22247.389399999996"
      },
      "methodology": []
    },
    {
      "mass": {
        "unit": "t",
        "amount": "0.048678"
      },
      "distance": {
        "unit": "km",
        "amount": "313.8612"
      },
      "methodology": []
    },
    {
      "mass": {
        "unit": "t",
        "amount": "0.039615"
      },
      "distance": {
        "unit": "km",
        "amount": "47.2081"
      },
      "methodology": []
    }
  ],
  "mass": {
    "unit": "t",
    "amount": "1.105698"
  },
  "quote": {
    "bundles": [
      {
        "quantity": "1.050413",
        "bundle_id": "q9aKx7b6nNXMk3Yv3pD1mlW5Od2eLZE8",
        "unit_price": "12.65",
        "bundle_name": "Conserving forests in Asia",
        "offset_cost": "13.29",
        "gross_unit_price": "14.06",
        "insufficient_available_quantity": null
      },
      {
        "quantity": "0.055284",
        "bundle_id": "xWaKJL3okjD46VpJ4yGXnQNZRe1vzP0w",
        "unit_price": "250",
        "bundle_name": "Ocean Carbon Removal",
        "offset_cost": "13.82",
        "gross_unit_price": "277.78",
        "insufficient_available_quantity": null
      }
    ],
    "currency": "USD",
    "requested_value": null,
    "estimated_quantity": "1.105697",
    "requested_quantity": "1.105698",
    "estimated_commission": "3.02",
    "estimated_total_cost": "30.13",
    "estimated_offset_cost": "27.11"
  },
  "distance": {
    "unit": "km",
    "amount": "22981.440099999996"
  },
  "id": "08QD7GPaBx5b6Y6mJlWyONXLvrZljRE2",
  "request": {
    "shipment": {
      "mass": {
        "amount": "10.36",
        "unit": "t"
      }
    },
    "legs": [
      {
        "route": {
          "source": {
            "lon": 120.960515,
            "lat": 23.69781
          },
          "destination": {
            "lon": 120.5075,
            "lat": 24.255
          }
        },
        "method": "diesel_truck"
      },
      {
        "route": {
          "source": {
            "lon": 120.5075,
            "lat": 24.255
          },
          "destination": {
            "lon": 121.51,
            "lat": 25.03
          }
        },
        "method": {
          "vessel_type": "container_ship"
        }
      },
      {
        "route": {
          "source": {
            "lon": 121.51,
            "lat": 25.03
          },
          "destination": {
            "lon": 9.9619,
            "lat": 53.5231
          }
        },
        "method": {
          "vessel_imo_number": "9893890"
        }
      },
      {
        "route": {
          "source": {
            "lon": 9.9619,
            "lat": 53.5231
          },
          "destination": {
            "lon": 13.49587,
            "lat": 52.4857
          }
        },
        "method": "electric_freight_train"
      },
      {
        "route": {
          "source": {
            "lon": 13.49587,
            "lat": 52.4857
          },
          "destination": {
            "lon": 13.2937333,
            "lat": 52.362524
          }
        },
        "method": "diesel_truck"
      }
    ]
  }
    }`}
/>

![logisticscalcs](/img/logisticscalcs.png)

</div>
</ApiReferenceSection>

<ApiReferenceSection>
<div className="paragraphSections">

<div>

## Offsetting shipment emissions

For clients that have [opted to offset their emissions](#store-a-clients-offsetting-decision) in their Offsetting preferences page, when they book a shipment, you can present a [confirmation of a booking](/resources/orders/create-order-by-estimate), including the amount of CO₂ emissions that will be offset, the Lune default Project bundle, and the total cost of offsetting the CO₂ emissions.  To do this, pass in the estimate id:

</div>

<div>

### Sample request

**Where**:

- `$CLIENT_ACCOUNT_ID` is the unique identifier for the client
- `estimate_id` is the unique identifier for the emissions estimate

</div>
<div>

### Sample response

A successful request will return an order summary, which can be displayed as part of your confirmation flow.


**Where**:

- `id` is the unique identifier for the booking

</div>
</div>
<div className="miniSections">

<Snippet
    header="Sample request"
    language="bash"
    code={`curl https://api.lune.co/v1/orders/by-estimate \\
  -H 'Content-Type: application/json' \\
  -H "Authorization: Bearer $API_KEY" \\
  -H "Lune-Account: $CLIENT_ACCOUNT_ID" \\
  -X POST \
  -d '
  {
    "estimate_id": "08QD7GPaBx5b6Y6mJlWyONXLvrZljRE2"
  }'`}
/>


<Snippet
    header="Sample response"
    language="json"
    code={`{
  "id": "a1BER4JZqnzPkYxLKQeYLg0GeQDoXlWO",
  "metadata": {},
  "idempotency_key": null,
  "type": "quantity",
  "status": "placed",
  "currency": "USD",
  "offset_cost": "27.11",
  "total_cost": "30.13",
  "commission": "3.02",
  "quantity": "1.105697",
  "created_at": "2022-10-19T16:58:44.558Z",
  "bundles": [
    {
      "bundle_id": "q9aKx7b6nNXMk3Yv3pD1mlW5Od2eLZE8",
      "bundle_name": "Conserving forests in Asia",
      "quantity": "1.050413",
      "unit_price": "12.65",
      "gross_unit_price": "14.06",
      "offset_cost": "13.29",
      "insufficient_available_quantity": null
    },
    {
      "bundle_id": "xWaKJL3okjD46VpJ4yGXnQNZRe1vzP0w",
      "bundle_name": "Ocean Carbon Removal",
      "quantity": "0.055284",
      "unit_price": "250",
      "gross_unit_price": "277.78",
      "offset_cost": "13.82",
      "insufficient_available_quantity": false
    }
  ],
  "projects": [],
  "certificate": null,
  "offset_link_id": null,
  "email": null,
  "estimate_id": "08QD7GPaBx5b6Y6mJlWyONXLvrZljRE2",
  "requested_quantity": "1.105698",
  "requested_value": null
}`}
/>

![order-confirmation](/img/logistics-confirmation.png)

</div>
</ApiReferenceSection>

</div>
