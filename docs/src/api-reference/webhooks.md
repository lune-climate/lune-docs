



# Webhooks

A way to get notified about order state changes.


## Get existing webhooks



```
GET /webhooks
```



### Responses

**200** Existing webhooks fetched successfully

#### Response Body:
Array of:

| Field | Type | Description |
| ----- | ---- | ------------|
| id | string<br />_**required**_ | The webhook's identifier |
| url |  object [Url](Url)<br />_**required**_ |  |
| enabled | boolean<br />_**required**_ | Determines if events should be sent to the webhook or not. |
| secret | string<br />_**required**_ | The secret key used to generate the webhook payload HMAC. |

##### Example
```json
[
    {
        "id": "ljmkOq7vXd239gAE9WALWQ8ZGVD5ExNz",
        "url": "string",
        "enabled": "boolean",
        "secret": "string"
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




## Create a new webhook



```
POST /webhooks
```


#### Request Body [CreateWebhookRequest](CreateWebhookRequest):

| Field | Type | Description |
| ----- | ---- | ------------|
| url |  object [Url](Url)<br />_**required**_ |  |

##### Example
```json
{
    "url": "string"
}
```

### Responses

**200** A webhook created successfully

#### Response Body [Webhook](Webhook):

| Field | Type | Description |
| ----- | ---- | ------------|
| id | string<br />_**required**_ | The webhook's identifier |
| url | string<br />_**required**_ | An HTTPS URL |
| enabled | boolean<br />_**required**_ | Determines if events should be sent to the webhook or not. |
| secret | string<br />_**required**_ | The secret key used to generate the webhook payload HMAC. |

##### Example
```json
{
    "id": "ljmkOq7vXd239gAE9WALWQ8ZGVD5ExNz",
    "url": "string",
    "enabled": "boolean",
    "secret": "string"
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




## Get an existing webhook



```
GET /webhooks/{id}
```

#### Path Parameters
| Field | Type | Description | Example |
| ----- | ---- | -------- | ----------- | ------- |
| id | string <br />_**required**_ | The webhooks's unique identifier | ljmkOq7vXd239gAE9WALWQ8ZGVD5ExNz |


### Responses

**200** Existing webhook fetched successfully

#### Response Body [Webhook](Webhook):

| Field | Type | Description |
| ----- | ---- | ------------|
| id | string<br />_**required**_ | The webhook's identifier |
| url | string<br />_**required**_ | An HTTPS URL |
| enabled | boolean<br />_**required**_ | Determines if events should be sent to the webhook or not. |
| secret | string<br />_**required**_ | The secret key used to generate the webhook payload HMAC. |

##### Example
```json
{
    "id": "ljmkOq7vXd239gAE9WALWQ8ZGVD5ExNz",
    "url": "string",
    "enabled": "boolean",
    "secret": "string"
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


**404** The webhook does not exist



**429** Rate limit exceeded




## Update an existing webhook



```
PUT /webhooks/{id}
```

#### Path Parameters
| Field | Type | Description | Example |
| ----- | ---- | -------- | ----------- | ------- |
| id | string <br />_**required**_ | The webhooks's unique identifier | ljmkOq7vXd239gAE9WALWQ8ZGVD5ExNz |

#### Request Body [UpdateWebhookRequest](UpdateWebhookRequest):

| Field | Type | Description |
| ----- | ---- | ------------|
| url |  object [Url](Url) |  |
| enabled | boolean | Determines if events should be sent to the webhook or not. Defaults to `true` for newly created<br>webhooks. When updating a webhook and the value is not explicitly specified the existing value<br>will be used.<br> |

##### Example
```json
{
    "url": "string",
    "enabled": "boolean"
}
```

### Responses

**200** Existing webhook updated successfully

#### Response Body [Webhook](Webhook):

| Field | Type | Description |
| ----- | ---- | ------------|
| id | string<br />_**required**_ | The webhook's identifier |
| url | string<br />_**required**_ | An HTTPS URL |
| enabled | boolean<br />_**required**_ | Determines if events should be sent to the webhook or not. |
| secret | string<br />_**required**_ | The secret key used to generate the webhook payload HMAC. |

##### Example
```json
{
    "id": "ljmkOq7vXd239gAE9WALWQ8ZGVD5ExNz",
    "url": "string",
    "enabled": "boolean",
    "secret": "string"
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


**404** The webhook does not exist



**429** Rate limit exceeded




## Delete an existing webhook



```
DELETE /webhooks/{id}
```

#### Path Parameters
| Field | Type | Description | Example |
| ----- | ---- | -------- | ----------- | ------- |
| id | string <br />_**required**_ | The webhooks's unique identifier | ljmkOq7vXd239gAE9WALWQ8ZGVD5ExNz |


### Responses

**200** Existing webhook deleted successfully



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


**404** The webhook does not exist



**429** Rate limit exceeded




## Rotate a secret of an existing webhook.

The existing secret will be invalidated immediately and subsequent webhook payloads will be
accompanied by HMACs using the new secret.


```
PUT /webhooks/{id}/rotate-secret
```

#### Path Parameters
| Field | Type | Description | Example |
| ----- | ---- | -------- | ----------- | ------- |
| id | string <br />_**required**_ | The webhooks's unique identifier | ljmkOq7vXd239gAE9WALWQ8ZGVD5ExNz |


### Responses

**200** The secret was rotated successfully

#### Response Body [Webhook](Webhook):

| Field | Type | Description |
| ----- | ---- | ------------|
| id | string<br />_**required**_ | The webhook's identifier |
| url | string<br />_**required**_ | An HTTPS URL |
| enabled | boolean<br />_**required**_ | Determines if events should be sent to the webhook or not. |
| secret | string<br />_**required**_ | The secret key used to generate the webhook payload HMAC. |

##### Example
```json
{
    "id": "ljmkOq7vXd239gAE9WALWQ8ZGVD5ExNz",
    "url": "string",
    "enabled": "boolean",
    "secret": "string"
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


**404** The webhook does not exist



**429** Rate limit exceeded



