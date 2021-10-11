

# Bundle selections

Get and set default bundle selection


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

#### Response Body
Array of:

| Field | Type | Required | Description |
| ----- | ---- | -------- | ------------|
| bundle_id | string | Y | The bundle's unique identifier |
| percentage | integer | Y | Selection percentage |

##### Example
```json
[
    {
        "bundle_id": "BmWxrvXo29eGqzA1qjANL5PwnkgaO8R3",
        "percentage": 34
    },
    {
        "bundle_id": "VndoQ0PZjGMzvYOZGwqy6kbgN1eOJx9B",
        "percentage": 66
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




## Set account bundle selection

Set the account's bundle selection.

Every account is created with default bundle selections. This will override default bundle selections.


```
PUT /bundle-selections
```


#### Request Body
Array of:

| Field | Type | Required | Description |
| ----- | ---- | -------- | ------------|
| bundle_id | string | Y | The bundle's unique identifier |
| percentage | integer |  | Selection percentage |


### Responses

**200** The response returns the new account's bundle selections

#### Response Body
Array of:

| Field | Type | Required | Description |
| ----- | ---- | -------- | ------------|
| bundle_id | string | Y | The bundle's unique identifier |
| percentage | integer | Y | Selection percentage |

##### Example
```json
[
    {
        "bundle_id": "BmWxrvXo29eGqzA1qjANL5PwnkgaO8R3",
        "percentage": 34
    },
    {
        "bundle_id": "VndoQ0PZjGMzvYOZGwqy6kbgN1eOJx9B",
        "percentage": 66
    }
]
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



