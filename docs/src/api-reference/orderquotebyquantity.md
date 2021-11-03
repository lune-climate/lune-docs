---
sidebarDepth: 0
---


## OrderQuoteByQuantity



| Field | Type | Description |
| ----- | ---- | ------------|
| currency | string<br />_**required**_ | Currency code |
| estimated_quantity | string<br />_**required**_ | Estimated quantity (tonnes CO2).<br><br>May be lower than `requested_quantity`.<br> |
| estimated_offset_cost | string<br />_**required**_ | Estimated offset cost<br><br>Unit: order quote currency<br> |
| estimated_total_cost | string<br />_**required**_ | Estimated total cost inclusive of Lune fees.<br><br>Unit: order quote currency<br> |
| estimated_commission | string<br />_**required**_ | Estimated commission |
| bundles | array of [OrderBundle](orderbundle.html)<br />_**required**_ | Bundles included in the quote including quantity and cost breakdown.<br> |
| requested_quantity | string<br />_**required**_ | Requested quantity for the specific bundle (tonnes CO2) |

##### Example
```json
{
    "currency": "GBP",
    "estimated_quantity": "1040",
    "estimated_offset_cost": "7176.00",
    "estimated_total_cost": "7696.00",
    "estimated_commission": "520.00",
    "bundles": [
        {
            "bundle_id": "va1BEV2VZqnzPkYxJgALg0GeQDoXlWO5",
            "bundle_name": "Latin America Forestry",
            "quantity": "1040",
            "unit_price": "6.90",
            "offset_cost": "7176.00",
            "insufficient_available_quantity": true
        }
    ],
    "requested_quantity": "1045"
}
```
