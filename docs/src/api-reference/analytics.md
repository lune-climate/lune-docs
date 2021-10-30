



# Analytics




## Get analytics

Returns analytics for the account linked to the API Key.


```
GET /analytics
```



### Responses

**200** The response return account analytics

#### Response Body [Analytics](Analytics):

| Field | Type | Description |
| ----- | ---- | ------------|
| total_completed_offset_value | string<br />_**required**_ | The total monetary value of all completed orders for a given interval. |
| total_completed_offset_quantity | string<br />_**required**_ | The total quantity in tCO2 of all completed orders for a given interval. |
| total_placed_offset_value | string<br />_**required**_ | The total monetary value of all placed orders for a given interval. |
| total_placed_offset_quantity | string<br />_**required**_ | The total quantity in tCO2 of all placed orders for a given interval. |
| completed_offset_values | array of [OffsetValueSeriesItem](OffsetValueSeriesItem)<br />_**required**_ | An array of offest values grouped by completion date. |
| completed_offset_quantities | array of [OffsetQuantitySeriesItem](OffsetQuantitySeriesItem)<br />_**required**_ | An array of offest quantities grouped by completion date. |
| placed_offset_values | array of [OffsetValueSeriesItem](OffsetValueSeriesItem)<br />_**required**_ | An array of offest values grouped by placed date. |
| placed_offset_quantities | array of [OffsetQuantitySeriesItem](OffsetQuantitySeriesItem)<br />_**required**_ | An array of offest quantities grouped by placed date. |

##### Example
```json
{
    "total_completed_offset_value": "500.66",
    "total_completed_offset_quantity": "500.667",
    "total_placed_offset_value": "333.66",
    "total_placed_offset_quantity": "555.222",
    "completed_offset_values": [
        {
            "date": "2021-09-09",
            "value": "333.66"
        }
    ],
    "completed_offset_quantities": [
        {
            "date": "2021-09-09",
            "quantity": "222.667"
        }
    ],
    "placed_offset_values": [
        {
            "date": "2021-09-09",
            "value": "333.66"
        }
    ],
    "placed_offset_quantities": [
        {
            "date": "2021-09-09",
            "quantity": "222.667"
        }
    ]
}
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



