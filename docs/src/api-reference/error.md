---
sidebarDepth: 0
---

## Error

Individual error information

| Field | Type | Description |
| ----- | ---- | ------------|
| error_code | string<br />_**required**_<br /><br />Enum: <ul><li>`account_suspended`</li><li>`bundle_selection_not_100_pct`</li><li>`order_idempotency_failure`</li><li>`order_low_volume_no_split`</li><li>`invalid_bundle_id`</li><li>`invalid_id`</li><li>`validation_error`</li><li>`percentage_all_or_none`</li><li>`address_not_found`</li><li>`at_least_one_constraint_required`</li><li>`bundles_size_not_supported`</li><li>`unknown_imo_number`</li><li>`webhook_limit_reached`</li></ul> | Immutable string representing a specific error. |
| message | string<br />_**required**_ | Human readable error message.<br><br>This value can contain some extra information about the error in<br>human-readable form. Not suitable for programmatic consumption, the format<br>is not guaranteed to be stable.<br> |

##### Example
```json
{
    "error_code": "account_suspended",
    "message": "string"
}
```
