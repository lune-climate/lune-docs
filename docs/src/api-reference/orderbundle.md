---
sidebarDepth: 0
---


## OrderBundle



| Field | Type | Description |
| ----- | ---- | ------------|
| bundle_id | string<br />_**required**_ | The bundle's unique identifier |
| bundle_name | string<br />_**required**_ | The bundle's name |
| quantity | string<br />_**required**_ | Quantity for the specific bundle (tonnes CO2) |
| unit_price | string<br />_**required**_ | Bundle unit price per tonne CO2<br><br>Unit: order currency<br> |
| offset_cost | string<br />_**required**_ | Represents the net cost of offsets purchased by the order for this bundle.<br><br>Unit: order currency<br> |
| insufficient_available_quantity | boolean | If true, there is no inventory necessary to fully satisfy the order for this bundle.<br> |

##### Example
```json
{
    "bundle_id": "va1BEV2VZqnzPkYxJgALg0GeQDoXlWO5",
    "bundle_name": "Latin America Forestry",
    "quantity": "1040",
    "unit_price": "6.90",
    "offset_cost": "7176.00",
    "insufficient_available_quantity": true
}
```
