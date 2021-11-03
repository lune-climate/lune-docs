---
sidebarDepth: 0
---


## ShippingEstimateRequest

Parameters for estimating shipping emissions

| Field | Type | Description |
| ----- | ---- | ------------|
| shipment | <br />_**required**_ | Either a mass given in kilograms or tonnes (`mass`) or the number of [Twenty-foot Equivalent<br>Units (TEUs)](https://en.wikipedia.org/wiki/Twenty-foot_equivalent_unit) (with their cargo type,<br>optionally). Note that providing `mass` will result in more accurate estimates for methods other<br>than `container_ship`. Estimates using `container_ship` are more precise when the shipment is given<br>in TEUs.<br> |
| route | <br />_**required**_ | Either the shipping distance or the start/destination address pair. |
| method | <br />_**required**_ |  |
| country_code | string | The three-letter code of the country where the shipping takes place, if applicable.<br><br>Providing this value will improve the estimation process. If the shipping spans<br>multiple countries you can either make multiple per-country estimations or choose<br>the country with the largest share of the route.<br> |

##### Example
```json
{
    "shipment": {
        "mass": {
            "amount": "40.501",
            "unit": "kg"
        }
    },
    "route": {
        "amount": "40.501",
        "unit": "km"
    },
    "method": "string",
    "country_code": "string"
}
```
