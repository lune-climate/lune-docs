---
sidebarDepth: 0
---

## BundleSummary



| Field | Type | Description |
| ----- | ---- | ------------|
| id | string<br />_**required**_ | The bundle's unique identifier |
| name | string<br />_**required**_ | The bundle's name |
| unit_price | string<br />_**required**_ | Bundle unit price per tonne CO2<br> |
| currency | string<br />_**required**_ | Currency code |
| primary_image | string | A bundle's image URL |
| primary_image_hires | string | A bundle's high resolution image URL |
| description | string | The bundle's description |
| disabled | boolean<br />_**required**_ | Disabled bundles do not accept orders<br> |
| available_quantity | string | Quantity of CO2 offsets available to purchase (in tonnes).<br><br>If available_quantity is not set, assume there is an unlimited amount of offsets to purchase.<br> |

##### Example
```json
{
    "id": "BmWxrvXo29eGqzA1qjANL5PwnkgaO8R3",
    "name": "Latin America Forestry",
    "unit_price": "6.09",
    "currency": "GBP",
    "primary_image": "https://assets.lune.co/bundles/latin-america-forestry.png",
    "primary_image_hires": "https://assets.lune.co/bundles/latin-america-hires.jpg",
    "description": "A conglomeration of renewable energy projects around the world",
    "disabled": false,
    "available_quantity": "1000.09"
}
```
