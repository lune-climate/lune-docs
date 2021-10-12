

# Activity

Get account activity


## Get account activity

Returns paginated activity in reverse order (most recent first).

Activity is an immutable event log. Every single account event yields an activity object.

The API key used to access this method affects what activity rows are returned: activity rows
corresponding to test orders for the test API key, the rest of the rows (both activity rows
corresponding to live orders or not having any order associated with them) for the live API key.


```
GET /activity
```



### Responses

**200** The response returns paginated activity

#### Response Body

| Field | Type | Required | Description |
| ----- | ---- | -------- | ------------|
| has_more | boolean | Y | Whether or not there are more elements available after this set. If false, this set comprises the end of the array. |
| data | array | Y | Paginated Activity objects |

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


**400** Bad Request

#### Response Body
Array of:

| Field | Type | Required | Description |
| ----- | ---- | -------- | ------------|
| error_code | string | Y | Immutable string representing a specific error. |
| message | string | Y | Human readable error message.<br><br>This value can contain some extra information about the error in<br>human-readable form. Not suitable for programmatic consumption, the format<br>is not guaranteed to be stable.<br> |

##### Example
```json
[
    {
        "error_code": "account_suspended",
        "message": "string"
    }
]
```


**401** Unauthorized. The API Key is invalid or disabled.

#### Response Body
Array of:

| Field | Type | Required | Description |
| ----- | ---- | -------- | ------------|
| error_code | string | Y | Immutable string representing a specific error. |
| message | string | Y | Human readable error message.<br><br>This value can contain some extra information about the error in<br>human-readable form. Not suitable for programmatic consumption, the format<br>is not guaranteed to be stable.<br> |

##### Example
```json
[
    {
        "error_code": "account_suspended",
        "message": "string"
    }
]
```


**429** Rate limit exceeded



