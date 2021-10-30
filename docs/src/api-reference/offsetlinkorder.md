---
sidebarDepth: 0
---

## OffsetLinkOrder



| Field | Type | Description |
| ----- | ---- | ------------|
| order_id | string<br />_**required**_ | The order's unique identifier |
| created_at | string<br />_**required**_ | An <a href="https://pretty-rfc.herokuapp.com/RFC3339">RFC 3339</a>-formatted timestamp. |
| email | string<br />_**required**_ | The email address of the user that placed an order through the offset link |
| bundles | array<br />_**required**_ |  |

##### Example
```json
{
    "order_id": "zwjfkXjfksoHXzA1qjANL58GhjwqkxpB",
    "created_at": "1985-04-12T23:20:50.52Z",
    "email": [
        "john@doe.com"
    ],
    "bundles": [
        {
            "bundle_id": "va1BEV2VZqnzPkYxJgALg0GeQDoXlWO5",
            "bundle_name": "Latin America Forestry"
        }
    ]
}
```
