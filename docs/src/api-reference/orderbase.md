---
sidebarDepth: 0
---

## OrderBase

Order object

| Field | Type | Description |
| ----- | ---- | ------------|
| id | string<br />_**required**_ | The order's unique identifier |
| idempotency_key | string | Optional unique identifier provided by the client.<br><br>`idempotency_key` has two purposes:<br>1. Clients can safely retry order requests without accidentally performing the same operation twice. The current state of the original order is returned.<br>2. Clients can use `idempotency_key` to reconcile orders with other entities on their system.<br> |
| type | string<br />_**required**_<br /><br />Enum: <ul><li>`quantity`</li><li>`value`</li></ul> | Identifies whether the order has been placed by quantity (kg CO2) or value (monetary amount) |
| status | string<br />_**required**_<br /><br />Enum: <ul><li>`received`</li><li>`placed`</li><li>`paid`</li><li>`allocated`</li><li>`cancelled`</li><li>`complete`</li><li>`failed`</li></ul> | Order status |
| currency | string<br />_**required**_ | Order currency code |
| offset_cost | string | Represents the net cost of offsets purchased by the order. May be lower than `requested_value`.<br><br>This field is set when the order is linked to Bundles.<br><br>This field is set the order's status transitions from `received` to `placed`.<br><br>Unit: order currency<br> |
| total_cost | string | The total cost for the order inclusive of fees.<br><br>Unit: order currency<br> |
| commission | string | Represents Lune's fee.<br><br>This field is set when the order is linked to Bundles.<br><br>This field is set the order's status transitions from `received` to `placed`.<br><br>Unit: order currency<br> |
| quantity | string | Quantity of CO2 offsets purchased in tonnes. |
| created_at | string<br />_**required**_ | Order creation timestamp |
| bundles | array of [OrderBundle](OrderBundle) | bundles are set when the order's status is `placed`, `paid`, `allocated` or `complete`.<br><br>Represents the bundles associated with the order including their relative quantity and cost breakdown.<br> |
| projects | array of [OrderProject](OrderProject) | Projects are set when the order's status is `allocated` or `complete`.<br><br>Represents the projects associated with the order including their relative quantity and cost breakdown.<br><br>Orders are placed against bundles, not projects. Projects in a bundle may change based on supply.<br><br>This field is set as soon as we can guarantee project supply.<br> |
| certificate | string | Carbon credits certificate URL.<br><br>This field is set when an order in 'complete' status<br> |
| metadata | object<br />_**required**_ | An arbitrary dictionary (key-value pairs) to store application-specific information.<br><br>Lune doesn't use this information for order processing. Its purpose is for the API<br>clients to be able to attach arbitrary information (to an order for example) and<br>then retrieve it.<br> |
| offset_link_id | string | The offset link identifier, if the order was placed through an offset link |
| email | string | End-user email.<br><br>This field is currently populated on orders placed through offset links.<br> |

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
    "email": "john@doe.com"
}
```
