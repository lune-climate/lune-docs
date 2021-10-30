---
sidebarDepth: 0
---

## OrderProject



| Field | Type | Description |
| ----- | ---- | ------------|
| project_id | string<br />_**required**_ | The project's unique identifier |
| project_name | string<br />_**required**_ | The project's name |
| project_type | string<br />_**required**_ | The project's offset type, eg Forest conservation, Afforestation, Direct Air Capture |
| project_slug | string<br />_**required**_ | The project's unique slug |
| quantity | string<br />_**required**_ | Carbon offset purchased (tonnes CO2) |
| unit_price | string<br />_**required**_ | Project unit price per tonne CO2<br><br>Unit: order currency<br> |
| offset_cost | string<br />_**required**_ | Represents the net cost of offsets purchased by the order for this project.<br><br>Unit: order currency<br> |

##### Example
```json
{
    "project_id": "xe1BEV2VZqnzPkYxJgALg0GeQDoXlWO5",
    "project_name": "Alto Mayo",
    "project_type": "Forest conservation",
    "project_slug": "alto-mayo",
    "quantity": "1040",
    "unit_price": "6.09",
    "offset_cost": "7176.00"
}
```
