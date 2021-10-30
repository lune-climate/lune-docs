



# Offset links

Provide your customers with links to fund a bundle of their choice.


## Get an offset link by id



```
GET /offset-links/{id}
```

#### Path Parameters
| Field | Type | Description | Example |
| ----- | ---- | -------- | ----------- | ------- |
| id | string <br />_**required**_ | The offset links's unique identifier | 1vE213P96LbXNap56NAqVoM7knOedQg5 |


### Responses

**200** Offset link fetched successfully.

#### Response Body [OffsetLink](OffsetLink):

| Field | Type | Description |
| ----- | ---- | ------------|
| id | string<br />_**required**_ | The offset link identifier |
| name | string<br />_**required**_ | Offset link name.<br><br>This is a human readable name to recognise and distingish different offset links.<br> |
| title | string | Offset link title<br><br>This is the title that appears on the first screen of the offset links flow.<br> |
| description | string | Offset link description<br><br>This is the description that appears on the first screen of the offset links flow.<br> |
| logo | string | Offset link logo URL<br><br>This is the logo URL that appears on the first screen of the offset links flow.<br> |
| use_logo | boolean<br />_**required**_ | Whether to include the Offset link logo (defined in Account settings) in the footer.<br> |
| url | string<br />_**required**_ | The actual offset link URL that can be used to place orders |
| value | string | An amount of money (the fractional part is optional) |
| currency | string | ISO 4217 3 character currency code.<br><br>Note: Lune does not support all currency codes.<br> |
| emails | array | The email addresses of users that are allowed to use the offset link. |
| bundles | array of [Bundle](Bundle) | Bundle objects |
| created_at | string<br />_**required**_ | An <a href="https://pretty-rfc.herokuapp.com/RFC3339">RFC 3339</a>-formatted timestamp. |
| status | string<br />_**required**_<br /><br />Enum: <ul><li>`enabled`</li><li>`disabled`</li></ul> |  |
| expires_at | string | An <a href="https://pretty-rfc.herokuapp.com/RFC3339">RFC 3339</a>-formatted timestamp. |
| require_payment | boolean<br />_**required**_ | If true, the user of the Offset Link is required to pay by credit/debit card.<br> |

##### Example
```json
{
    "id": "UwjfkXjfksoHXzA1qjANL58GhjwqkxpB",
    "name": "Marketing Campaign July 2021",
    "title": "string",
    "description": "string",
    "logo": "string",
    "use_logo": "boolean",
    "url": "https://links.lune.co/ds234cAd",
    "value": "3.14",
    "currency": "string",
    "emails": [
        "john@doe.com"
    ],
    "bundles": [
        {
            "id": "BmWxrvXo29eGqzA1qjANL5PwnkgaO8R3",
            "name": "Latin America Forestry",
            "unit_price": "6.09",
            "currency": "GBP",
            "primary_image": "https://assets.lune.co/bundles/latin-america-forestry.png",
            "primary_image_hires": "https://assets.lune.co/bundles/latin-america-hires.jpg",
            "description": "A conglomeration of renewable energy projects around the world",
            "disabled": false,
            "available_quantity": "1000.09",
            "projects": [
                {
                    "id": "owda1kVEl60jnPykZeADr57Z8OqbKMXx",
                    "name": "Alto Mayo",
                    "short_name": "Alto Mayo",
                    "slug": "alto-mayo",
                    "description": "string",
                    "project_type": "Forest conservation",
                    "registry_name": "Verified Carbon Standard",
                    "registry_link": "https://registry.verra.org/app/projectDetail/VCS/1566",
                    "latitude": "-5.87798",
                    "longitude": "-77.612352",
                    "country_name": "Peru",
                    "country_code": "string",
                    "region": "Huancavelica",
                    "primary_image": "https://assets.lune.co/projects/Alto+Mayo+1.png",
                    "thumbnail_image": "https://assets.lune.co/projects/Alto+Mayo+1_thumbnail.png",
                    "results": [
                        "Reduced deforestation of 75% from baseline levels, the first time a project in Peru reaches such high results",
                        "Co-benefits include: poverty reduction across local communities, education around sustainable farming, conservation of biodiversity"
                    ],
                    "un_sdg": [
                        1,
                        4,
                        8,
                        13,
                        15
                    ],
                    "disabled": false
                }
            ]
        }
    ],
    "created_at": "1985-04-12T23:20:50.52Z",
    "status": "enabled",
    "expires_at": "1985-04-12T23:20:50.52Z",
    "require_payment": "boolean"
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


**404** The offset link does not exist



**429** Rate limit exceeded




## Update an offset link



```
PUT /offset-links/{id}
```

#### Path Parameters
| Field | Type | Description | Example |
| ----- | ---- | -------- | ----------- | ------- |
| id | string <br />_**required**_ | The offset links's unique identifier | 1vE213P96LbXNap56NAqVoM7knOedQg5 |

#### Request Body [OffsetLinkRequest](OffsetLinkRequest):

| Field | Type | Description |
| ----- | ---- | ------------|
| name | string<br />_**required**_ | Offset link name.<br><br>This is a human readable name to recognise and distingish different offset links.<br> |
| title | string | Offset link title<br><br>This is the title that appears on the first screen of the offset links flow.<br> |
| description | string | Offset link description<br><br>This is the description that appears on the first screen of the offset links flow.<br> |
| bundles | array | The bundle ids selected for use through the particular offset link. |
| value |  object [Money](Money) |  |
| emails | array | The email addresses of users that are allowed to use the offset link. |
| expires_at |  object [Timestamp](Timestamp) |  |
| use_logo | boolean<br />_**required**_ | Whether to include the Offset link logo (defined in Account settings) in the footer.<br> |
| require_payment | boolean | If true, the user of the Offset Link is required to pay by credit/debit card.<br> |

##### Example
```json
{
    "name": "Marketing Campaign July 2021",
    "title": "string",
    "description": "string",
    "bundles": [
        "string"
    ],
    "value": "3.14",
    "emails": [
        "john@doe.com"
    ],
    "expires_at": "1985-04-12T23:20:50.52Z",
    "use_logo": "boolean",
    "require_payment": "boolean"
}
```

### Responses

**200** The offset link updated successfully.

#### Response Body [OffsetLink](OffsetLink):

| Field | Type | Description |
| ----- | ---- | ------------|
| id | string<br />_**required**_ | The offset link identifier |
| name | string<br />_**required**_ | Offset link name.<br><br>This is a human readable name to recognise and distingish different offset links.<br> |
| title | string | Offset link title<br><br>This is the title that appears on the first screen of the offset links flow.<br> |
| description | string | Offset link description<br><br>This is the description that appears on the first screen of the offset links flow.<br> |
| logo | string | Offset link logo URL<br><br>This is the logo URL that appears on the first screen of the offset links flow.<br> |
| use_logo | boolean<br />_**required**_ | Whether to include the Offset link logo (defined in Account settings) in the footer.<br> |
| url | string<br />_**required**_ | The actual offset link URL that can be used to place orders |
| value | string | An amount of money (the fractional part is optional) |
| currency | string | ISO 4217 3 character currency code.<br><br>Note: Lune does not support all currency codes.<br> |
| emails | array | The email addresses of users that are allowed to use the offset link. |
| bundles | array of [Bundle](Bundle) | Bundle objects |
| created_at | string<br />_**required**_ | An <a href="https://pretty-rfc.herokuapp.com/RFC3339">RFC 3339</a>-formatted timestamp. |
| status | string<br />_**required**_<br /><br />Enum: <ul><li>`enabled`</li><li>`disabled`</li></ul> |  |
| expires_at | string | An <a href="https://pretty-rfc.herokuapp.com/RFC3339">RFC 3339</a>-formatted timestamp. |
| require_payment | boolean<br />_**required**_ | If true, the user of the Offset Link is required to pay by credit/debit card.<br> |

##### Example
```json
{
    "id": "UwjfkXjfksoHXzA1qjANL58GhjwqkxpB",
    "name": "Marketing Campaign July 2021",
    "title": "string",
    "description": "string",
    "logo": "string",
    "use_logo": "boolean",
    "url": "https://links.lune.co/ds234cAd",
    "value": "3.14",
    "currency": "string",
    "emails": [
        "john@doe.com"
    ],
    "bundles": [
        {
            "id": "BmWxrvXo29eGqzA1qjANL5PwnkgaO8R3",
            "name": "Latin America Forestry",
            "unit_price": "6.09",
            "currency": "GBP",
            "primary_image": "https://assets.lune.co/bundles/latin-america-forestry.png",
            "primary_image_hires": "https://assets.lune.co/bundles/latin-america-hires.jpg",
            "description": "A conglomeration of renewable energy projects around the world",
            "disabled": false,
            "available_quantity": "1000.09",
            "projects": [
                {
                    "id": "owda1kVEl60jnPykZeADr57Z8OqbKMXx",
                    "name": "Alto Mayo",
                    "short_name": "Alto Mayo",
                    "slug": "alto-mayo",
                    "description": "string",
                    "project_type": "Forest conservation",
                    "registry_name": "Verified Carbon Standard",
                    "registry_link": "https://registry.verra.org/app/projectDetail/VCS/1566",
                    "latitude": "-5.87798",
                    "longitude": "-77.612352",
                    "country_name": "Peru",
                    "country_code": "string",
                    "region": "Huancavelica",
                    "primary_image": "https://assets.lune.co/projects/Alto+Mayo+1.png",
                    "thumbnail_image": "https://assets.lune.co/projects/Alto+Mayo+1_thumbnail.png",
                    "results": [
                        "Reduced deforestation of 75% from baseline levels, the first time a project in Peru reaches such high results",
                        "Co-benefits include: poverty reduction across local communities, education around sustainable farming, conservation of biodiversity"
                    ],
                    "un_sdg": [
                        1,
                        4,
                        8,
                        13,
                        15
                    ],
                    "disabled": false
                }
            ]
        }
    ],
    "created_at": "1985-04-12T23:20:50.52Z",
    "status": "enabled",
    "expires_at": "1985-04-12T23:20:50.52Z",
    "require_payment": "boolean"
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


**404** An offset link with the specified id belonging to the authenticated account has not been found.



**415** The request is not an application/json encoded request



**429** Rate limit exceeded




## Get the existing offset links



```
GET /offset-links
```



### Responses

**200** Offset links fetched successfully.

#### Response Body [PaginatedOffsetLinks](PaginatedOffsetLinks):

| Field | Type | Description |
| ----- | ---- | ------------|
| has_more | boolean<br />_**required**_ | Whether or not there are more elements available after this set. If false, this set comprises the end of the array. |
| data | array of [OffsetLink](OffsetLink)<br />_**required**_ | Paginated Offset Links |

##### Example
```json
{
    "has_more": "boolean",
    "data": [
        {
            "id": "UwjfkXjfksoHXzA1qjANL58GhjwqkxpB",
            "name": "Marketing Campaign July 2021",
            "title": "string",
            "description": "string",
            "logo": "string",
            "use_logo": "boolean",
            "url": "https://links.lune.co/ds234cAd",
            "value": "3.14",
            "currency": "string",
            "emails": [
                "john@doe.com"
            ],
            "bundles": [
                {
                    "id": "BmWxrvXo29eGqzA1qjANL5PwnkgaO8R3",
                    "name": "Latin America Forestry",
                    "unit_price": "6.09",
                    "currency": "GBP",
                    "primary_image": "https://assets.lune.co/bundles/latin-america-forestry.png",
                    "primary_image_hires": "https://assets.lune.co/bundles/latin-america-hires.jpg",
                    "description": "A conglomeration of renewable energy projects around the world",
                    "disabled": false,
                    "available_quantity": "1000.09",
                    "projects": [
                        {
                            "id": "owda1kVEl60jnPykZeADr57Z8OqbKMXx",
                            "name": "Alto Mayo",
                            "short_name": "Alto Mayo",
                            "slug": "alto-mayo",
                            "description": "string",
                            "project_type": "Forest conservation",
                            "registry_name": "Verified Carbon Standard",
                            "registry_link": "https://registry.verra.org/app/projectDetail/VCS/1566",
                            "latitude": "-5.87798",
                            "longitude": "-77.612352",
                            "country_name": "Peru",
                            "country_code": "string",
                            "region": "Huancavelica",
                            "primary_image": "https://assets.lune.co/projects/Alto+Mayo+1.png",
                            "thumbnail_image": "https://assets.lune.co/projects/Alto+Mayo+1_thumbnail.png",
                            "results": [
                                "Reduced deforestation of 75% from baseline levels, the first time a project in Peru reaches such high results",
                                "Co-benefits include: poverty reduction across local communities, education around sustainable farming, conservation of biodiversity"
                            ],
                            "un_sdg": [
                                1,
                                4,
                                8,
                                13,
                                15
                            ],
                            "disabled": false
                        }
                    ]
                }
            ],
            "created_at": "1985-04-12T23:20:50.52Z",
            "status": "enabled",
            "expires_at": "1985-04-12T23:20:50.52Z",
            "require_payment": "boolean"
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




## Create a new offset link



```
POST /offset-links
```


#### Request Body [OffsetLinkRequest](OffsetLinkRequest):

| Field | Type | Description |
| ----- | ---- | ------------|
| name | string<br />_**required**_ | Offset link name.<br><br>This is a human readable name to recognise and distingish different offset links.<br> |
| title | string | Offset link title<br><br>This is the title that appears on the first screen of the offset links flow.<br> |
| description | string | Offset link description<br><br>This is the description that appears on the first screen of the offset links flow.<br> |
| bundles | array | The bundle ids selected for use through the particular offset link. |
| value |  object [Money](Money) |  |
| emails | array | The email addresses of users that are allowed to use the offset link. |
| expires_at |  object [Timestamp](Timestamp) |  |
| use_logo | boolean<br />_**required**_ | Whether to include the Offset link logo (defined in Account settings) in the footer.<br> |
| require_payment | boolean | If true, the user of the Offset Link is required to pay by credit/debit card.<br> |

##### Example
```json
{
    "name": "Marketing Campaign July 2021",
    "title": "string",
    "description": "string",
    "bundles": [
        "string"
    ],
    "value": "3.14",
    "emails": [
        "john@doe.com"
    ],
    "expires_at": "1985-04-12T23:20:50.52Z",
    "use_logo": "boolean",
    "require_payment": "boolean"
}
```

### Responses

**200** The offset link created successfully.

#### Response Body [OffsetLink](OffsetLink):

| Field | Type | Description |
| ----- | ---- | ------------|
| id | string<br />_**required**_ | The offset link identifier |
| name | string<br />_**required**_ | Offset link name.<br><br>This is a human readable name to recognise and distingish different offset links.<br> |
| title | string | Offset link title<br><br>This is the title that appears on the first screen of the offset links flow.<br> |
| description | string | Offset link description<br><br>This is the description that appears on the first screen of the offset links flow.<br> |
| logo | string | Offset link logo URL<br><br>This is the logo URL that appears on the first screen of the offset links flow.<br> |
| use_logo | boolean<br />_**required**_ | Whether to include the Offset link logo (defined in Account settings) in the footer.<br> |
| url | string<br />_**required**_ | The actual offset link URL that can be used to place orders |
| value | string | An amount of money (the fractional part is optional) |
| currency | string | ISO 4217 3 character currency code.<br><br>Note: Lune does not support all currency codes.<br> |
| emails | array | The email addresses of users that are allowed to use the offset link. |
| bundles | array of [Bundle](Bundle) | Bundle objects |
| created_at | string<br />_**required**_ | An <a href="https://pretty-rfc.herokuapp.com/RFC3339">RFC 3339</a>-formatted timestamp. |
| status | string<br />_**required**_<br /><br />Enum: <ul><li>`enabled`</li><li>`disabled`</li></ul> |  |
| expires_at | string | An <a href="https://pretty-rfc.herokuapp.com/RFC3339">RFC 3339</a>-formatted timestamp. |
| require_payment | boolean<br />_**required**_ | If true, the user of the Offset Link is required to pay by credit/debit card.<br> |

##### Example
```json
{
    "id": "UwjfkXjfksoHXzA1qjANL58GhjwqkxpB",
    "name": "Marketing Campaign July 2021",
    "title": "string",
    "description": "string",
    "logo": "string",
    "use_logo": "boolean",
    "url": "https://links.lune.co/ds234cAd",
    "value": "3.14",
    "currency": "string",
    "emails": [
        "john@doe.com"
    ],
    "bundles": [
        {
            "id": "BmWxrvXo29eGqzA1qjANL5PwnkgaO8R3",
            "name": "Latin America Forestry",
            "unit_price": "6.09",
            "currency": "GBP",
            "primary_image": "https://assets.lune.co/bundles/latin-america-forestry.png",
            "primary_image_hires": "https://assets.lune.co/bundles/latin-america-hires.jpg",
            "description": "A conglomeration of renewable energy projects around the world",
            "disabled": false,
            "available_quantity": "1000.09",
            "projects": [
                {
                    "id": "owda1kVEl60jnPykZeADr57Z8OqbKMXx",
                    "name": "Alto Mayo",
                    "short_name": "Alto Mayo",
                    "slug": "alto-mayo",
                    "description": "string",
                    "project_type": "Forest conservation",
                    "registry_name": "Verified Carbon Standard",
                    "registry_link": "https://registry.verra.org/app/projectDetail/VCS/1566",
                    "latitude": "-5.87798",
                    "longitude": "-77.612352",
                    "country_name": "Peru",
                    "country_code": "string",
                    "region": "Huancavelica",
                    "primary_image": "https://assets.lune.co/projects/Alto+Mayo+1.png",
                    "thumbnail_image": "https://assets.lune.co/projects/Alto+Mayo+1_thumbnail.png",
                    "results": [
                        "Reduced deforestation of 75% from baseline levels, the first time a project in Peru reaches such high results",
                        "Co-benefits include: poverty reduction across local communities, education around sustainable farming, conservation of biodiversity"
                    ],
                    "un_sdg": [
                        1,
                        4,
                        8,
                        13,
                        15
                    ],
                    "disabled": false
                }
            ]
        }
    ],
    "created_at": "1985-04-12T23:20:50.52Z",
    "status": "enabled",
    "expires_at": "1985-04-12T23:20:50.52Z",
    "require_payment": "boolean"
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


**415** The request is not an application/json encoded request



**429** Rate limit exceeded




## Get analytics for a given offset link



```
GET /offset-links/{id}/analytics
```

#### Path Parameters
| Field | Type | Description | Example |
| ----- | ---- | -------- | ----------- | ------- |
| id | string <br />_**required**_ | The offset links's unique identifier | 1vE213P96LbXNap56NAqVoM7knOedQg5 |


### Responses

**200** Offset link analytics fetched successfully.

#### Response Body [OffsetLinkAnalytics](OffsetLinkAnalytics):

| Field | Type | Description |
| ----- | ---- | ------------|
| id | string<br />_**required**_ | The offset link identifier |
| unique_visitors | integer<br />_**required**_ | The number of unique visitors for the specific offset link |
| placed_orders | integer<br />_**required**_ | The number of placed orders for the specific offset link |
| orders | array of [OffsetLinkOrder](OffsetLinkOrder)<br />_**required**_ |  |

##### Example
```json
{
    "id": "UwjfkXjfksoHXzA1qjANL58GhjwqkxpB",
    "unique_visitors": 52344,
    "placed_orders": 52344,
    "orders": [
        {
            "order_id": "zwjfkXjfksoHXzA1qjANL58GhjwqkxpB",
            "created_at": "1985-04-12T23:20:50.52Z",
            "email": [
                "john@doe.com"
            ],
            "bundles": [
                {
                    "bundle_id": "va1BEV2VZqnzPkYxJgALg0GeQDoXlWO5",
                    "bundle_name": "Latin America Forestry"
                }
            ]
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


**404** The offset link does not exist



**429** Rate limit exceeded



