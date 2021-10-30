---
sidebarDepth: 0
---

## Order



| Field | Type | Description |
| ----- | ---- | ------------|
| type | string<br />_**required**_<br /><br />Enum: <ul><li>`quantity`</li><li>`value`</li></ul> | Identifies whether the order has been placed by quantity (kg CO2) or value (monetary amount) |

##### Example
```json
{
    "id": "va1BER4JZqnzPkYxJgALg0GeQDoXlWO5",
    "idempotency_key": "5bd808a954e",
    "type": "quantity",
    "status": "complete",
    "currency": "GBP",
    "offset_cost": "7176.00",
    "total_cost": "7696.00",
    "commission": "520.00",
    "quantity": "1040",
    "created_at": "string",
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
    "projects": [
        {
            "quantity": "600",
            "unit_price": "6.90",
            "offset_cost": "4140.00",
            "project_id": "gMbvJoOaX54V1wpNaRY8dWDGQ7m239Bx",
            "project_name": "Madre De Dios",
            "project_type": "Forest Conservation",
            "project_slug": "madre-de-dios"
        },
        {
            "quantity": "440",
            "unit_price": "6.90",
            "offset_cost": "3036.00",
            "project_id": "xe1BEV2VZqnzPkYxJgALg0GeQDoXlWO5",
            "project_name": "Alto Mayo",
            "project_type": "Forest Conservation",
            "project_slug": "alto-mayo"
        }
    ],
    "certificate": "https://api.lune.co/v1/orders/08QD7GPaBx5b6Y60ndAONXLvrZljRE2e/certificate",
    "metadata": {
        "property1": "string",
        "property2": "number"
    },
    "offset_link_id": "UwjfkXjfksoHXzA1qjANL58GhjwqkxpB",
    "email": "john@doe.com",
    "requested_quantity": "1045"
}
```
