---
sidebarDepth: 0
---


## OffsetLinkAnalytics



| Field | Type | Description |
| ----- | ---- | ------------|
| id | string<br />_**required**_ | The offset link identifier |
| unique_visitors | integer<br />_**required**_ | The number of unique visitors for the specific offset link |
| placed_orders | integer<br />_**required**_ | The number of placed orders for the specific offset link |
| orders | array of [OffsetLinkOrder](offsetlinkorder.html)<br />_**required**_ |  |

##### Example
```json
{
    "id": "UwjfkXjfksoHXzA1qjANL58GhjwqkxpB",
    "unique_visitors": 52344,
    "placed_orders": 52344,
    "orders": [
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
    ]
}
```
