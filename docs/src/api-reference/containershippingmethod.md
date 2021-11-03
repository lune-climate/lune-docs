---
sidebarDepth: 0
---


## ContainerShippingMethod



| Field | Type | Description |
| ----- | ---- | ------------|
| vessel_type | string<br />_**required**_<br /><br />Enum: <ul><li>`container_ship`</li> </ul> |  |
| refrigerated | boolean | A container transport is either refrigerated or "dry" (not refrigerated). Dry transports<br>result in lower emissions.<br><br>This parameter defaults to `true`.<br> |
| trade_lane | string<br /><br />Enum: <ul><li>`aggregated_panama_trade`</li><li>`aggregated_transatlantic`</li><li>`aggregated_transsuez`</li><li>`aggregated_transpacific`</li><li>`aggregated_other`</li><li>`disaggregated_asia_to_africa`</li><li>`disaggregated_asia_to_mediterranean`</li><li>`disaggregated_asia_to_middle_east`</li><li>`disaggregated_asia_to_north_america_east`</li><li>`disaggregated_asia_to_north_america_west`</li><li>`disaggregated_asia_to_north_europe`</li><li>`disaggregated_asia_to_oceania`</li><li>`disaggregated_asia_to_south_america`</li><li>`disaggregated_europe_to_africa`</li><li>`disaggregated_europe_to_south_america`</li><li>`disaggregated_europe_to_middle_east`</li><li>`disaggregated_europe_to_oceania`</li><li>`disaggregated_mediterranean_to_north_america_east`</li><li>`disaggregated_mediterranean_to_north_america_west`</li><li>`disaggregated_north_america_to_africa`</li><li>`disaggregated_north_america_to_oceania`</li><li>`disaggregated_north_america_to_south_america`</li><li>`disaggregated_north_america_to_middle_east`</li><li>`disaggregated_north_europe_to_north_america_east`</li><li>`disaggregated_north_europe_to_north_america_west`</li><li>`disaggregated_south_america_to_africa`</li><li>`disaggregated_intra_africa`</li><li>`disaggregated_intra_north_america`</li><li>`disaggregated_intra_south_america`</li><li>`disaggregated_se_asia_to_ne_asia`</li><li>`disaggregated_intra_ne_asia`</li><li>`disaggregated_intra_se_asia`</li><li>`disaggregated_north_europe_to_mediterranean`</li><li>`disaggregated_intra_mediterranean`</li><li>`disaggregated_intra_north_europe`</li><li>`disaggregated_intra_middle_east`</li><li>`disaggregated_other`</li> </ul> | Container transport emissions vary per trade lane. When a trade lane is not given we'll<br>use an industry-wide average. Providing an `aggregated_*` trade lane group will result in an<br>a more accurate estimate. Providing an `disaggregated_*` trade lane will result in the best<br>estimate precision.<br><br>The identifiers are kept relatively short for brevity: Mediterranean includes Black Sea and<br>South America includes Central America.<br><br>The trade lanes are bidirectional, for example `disaggregated_asia_to_africa` covers both<br>Asia to Africa and Africa to Asia.<br> |

##### Example
```json
{
    "vessel_type": "string",
    "refrigerated": "boolean",
    "trade_lane": "string"
}
```
