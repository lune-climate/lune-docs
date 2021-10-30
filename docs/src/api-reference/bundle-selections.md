



# Bundle selections




## Get account bundle selection

Returns the account's bundle selection.

When orders are placed without explicity setting bundle selections, the account's bundle selection is used.

Account bundle selections can be set via the API or Dashboard.

Every account is created with default bundle selections.


```
GET /bundle-selections
```



### Responses

**200** The response returns the account's bundle selections

#### Response Body [BundleSelection](BundleSelection):
Array of:

| Field | Type | Description |
| ----- | ---- | ------------|
| bundle_id | string<br />_**required**_ | The bundle's unique identifier |
| percentage | integer<br />_**required**_ | Selection percentage |

##### Example
```json
[
    {
        "bundle_id": "BmWxrvXo29eGqzA1qjANL5PwnkgaO8R3",
        "percentage": 43
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




## Set account bundle selection

Set the account's bundle selection.

Every account is created with default bundle selections. This will override default bundle selections.


```
PUT /bundle-selections
```


#### Request Body [BundleSelectionRequest](BundleSelectionRequest):
Array of:

| Field | Type | Description |
| ----- | ---- | ------------|

##### Example
```json
[
    {
        "bundle_id": "BmWxrvXo29eGqzA1qjANL5PwnkgaO8R3",
        "percentage": 43
    }
]
```

### Responses

**200** The response returns the new account's bundle selections

#### Response Body [BundleSelection](BundleSelection):
Array of:

| Field | Type | Description |
| ----- | ---- | ------------|
| bundle_id | string<br />_**required**_ | The bundle's unique identifier |
| percentage | integer<br />_**required**_ | Selection percentage |

##### Example
```json
[
    {
        "bundle_id": "BmWxrvXo29eGqzA1qjANL5PwnkgaO8R3",
        "percentage": 43
    }
]
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



