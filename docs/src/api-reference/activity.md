



# Activity




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

#### Response Body [PaginatedActivity](PaginatedActivity):

| Field | Type | Description |
| ----- | ---- | ------------|
| has_more | boolean<br />_**required**_ | Whether or not there are more elements available after this set. If false, this set comprises the end of the array. |
| data | array of [Activity](Activity)<br />_**required**_ | Paginated Activity objects |

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

#### Response Body [Errors](Errors):
Array of:

| Field | Type | Description |
| ----- | ---- | ------------|
| error_code | string<br />_**required**_<br /><br />Enum: <ul><li>`account_suspended`</li><li>`bundle_selection_not_100_pct`</li><li>`order_idempotency_failure`</li><li>`order_low_volume_no_split`</li><li>`invalid_bundle_id`</li><li>`invalid_id`</li><li>`validation_error`</li><li>`percentage_all_or_none`</li><li>`address_not_found`</li><li>`at_least_one_constraint_required`</li><li>`bundles_size_not_supported`</li><li>`unknown_imo_number`</li><li>`webhook_limit_reached`</li></ul> | Immutable string representing a specific error. |
| message | string<br />_**required**_ | Human readable error message.<br><br>This value can contain some extra information about the error in<br>human-readable form. Not suitable for programmatic consumption, the format<br>is not guaranteed to be stable.<br> |

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

#### Response Body [Errors](Errors):
Array of:

| Field | Type | Description |
| ----- | ---- | ------------|
| error_code | string<br />_**required**_<br /><br />Enum: <ul><li>`account_suspended`</li><li>`bundle_selection_not_100_pct`</li><li>`order_idempotency_failure`</li><li>`order_low_volume_no_split`</li><li>`invalid_bundle_id`</li><li>`invalid_id`</li><li>`validation_error`</li><li>`percentage_all_or_none`</li><li>`address_not_found`</li><li>`at_least_one_constraint_required`</li><li>`bundles_size_not_supported`</li><li>`unknown_imo_number`</li><li>`webhook_limit_reached`</li></ul> | Immutable string representing a specific error. |
| message | string<br />_**required**_ | Human readable error message.<br><br>This value can contain some extra information about the error in<br>human-readable form. Not suitable for programmatic consumption, the format<br>is not guaranteed to be stable.<br> |

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



