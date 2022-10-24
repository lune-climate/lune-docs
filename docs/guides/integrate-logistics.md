# Integrate Logistics

## Intro

### The Lune API

Lune provides a single [API](/api/quickstart) for use in-app and web channels to fetch, mutate, and deliver the data necessary to offset CO₂ emissions across a range of verticals.

Our API-first approach allows our customers to embed offsetting into logistics, payments, and Fintech platforms to deliver a unique and programmatically driven experience that brings climate into client operations.

### Overview

In this guide, you will learn how to interact with the Lune API to

1.  Calculate emissions for shipments
2.  Offset emissions for shipments

### Who is this guide for?

This guide is primarily aimed at Product Managers and developers looking
to integrate CO₂ emissions estimations and offsetting into an existing end-user experience.

Feel free to contact our [support team](mailto:support@lune.com) if you encounter any issues integrating our logistics use case.

**NOTE**: Lune is [Smart Freight Centre](https://www.notion.so/luneco/Shipping-Emission-Calculations-f591e8b57c72421ebb4790a88ef8d0e9) accredited, following the GLEC Framework.

### Concepts

- **Client account** - You must create a client account for each of your clients to define their basic characteristics, such as name, currency, and beneficiary.  Clients will be provided a Lune default Project bundle
- **Lune defaults** - Lune has provided a default Project bundle for each of our clients.  Every order will be placed against the following projects and ratios:
  - Conserving forests in Asia - 95%
  - Ocean Carbon Removal - 5%
- **Project bundle** - Group of offsetting projects with similar characteristics., e.g., _Conserving forests in Asia_ and _Ocean Carbon Removal_
- **Offsetting preferences page** - Your clients will [decide whether to offset CO₂ emissions](#store-a-clients-offsetting-decision) on this page

## API flow

![logistics-flow](/img/logistics-flow.png)

## Getting an API key

First, head over to the Lune dashboard and generate a new API key.

1) Navigate to [https://dashboard.lune.co/developers](https://dashboard.lune.co/developers)

2) Select **New Test API Key**, enter a value in the _Name_ field, and select an account from _Default account_

3) Select **Save**

4) Copy your API key, as you'll need it to interact with the Lune API

## Create a client account

A [client account](/resources/client-accounts/create-client-account) is required for each of your clients and defines their basic characteristics, for example, the currency used to display emission offsetting prices.

**INFO**: Store and map the client id map to your client in your code base.

### Sample request

You can optionally pass in `beneficiary` to link a client account to the legal entity receiving the carbon offset.

```js
curl "https://api.lune.co/v1/accounts/client" \
    -s \
    -X POST \
    -H "Authorization: Bearer $API_KEY" \
    -H "Content-Type: application/json" \
    -d '
{
    "name": "MY TEST COMPANY",
    "currency": "USD",
    "beneficiary": "MY TEST COMPANY INC"
}'
```

### Sample response

A successful request will return a unique id, which you will need to pass in later interactions with the Lune API.

```js
{
    "id": "K4enjo9g08vx3MpjnbpPrEZ57XJkDVdb",
    "name": "MY TEST COMPANY",
    "currency": "USD",
    "balance": "0",
    "balance_outstanding": "0",
    "type": "test",
    "scope": "client_account",
    "beneficiary": "MY TEST COMPANY INC",
    "organisation_id": "42O097M13DKvo5pmlJYZjmVlGzqJwXbE",
    "bundle_portfolio_id": null,
    "logo": null
}
```

**Where**:

- `id` is the unique identifier for each of your clients, which you must map in your code base
- `name` is a name that you will use to identify your client and present offsetting options to
- `currency` defines the currency used to display the price for each offsetting option
- `type` defines the type of account.  Use `test` for your playground
- `beneficiary` is the legal entity shown on the Carbon Offset Certificate and carbon registries

Following a successful response, a client account will be added to your dashboard:

![new-client-account](/img/new-client-account.png)

You can access the dedicated client account page by appending the `id` to `/client-account` e.g., `https://dashboard.lune.co/settings/client-accounts/K4enjo9g08vx3MpjnbpPrEZ57XJkDVdb`.

## Store a client's offsetting decision

On the Offsetting preferences page, your clients will be able to select whether to offset the CO₂ emissions from their logistics operation:

![offsetting-decision](/img/offsetting-decision.png)

Store this decision in your database.

## Calculating CO₂ emissions for a shipment

To present an [estimate of CO₂ emissions for a given shipping route](/resources/emission-estimates/create-multi-leg-shipping-estimate), pass in the journey details (e.g., route source and destination for one or more journey legs, shipment mode, load).

### Sample request

```js
curl https://api.lune.co/v1/estimates/shipping/multi-leg \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $API_KEY" \
    -H "Lune-Account: $CLIENT_ACCOUNT_ID" \
    -X POST \
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
}'
```

**Where**:

- `<CLIENT_ACCOUNT_ID>` is the unique identifier for the client
- `shipment` defines the shipment load; in this example, 40 tonnes
- `legs` is a container object for one or more journey legs
- `route` is the source and destination for each leg in the chosen journey, which can either be the shipping distance or the start/destination address pair (physical address or coordinates)
- `method` is the chosen form of transport


### Sample response

A successful 200 request will result in an estimate of offsetting costs for the chosen journey.

```js
{
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
}
```

**Where**:

- `id` is the unique identifier for the CO₂ emissions estimate
- `legs` is a container object for one or more journey legs, which includes the CO₂ emissions `legs.mass.amount` and distance per leg
- `mass.amount` is the aggregated CO₂ emissions for the chosen journey
- `quote.bundles` is a container object that confirms the client's offsetting decision (as defined in the Offsetting preferences page) and provides the details of each bundle, including the bundle id, bundle name, and unit price
- `quote.estimated_total_cost` is the total cost of offsetting the CO₂ emissions in the client's currency
- `distance` is the total distance for the chosen journey

## Offsetting shipment emissions

For clients that have [opted to offset their emissions](#store-a-clients-offsetting-decision) in their Offsetting preferences page, when they book a shipment, you can present a [confirmation of a booking](/resources/orders/create-order-by-estimate), including the amount of CO₂ emissions that will be offset, the Lune default Project bundle, and the total cost of offsetting the CO₂ emissions.  To do this, pass in the estimate id:

![order-confirmation](/img/order-confirmation.png)

### Sample request

```js
curl https://api.lune.co/v1/orders/by-estimate \
-s \
-H 'Content-Type: application/json' \
-H "Authorization: Bearer $API_KEY" \
-H "Lune-Account: <CLIENT_ACCOUNT_ID>" \
-X POST \
-d '
    {
      "estimate_id": "08QD7GPaBx5b6Y6mJlWyONXLvrZljRE2"
    }'
```

**Where**:

- `<CLIENT_ACCOUNT_ID>` is the unique identifier for the client
- `estimate_id` is the unique identifier for the emissions estimate

### Sample response

A successful request will return an order summary, which can be displayed as part of your confirmation flow.

```js
{
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
}
```

**Where**:

- `id` is the unique identifier for the booking
