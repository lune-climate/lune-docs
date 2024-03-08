---
hide_table_of_contents: true
---
import Snippet  from '@site/src/components/Snippet'

# How to calculate shipping emissions using vessel tracking

In this guide we'll explore calculating shipping emissions with vessel tracking (AIS tracking)
used to calculate the distance for better results compared to other, less precise distance
calculation methods.

## Prerequisites

In order to proceed with the steps provided you need

* A Lune API key in the `LUNE_API_KEY` environment variable
* Vessel tracking enabled in your Lune organisation
* cURL and jq installed (or be willing to adapt the procedure to your tools)

## Gathering the data

A request template containing information needed to
[calculate shipping emissions](/api-reference/emission-estimates/create-shipping-estimate)
using vessel tracking:

<Snippet
    header="Sample request"
    language="json"
    code={`
{
    "route": {
        "source": {"locode": "SGSIN"},
        "destination": {"locode": "USNYC"}
    },
    "method": {
        "vessel_type": "container_ship",
        "vessel_tracking": {
            "departure_on": "2023-12-27",
            "arrival_on": "2024-01-29"
        },
        "vessel_imo_number": "9260419"
    },
    "shipment": {
        "containers": "2"
    }
}`}/>

You need to adapt the template to your situation (you may need to read
[the API reference](/api-reference/emission-estimates/create-shipping-estimate)
to see what's permitted):

1. Change `shipment` to what you're actually shipping.
2. Change the `route` to reflect where you're shipping from and to.
3. Change `vessel_imo_number` to match your vessel and change the `departure_on` and `arrival_on`
   dates to match your shipment dates.

Optionally:

* You can replace `vessel_imo_number` with `vessel_name` if you don't know the vessel's IMO
  number but know its name.
* You can provide the vessel's MMSI number as `mmsi_number` inside `vessel_tracking` – this
  makes it more likely that we can identify the right vessel.

  `vessel_tracking` would then look like

  <Snippet
    language="json"
    code={`{
      "departure_on": "2023-12-27",
      "arrival_on": "2024-01-29",
      "mmsi_number": "636023063"
  }`}/>

## Making the request

Once you have the right data send it to the Lune API like so:

<Snippet
    header="Sample cURL command"
    language="bash"
    code={`curl 'https://api.lune.co/v1/estimates/shipping' \\
  -H "Authorization: Bearer $API_KEY" \\
  -H 'Content-Type: application/json' \\
  -X POST \\
  -d '{
    "route": {
        "source": {"locode": "SGSIN"},
        "destination": {"locode": "USNYC"}
    },
    "method": {
        "vessel_tracking": {
            "departure_on": "2023-12-27",
            "arrival_on": "2024-01-29"
        },
        "vessel_imo_number": "9260419"
    },
    "shipment": {
        "containers": "2"
    }
}' | jq`}/>


## Interpreting the response

If everything goes well you should see a response like below. The relevant parts are:

* A confirmation that `vessel_tracking` distance calculation method has been used
* The distance
* The route the vessel took
* The estimated emissions (`mass`)

<Snippet
    header="Sample emission response (only the relevant parts)"
    language="json"
    code={`{
  "distance_calculation_method": "vessel_tracking",
  "distance": {
    "unit": "km",
    "amount": "24453.17"
  },
  "adjusted_distance": {
    "unit": "km",
    "amount": "24453.17"
  },
  "mass": {
    "unit": "t",
    "amount": "4.328158"
  },
  "route": {
    "legs": [
      {
        "distance": {
          "unit": "km",
          "amount": "0.85"
        },
        "location": {
          "label": null,
          "coordinates": {
            "lat": 1.273705,
            "lon": 103.75491333333333
          }
        },
        "adjusted_distance": {
          "unit": "km",
          "amount": "0.85"
        }
      },
      {
        "distance": {
          "unit": "km",
          "amount": "0.3"
        },
        "location": {
          "label": null,
          "coordinates": {
            "lat": 1.2764133333333334,
            "lon": 103.754505
          }
        },
        "adjusted_distance": {
          "unit": "km",
          "amount": "0.3"
        }
      },
      ...
      {
        "distance": {
          "unit": "km",
          "amount": "12.97"
        },
        "location": {
          "label": null,
          "coordinates": {
            "lat": 40.643213333333335,
            "lon": -74.057125
          }
        },
        "adjusted_distance": {
          "unit": "km",
          "amount": "12.97"
        }
      },
      {
        "distance": {
          "unit": "km",
          "amount": "0.72"
        },
        "location": {
          "label": null,
          "coordinates": {
            "lat": 40.64749833333333,
            "lon": -74.06345
          }
        },
        "adjusted_distance": {
          "unit": "km",
          "amount": "0.72"
        }
      }
    ],
    "source": {
      "label": null,
      "coordinates": {
        "lat": 1.268585,
        "lon": 103.76063666666667
      }
    }
  },
  ...
}`}/>
