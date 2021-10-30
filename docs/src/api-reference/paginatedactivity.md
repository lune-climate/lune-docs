---
sidebarDepth: 0
---

## PaginatedActivity



| Field | Type | Description |
| ----- | ---- | ------------|
| has_more | boolean<br />_**required**_ | Whether or not there are more elements available after this set. If false, this set comprises the end of the array. |
| data | array of [Activity](activity.html)<br />_**required**_ | Paginated Activity objects |

##### Example
```json
{
    "has_more": "boolean",
    "data": [
        {
            "id": "gh2VDRT4JZqnzPkYxJgALg0GeQDoXlWO3",
            "currency": "GBP",
            "source": "order_paid",
            "balance": "25.50",
            "balance_delta": "-3.50",
            "balance_outstanding": "-132.50",
            "balance_outstanding_delta": "3.50",
            "order_id": "xe1BEV2VZqnzPkYxJgALg0GeQDoXlWO3",
            "created_at": "2019-08-24T14:15:22Z"
        },
        {
            "id": "q9aKx7b6nNXMk3Yv3NpD1mlW5Od2eLZE",
            "currency": "GBP",
            "source": "admin_credit",
            "balance": "29",
            "balance_delta": "29",
            "balance_outstanding": "-136",
            "balance_outstanding_delta": "0",
            "created_at": "2019-08-24T14:15:22Z"
        }
    ]
}
```
