



# Orders

Get a quote, create and fetch orders.



## Create an order by mass

Create an order to purchase carbon offset by specifying a mass in tonnes or kilograms.

```
POST /orders/by-mass
```


#### Request Body [CreateOrderByQuantityRequest](createorderbyquantityrequest.html):

| Field | Type | Description |
| ----- | ---- | ------------|
| mass | <br />_**required**_ | Mass of CO2 offsets to purchase |
| idempotency_key | string | Optional unique identifier provided by the client.<br><br>`idempotency_key` has two purposes:<br>1. Clients can safely retry order requests without accidentally performing the same operation twice. The current state of the original order is returned.<br>2. Clients can use `idempotency_key` to reconcile orders with other entities on their system.<br> |
| bundle_selection |  object [BundleSelectionRequest](bundleselectionrequest.html) |  |
| metadata |  object [Metadata](metadata.html) |  |

##### Example
```json
{
    "mass": {
        "amount": "40.501",
        "unit": "kg"
    },
    "idempotency_key": "5bd808a954e",
    "bundle_selection": [
        {
            "bundle_id": "BmWxrvXo29eGqzA1qjANL5PwnkgaO8R3",
            "percentage": 34
        },
        {
            "bundle_id": "VndoQ0PZjGMzvYOZGwqy6kbgN1eOJx9B",
            "percentage": 66
        }
    ],
    "metadata": {
        "property1": "string",
        "property2": "number"
    }
}
```

### Responses

**200** Order created successfully.
The response returns an Order object.


#### Response Body [OrderByQuantity](orderbyquantity.html):

| Field | Type | Description |
| ----- | ---- | ------------|
| id | string<br />_**required**_ | The order's unique identifier |
| idempotency_key | string | Optional unique identifier provided by the client.<br><br>`idempotency_key` has two purposes:<br>1. Clients can safely retry order requests without accidentally performing the same operation twice. The current state of the original order is returned.<br>2. Clients can use `idempotency_key` to reconcile orders with other entities on their system.<br> |
| type | string<br />_**required**_<br /><br />Enum: <ul><li>`quantity`</li><li>`value`</li></ul> | Identifies whether the order has been placed by quantity (kg CO2) or value (monetary amount) |
| status | string<br />_**required**_<br /><br />Enum: <ul><li>`received`</li><li>`placed`</li><li>`paid`</li><li>`allocated`</li><li>`cancelled`</li><li>`complete`</li><li>`failed`</li></ul> | Order status |
| currency | string<br />_**required**_ | Order currency code |
| offset_cost | string | Represents the net cost of offsets purchased by the order. May be lower than `requested_value`.<br><br>This field is set when the order is linked to Bundles.<br><br>This field is set the order's status transitions from `received` to `placed`.<br><br>Unit: order currency<br> |
| total_cost | string | The total cost for the order inclusive of fees.<br><br>Unit: order currency<br> |
| commission | string | Represents Lune's fee.<br><br>This field is set when the order is linked to Bundles.<br><br>This field is set the order's status transitions from `received` to `placed`.<br><br>Unit: order currency<br> |
| quantity | string | Quantity of CO2 offsets purchased in tonnes. |
| created_at | string<br />_**required**_ | Order creation timestamp |
| bundles | array of [OrderBundle](orderbundle.html) | bundles are set when the order's status is `placed`, `paid`, `allocated` or `complete`.<br><br>Represents the bundles associated with the order including their relative quantity and cost breakdown.<br> |
| projects | array of [OrderProject](orderproject.html) | Projects are set when the order's status is `allocated` or `complete`.<br><br>Represents the projects associated with the order including their relative quantity and cost breakdown.<br><br>Orders are placed against bundles, not projects. Projects in a bundle may change based on supply.<br><br>This field is set as soon as we can guarantee project supply.<br> |
| certificate | string | Carbon credits certificate URL.<br><br>This field is set when an order in 'complete' status<br> |
| metadata |  object [Metadata](metadata.html)<br />_**required**_ |  |
| offset_link_id | string | The offset link identifier, if the order was placed through an offset link |
| email | string | End-user email.<br><br>This field is currently populated on orders placed through offset links.<br> |
| requested_quantity | string<br />_**required**_ | Represents the requested quantity of CO2 offsets to purchase in tonnes. |

##### Example
```json
{
    "id": "va1BER4JZqnzPkYxJgALg0GeQDoXlWO5",
    "idempotency_key": "5bd808a954e",
    "type": "quantity",
    "status": "complete",
    "currency": "GBP",
    "offset_cost": "7176.00",
    "total_cost": "7696.00",
    "commission": "520.00",
    "quantity": "1040",
    "created_at": "string",
    "bundles": [
        {
            "bundle_id": "va1BEV2VZqnzPkYxJgALg0GeQDoXlWO5",
            "bundle_name": "Latin America Forestry",
            "quantity": "1040",
            "unit_price": "6.90",
            "offset_cost": "7176.00",
            "insufficient_available_quantity": true
        }
    ],
    "projects": [
        {
            "quantity": "600",
            "unit_price": "6.90",
            "offset_cost": "4140.00",
            "project_id": "gMbvJoOaX54V1wpNaRY8dWDGQ7m239Bx",
            "project_name": "Madre De Dios",
            "project_type": "Forest Conservation",
            "project_slug": "madre-de-dios"
        },
        {
            "quantity": "440",
            "unit_price": "6.90",
            "offset_cost": "3036.00",
            "project_id": "xe1BEV2VZqnzPkYxJgALg0GeQDoXlWO5",
            "project_name": "Alto Mayo",
            "project_type": "Forest Conservation",
            "project_slug": "alto-mayo"
        }
    ],
    "certificate": "https://api.lune.co/v1/orders/08QD7GPaBx5b6Y60ndAONXLvrZljRE2e/certificate",
    "metadata": {
        "property1": "string",
        "property2": "number"
    },
    "offset_link_id": "UwjfkXjfksoHXzA1qjANL58GhjwqkxpB",
    "email": "john@doe.com",
    "requested_quantity": "1045"
}
```


**400** Bad Request

#### Response Body [Errors](errors.html):
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

#### Response Body [Errors](errors.html):
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


**409** Conflict

Examples:
  1. account is suspended
  2. order idempotency failure: an order with the same idempotency_key has already by created


#### Response Body [Errors](errors.html):
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


**415** The request is not an application/json encoded request



**429** Rate limit exceeded




## Create an order by value

Create an order to purchase carbon offset by specifying a maximum purchase value.

```
POST /orders/by-value
```


#### Request Body [CreateOrderByValueRequest](createorderbyvaluerequest.html):

| Field | Type | Description |
| ----- | ---- | ------------|
| value | string<br />_**required**_ | Maximum price of CO2 offsets to purchase (in the account's currency) |
| idempotency_key | string | Optional unique identifier provided by the client.<br><br>`idempotency_key` has two purposes:<br>1. Clients can safely retry order requests without accidentally performing the same operation twice. The current state of the original order is returned.<br>2. Clients can use `idempotency_key` to reconcile orders with other entities on their system.<br> |
| bundle_selection |  object [BundleSelectionRequest](bundleselectionrequest.html) |  |
| metadata |  object [Metadata](metadata.html) |  |

##### Example
```json
{
    "value": "7700.00",
    "idempotency_key": "5bd808a954e",
    "bundle_selection": [
        {
            "bundle_id": "BmWxrvXo29eGqzA1qjANL5PwnkgaO8R3",
            "percentage": 34
        },
        {
            "bundle_id": "VndoQ0PZjGMzvYOZGwqy6kbgN1eOJx9B",
            "percentage": 66
        }
    ],
    "metadata": {
        "property1": "string",
        "property2": "number"
    }
}
```

### Responses

**200** Order created successfully.
The response returns an Order object.


#### Response Body [OrderByValue](orderbyvalue.html):

| Field | Type | Description |
| ----- | ---- | ------------|
| id | string<br />_**required**_ | The order's unique identifier |
| idempotency_key | string | Optional unique identifier provided by the client.<br><br>`idempotency_key` has two purposes:<br>1. Clients can safely retry order requests without accidentally performing the same operation twice. The current state of the original order is returned.<br>2. Clients can use `idempotency_key` to reconcile orders with other entities on their system.<br> |
| type | string<br />_**required**_<br /><br />Enum: <ul><li>`quantity`</li><li>`value`</li></ul> | Identifies whether the order has been placed by quantity (kg CO2) or value (monetary amount) |
| status | string<br />_**required**_<br /><br />Enum: <ul><li>`received`</li><li>`placed`</li><li>`paid`</li><li>`allocated`</li><li>`cancelled`</li><li>`complete`</li><li>`failed`</li></ul> | Order status |
| currency | string<br />_**required**_ | Order currency code |
| offset_cost | string | Represents the net cost of offsets purchased by the order. May be lower than `requested_value`.<br><br>This field is set when the order is linked to Bundles.<br><br>This field is set the order's status transitions from `received` to `placed`.<br><br>Unit: order currency<br> |
| total_cost | string | The total cost for the order inclusive of fees.<br><br>Unit: order currency<br> |
| commission | string | Represents Lune's fee.<br><br>This field is set when the order is linked to Bundles.<br><br>This field is set the order's status transitions from `received` to `placed`.<br><br>Unit: order currency<br> |
| quantity | string | Quantity of CO2 offsets purchased in tonnes. |
| created_at | string<br />_**required**_ | Order creation timestamp |
| bundles | array of [OrderBundle](orderbundle.html) | bundles are set when the order's status is `placed`, `paid`, `allocated` or `complete`.<br><br>Represents the bundles associated with the order including their relative quantity and cost breakdown.<br> |
| projects | array of [OrderProject](orderproject.html) | Projects are set when the order's status is `allocated` or `complete`.<br><br>Represents the projects associated with the order including their relative quantity and cost breakdown.<br><br>Orders are placed against bundles, not projects. Projects in a bundle may change based on supply.<br><br>This field is set as soon as we can guarantee project supply.<br> |
| certificate | string | Carbon credits certificate URL.<br><br>This field is set when an order in 'complete' status<br> |
| metadata |  object [Metadata](metadata.html)<br />_**required**_ |  |
| offset_link_id | string | The offset link identifier, if the order was placed through an offset link |
| email | string | End-user email.<br><br>This field is currently populated on orders placed through offset links.<br> |
| requested_value | string<br />_**required**_ | Represents the requested value of CO2 offsets to purchase.<br><br>Unit: order currency<br> |

##### Example
```json
{
    "id": "va1BER4JZqnzPkYxJgALg0GeQDoXlWO5",
    "idempotency_key": "5bd808a954e",
    "type": "quantity",
    "status": "complete",
    "currency": "GBP",
    "offset_cost": "7176.00",
    "total_cost": "7696.00",
    "commission": "520.00",
    "quantity": "1040",
    "created_at": "string",
    "bundles": [
        {
            "bundle_id": "va1BEV2VZqnzPkYxJgALg0GeQDoXlWO5",
            "bundle_name": "Latin America Forestry",
            "quantity": "1040",
            "unit_price": "6.90",
            "offset_cost": "7176.00",
            "insufficient_available_quantity": true
        }
    ],
    "projects": [
        {
            "quantity": "600",
            "unit_price": "6.90",
            "offset_cost": "4140.00",
            "project_id": "gMbvJoOaX54V1wpNaRY8dWDGQ7m239Bx",
            "project_name": "Madre De Dios",
            "project_type": "Forest Conservation",
            "project_slug": "madre-de-dios"
        },
        {
            "quantity": "440",
            "unit_price": "6.90",
            "offset_cost": "3036.00",
            "project_id": "xe1BEV2VZqnzPkYxJgALg0GeQDoXlWO5",
            "project_name": "Alto Mayo",
            "project_type": "Forest Conservation",
            "project_slug": "alto-mayo"
        }
    ],
    "certificate": "https://api.lune.co/v1/orders/08QD7GPaBx5b6Y60ndAONXLvrZljRE2e/certificate",
    "metadata": {
        "property1": "string",
        "property2": "number"
    },
    "offset_link_id": "UwjfkXjfksoHXzA1qjANL58GhjwqkxpB",
    "email": "john@doe.com",
    "requested_value": "7700"
}
```


**400** Bad Request

#### Response Body [Errors](errors.html):
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

#### Response Body [Errors](errors.html):
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


**409** Conflict

Examples:
  1. account is suspended
  2. order idempotency failure: an order with the same idempotency_key has already by created


#### Response Body [Errors](errors.html):
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


**415** The request is not an application/json encoded request



**429** Rate limit exceeded




## Get orders

Returns paginated account orders ordered by creation date descending

The API key used to access this method affects what orders are returned: test orders for the test
API key, live orders for the live one.


```
GET /orders
```



### Responses

**200** The response returns paginated orders

#### Response Body [PaginatedOrders](paginatedorders.html):

| Field | Type | Description |
| ----- | ---- | ------------|
| has_more | boolean<br />_**required**_ | Whether or not there are more elements available after this set. If false, this set comprises the end of the array. |
| data | array of [Order](order.html)<br />_**required**_ | Paginated Order objects ordered by creation date descending. |

##### Example
```json
{
    "has_more": "boolean",
    "data": [
        {
            "id": "va1BER4JZqnzPkYxJgALg0GeQDoXlWO5",
            "idempotency_key": "5bd808a954e",
            "type": "quantity",
            "status": "complete",
            "currency": "GBP",
            "offset_cost": "7176.00",
            "total_cost": "7696.00",
            "commission": "520.00",
            "quantity": "1040",
            "created_at": "string",
            "bundles": [
                {
                    "bundle_id": "va1BEV2VZqnzPkYxJgALg0GeQDoXlWO5",
                    "bundle_name": "Latin America Forestry",
                    "quantity": "1040",
                    "unit_price": "6.90",
                    "offset_cost": "7176.00",
                    "insufficient_available_quantity": true
                }
            ],
            "projects": [
                {
                    "quantity": "600",
                    "unit_price": "6.90",
                    "offset_cost": "4140.00",
                    "project_id": "gMbvJoOaX54V1wpNaRY8dWDGQ7m239Bx",
                    "project_name": "Madre De Dios",
                    "project_type": "Forest Conservation",
                    "project_slug": "madre-de-dios"
                },
                {
                    "quantity": "440",
                    "unit_price": "6.90",
                    "offset_cost": "3036.00",
                    "project_id": "xe1BEV2VZqnzPkYxJgALg0GeQDoXlWO5",
                    "project_name": "Alto Mayo",
                    "project_type": "Forest Conservation",
                    "project_slug": "alto-mayo"
                }
            ],
            "certificate": "https://api.lune.co/v1/orders/08QD7GPaBx5b6Y60ndAONXLvrZljRE2e/certificate",
            "metadata": {
                "property1": "string",
                "property2": "number"
            },
            "offset_link_id": "UwjfkXjfksoHXzA1qjANL58GhjwqkxpB",
            "email": "john@doe.com",
            "requested_quantity": "1045"
        }
    ]
}
```


**401** Unauthorized. The API Key is invalid or disabled.

#### Response Body [Errors](errors.html):
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




## Get an order

Returns an order by id if it exists.


```
GET /orders/{id}
```

#### Path Parameters
| Field | Type | Description | Example |
| ----- | ---- | -------- | ----------- | ------- |
| id | string <br />_**required**_ | The order's unique identifier | ljmkOq7vXd239gAE9WALWQ8ZGVD5ExNz |


### Responses

**200** The response returns an order

#### Response Body [Order](order.html):

| Field | Type | Description |
| ----- | ---- | ------------|
| type | string<br />_**required**_<br /><br />Enum: <ul><li>`quantity`</li><li>`value`</li></ul> | Identifies whether the order has been placed by quantity (kg CO2) or value (monetary amount) |

##### Example
```json
{
    "id": "va1BER4JZqnzPkYxJgALg0GeQDoXlWO5",
    "idempotency_key": "5bd808a954e",
    "type": "quantity",
    "status": "complete",
    "currency": "GBP",
    "offset_cost": "7176.00",
    "total_cost": "7696.00",
    "commission": "520.00",
    "quantity": "1040",
    "created_at": "string",
    "bundles": [
        {
            "bundle_id": "va1BEV2VZqnzPkYxJgALg0GeQDoXlWO5",
            "bundle_name": "Latin America Forestry",
            "quantity": "1040",
            "unit_price": "6.90",
            "offset_cost": "7176.00",
            "insufficient_available_quantity": true
        }
    ],
    "projects": [
        {
            "quantity": "600",
            "unit_price": "6.90",
            "offset_cost": "4140.00",
            "project_id": "gMbvJoOaX54V1wpNaRY8dWDGQ7m239Bx",
            "project_name": "Madre De Dios",
            "project_type": "Forest Conservation",
            "project_slug": "madre-de-dios"
        },
        {
            "quantity": "440",
            "unit_price": "6.90",
            "offset_cost": "3036.00",
            "project_id": "xe1BEV2VZqnzPkYxJgALg0GeQDoXlWO5",
            "project_name": "Alto Mayo",
            "project_type": "Forest Conservation",
            "project_slug": "alto-mayo"
        }
    ],
    "certificate": "https://api.lune.co/v1/orders/08QD7GPaBx5b6Y60ndAONXLvrZljRE2e/certificate",
    "metadata": {
        "property1": "string",
        "property2": "number"
    },
    "offset_link_id": "UwjfkXjfksoHXzA1qjANL58GhjwqkxpB",
    "email": "john@doe.com",
    "requested_quantity": "1045"
}
```


**404** The order does not exist



**429** Rate limit exceeded




## Get a carbon offset certificate

Download a Carbon Offset Certificate for a completed order.


```
GET /orders/{id}/certificate
```

#### Path Parameters
| Field | Type | Description | Example |
| ----- | ---- | -------- | ----------- | ------- |
| id | string <br />_**required**_ | The order's unique identifier | ljmkOq7vXd239gAE9WALWQ8ZGVD5ExNz |


### Responses

**200** The response returns the Carbon Offset Certificate



**404** The order or the certificate does not exist



**429** Rate limit exceeded




## Get an order by idempotency key

Returns an order by idempotency key if it exists.


```
GET /orders/by-idempotency-key/{idempotencyKey}
```

#### Path Parameters
| Field | Type | Description | Example |
| ----- | ---- | -------- | ----------- | ------- |
| idempotencyKey | string <br />_**required**_ | The order's idempotency key | sg5knd2 |


### Responses

**200** The response returns an order

#### Response Body [Order](order.html):

| Field | Type | Description |
| ----- | ---- | ------------|
| type | string<br />_**required**_<br /><br />Enum: <ul><li>`quantity`</li><li>`value`</li></ul> | Identifies whether the order has been placed by quantity (kg CO2) or value (monetary amount) |

##### Example
```json
{
    "id": "va1BER4JZqnzPkYxJgALg0GeQDoXlWO5",
    "idempotency_key": "5bd808a954e",
    "type": "quantity",
    "status": "complete",
    "currency": "GBP",
    "offset_cost": "7176.00",
    "total_cost": "7696.00",
    "commission": "520.00",
    "quantity": "1040",
    "created_at": "string",
    "bundles": [
        {
            "bundle_id": "va1BEV2VZqnzPkYxJgALg0GeQDoXlWO5",
            "bundle_name": "Latin America Forestry",
            "quantity": "1040",
            "unit_price": "6.90",
            "offset_cost": "7176.00",
            "insufficient_available_quantity": true
        }
    ],
    "projects": [
        {
            "quantity": "600",
            "unit_price": "6.90",
            "offset_cost": "4140.00",
            "project_id": "gMbvJoOaX54V1wpNaRY8dWDGQ7m239Bx",
            "project_name": "Madre De Dios",
            "project_type": "Forest Conservation",
            "project_slug": "madre-de-dios"
        },
        {
            "quantity": "440",
            "unit_price": "6.90",
            "offset_cost": "3036.00",
            "project_id": "xe1BEV2VZqnzPkYxJgALg0GeQDoXlWO5",
            "project_name": "Alto Mayo",
            "project_type": "Forest Conservation",
            "project_slug": "alto-mayo"
        }
    ],
    "certificate": "https://api.lune.co/v1/orders/08QD7GPaBx5b6Y60ndAONXLvrZljRE2e/certificate",
    "metadata": {
        "property1": "string",
        "property2": "number"
    },
    "offset_link_id": "UwjfkXjfksoHXzA1qjANL58GhjwqkxpB",
    "email": "john@doe.com",
    "requested_quantity": "1045"
}
```


**404** The order does not exist



**429** Rate limit exceeded




## Calculate an order quote by mass

This endpoint does not create an order.

However, it processes the order as if it were placed returning estimated cost and bundles allocations.


```
POST /orders/by-mass/quote
```


#### Request Body [OrderQuoteByQuantityRequest](orderquotebyquantityrequest.html):

| Field | Type | Description |
| ----- | ---- | ------------|
| mass | <br />_**required**_ | Mass of CO2 offsets to purchase |
| bundle_selection |  object [BundleSelectionRequest](bundleselectionrequest.html) |  |

##### Example
```json
{
    "mass": {
        "amount": "40.501",
        "unit": "kg"
    },
    "bundle_selection": [
        {
            "bundle_id": "BmWxrvXo29eGqzA1qjANL5PwnkgaO8R3",
            "percentage": 34
        },
        {
            "bundle_id": "VndoQ0PZjGMzvYOZGwqy6kbgN1eOJx9B",
            "percentage": 66
        }
    ]
}
```

### Responses

**200** Order quote processed successfully.


#### Response Body [OrderQuoteByQuantity](orderquotebyquantity.html):

| Field | Type | Description |
| ----- | ---- | ------------|
| currency | string<br />_**required**_ | Currency code |
| estimated_quantity | string<br />_**required**_ | Estimated quantity (tonnes CO2).<br><br>May be lower than `requested_quantity`.<br> |
| estimated_offset_cost | string<br />_**required**_ | Estimated offset cost<br><br>Unit: order quote currency<br> |
| estimated_total_cost | string<br />_**required**_ | Estimated total cost inclusive of Lune fees.<br><br>Unit: order quote currency<br> |
| estimated_commission | string<br />_**required**_ | Estimated commission |
| bundles | array of [OrderBundle](orderbundle.html)<br />_**required**_ | Bundles included in the quote including quantity and cost breakdown.<br> |
| requested_quantity | string<br />_**required**_ | Requested quantity for the specific bundle (tonnes CO2) |

##### Example
```json
{
    "currency": "GBP",
    "estimated_quantity": "1040",
    "estimated_offset_cost": "7176.00",
    "estimated_total_cost": "7696.00",
    "estimated_commission": "520.00",
    "bundles": [
        {
            "bundle_id": "va1BEV2VZqnzPkYxJgALg0GeQDoXlWO5",
            "bundle_name": "Latin America Forestry",
            "quantity": "1040",
            "unit_price": "6.90",
            "offset_cost": "7176.00",
            "insufficient_available_quantity": true
        }
    ],
    "requested_quantity": "1045"
}
```


**400** Bad Request

#### Response Body [Errors](errors.html):
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

#### Response Body [Errors](errors.html):
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


**415** The request is not an application/json encoded request



**429** Rate limit exceeded




## Calculate an order quote by value

This endpoint does not create an order.

However, it processes the order as if it were placed returning estimated cost and bundles allocations.


```
POST /orders/by-value/quote
```


#### Request Body [OrderQuoteByValueRequest](orderquotebyvaluerequest.html):

| Field | Type | Description |
| ----- | ---- | ------------|
| value | string<br />_**required**_ | Maximum price of CO2 offsets to purchase (in the account's currency) |
| bundle_selection |  object [BundleSelectionRequest](bundleselectionrequest.html) |  |

##### Example
```json
{
    "value": "7700.00",
    "bundle_selection": [
        {
            "bundle_id": "BmWxrvXo29eGqzA1qjANL5PwnkgaO8R3",
            "percentage": 34
        },
        {
            "bundle_id": "VndoQ0PZjGMzvYOZGwqy6kbgN1eOJx9B",
            "percentage": 66
        }
    ]
}
```

### Responses

**200** Order quote processed successfully.


#### Response Body [OrderQuoteByValue](orderquotebyvalue.html):

| Field | Type | Description |
| ----- | ---- | ------------|
| currency | string<br />_**required**_ | Currency code |
| estimated_quantity | string<br />_**required**_ | Estimated quantity (tonnes CO2).<br><br>May be lower than `requested_quantity`.<br> |
| estimated_offset_cost | string<br />_**required**_ | Estimated offset cost<br><br>Unit: order quote currency<br> |
| estimated_total_cost | string<br />_**required**_ | Estimated total cost inclusive of Lune fees.<br><br>Unit: order quote currency<br> |
| estimated_commission | string<br />_**required**_ | Estimated commission |
| bundles | array of [OrderBundle](orderbundle.html)<br />_**required**_ | Bundles included in the quote including quantity and cost breakdown.<br> |
| requested_value | string<br />_**required**_ | Requested order value inclusive of commission |

##### Example
```json
{
    "currency": "GBP",
    "estimated_quantity": "1040",
    "estimated_offset_cost": "7176.00",
    "estimated_total_cost": "7696.00",
    "estimated_commission": "520.00",
    "bundles": [
        {
            "bundle_id": "va1BEV2VZqnzPkYxJgALg0GeQDoXlWO5",
            "bundle_name": "Latin America Forestry",
            "quantity": "1040",
            "unit_price": "6.90",
            "offset_cost": "7176.00",
            "insufficient_available_quantity": true
        }
    ],
    "requested_value": "7700"
}
```


**400** Bad Request

#### Response Body [Errors](errors.html):
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

#### Response Body [Errors](errors.html):
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


**415** The request is not an application/json encoded request



**429** Rate limit exceeded



