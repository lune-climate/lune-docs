---
sidebarDepth: 0
---


## ElectricityEstimateRequest

Parameters for estimating electricity emissions

| Field | Type | Description |
| ----- | ---- | ------------|
| consumption | object<br />_**required**_ |  |
| country_code | string | The three-letter code of the country where the consumption takes place, if applicable.<br><br>Providing this value will improve the estimation process. If the value is not provided<br>the global average will be used.<br> |

##### Example
```json
{
    "consumption": {
        "amount": "40.501",
        "unit": "MWh"
    },
    "country_code": "string"
}
```
