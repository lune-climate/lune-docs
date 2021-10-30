---
sidebarDepth: 0
---

## FlightEstimateRequest

Parameters for estimating emissions for commercial plane travel

| Field | Type | Description |
| ----- | ---- | ------------|
| route | <br />_**required**_ | Either the flying distance or the start/destination airport code (ICAO or IATA). |
| cabin_class | string<br /><br />Enum: <ul><li>`economy`</li><li>`business`</li><li>`first`</li></ul> | Cabin of class to be used for the specified passengers.<br>Higher classes account for more emissions since total weight and volume necessary to accomodate the class is higher.<br>This parameter defaults to first. |
| passengers | number | Number of passengers the calculation should be applied to.<br>This parameter defaults to 1. |

##### Example
```json
{
    "route": {
        "amount": "40.501",
        "unit": "km"
    },
    "cabin_class": "string",
    "passengers": "number"
}
```
