

# Webhooks

A way to get notified about order state changes.


## Get existing webhooks



```
GET /webhooks
```



### Responses

**200** Existing webhooks fetched successfully

#### Response Body
Array of:

| Field | Type | Required | Description |
| ----- | ---- | -------- | ------------|
| id | string | Y | The webhook's identifier |
| url | string | Y | An HTTPS URL |
| enabled | boolean | Y | Determines if events should be sent to the webhook or not. |
| secret | string | Y | The secret key used to generate the webhook payload HMAC. |

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




## Create a new webhook



```
POST /webhooks
```


#### Request Body

| Field | Type | Required | Description |
| ----- | ---- | -------- | ------------|
| url | string | Y | An HTTPS URL |


### Responses

**200** A webhook created successfully

#### Response Body

| Field | Type | Required | Description |
| ----- | ---- | -------- | ------------|
| id | string | Y | The webhook's identifier |
| url | string | Y | An HTTPS URL |
| enabled | boolean | Y | Determines if events should be sent to the webhook or not. |
| secret | string | Y | The secret key used to generate the webhook payload HMAC. |

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




## Get an existing webhook



```
GET /webhooks/{id}
```

#### Path Parameters
| Field | Type | Required | Description | Example |
| ----- | ---- | -------- | ----------- | ------- |
| id | string | Y | The webhooks's unique identifier | ljmkOq7vXd239gAE9WALWQ8ZGVD5ExNz |


### Responses

**200** Existing webhook fetched successfully

#### Response Body

| Field | Type | Required | Description |
| ----- | ---- | -------- | ------------|
| id | string | Y | The webhook's identifier |
| url | string | Y | An HTTPS URL |
| enabled | boolean | Y | Determines if events should be sent to the webhook or not. |
| secret | string | Y | The secret key used to generate the webhook payload HMAC. |

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


**404** The webhook does not exist



**429** Rate limit exceeded




## Update an existing webhook



```
PUT /webhooks/{id}
```

#### Path Parameters
| Field | Type | Required | Description | Example |
| ----- | ---- | -------- | ----------- | ------- |
| id | string | Y | The webhooks's unique identifier | ljmkOq7vXd239gAE9WALWQ8ZGVD5ExNz |

#### Request Body

| Field | Type | Required | Description |
| ----- | ---- | -------- | ------------|
| url | string |  | An HTTPS URL |
| enabled | boolean |  | Determines if events should be sent to the webhook or not. Defaults to `true` for newly created<br>webhooks. When updating a webhook and the value is not explicitly specified the existing value<br>will be used.<br> |


### Responses

**200** Existing webhook updated successfully

#### Response Body

| Field | Type | Required | Description |
| ----- | ---- | -------- | ------------|
| id | string | Y | The webhook's identifier |
| url | string | Y | An HTTPS URL |
| enabled | boolean | Y | Determines if events should be sent to the webhook or not. |
| secret | string | Y | The secret key used to generate the webhook payload HMAC. |

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


**404** The webhook does not exist



**429** Rate limit exceeded




## Delete an existing webhook



```
DELETE /webhooks/{id}
```

#### Path Parameters
| Field | Type | Required | Description | Example |
| ----- | ---- | -------- | ----------- | ------- |
| id | string | Y | The webhooks's unique identifier | ljmkOq7vXd239gAE9WALWQ8ZGVD5ExNz |


### Responses

**200** Existing webhook deleted successfully



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


**404** The webhook does not exist



**429** Rate limit exceeded




## Rotate a secret of an existing webhook.

The existing secret will be invalidated immediately and subsequent webhook payloads will be
accompanied by HMACs using the new secret.


```
PUT /webhooks/{id}/rotate-secret
```

#### Path Parameters
| Field | Type | Required | Description | Example |
| ----- | ---- | -------- | ----------- | ------- |
| id | string | Y | The webhooks's unique identifier | ljmkOq7vXd239gAE9WALWQ8ZGVD5ExNz |


### Responses

**200** The secret was rotated successfully

#### Response Body

| Field | Type | Required | Description |
| ----- | ---- | -------- | ------------|
| id | string | Y | The webhook's identifier |
| url | string | Y | An HTTPS URL |
| enabled | boolean | Y | Determines if events should be sent to the webhook or not. |
| secret | string | Y | The secret key used to generate the webhook payload HMAC. |

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


**404** The webhook does not exist



**429** Rate limit exceeded



