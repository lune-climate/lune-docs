

# Offset links

Provide your customers with links to fund a bundle of their choice.


## Get an offset link by id



```
GET /offset-links/{id}
```

#### Path Parameters
| Field | Type | Required | Description | Example |
| ----- | ---- | -------- | ----------- | ------- |
| id | string | Y | The offset links's unique identifier | 1vE213P96LbXNap56NAqVoM7knOedQg5 |


### Responses

**200** Offset link fetched successfully.

#### Response Body

| Field | Type | Required | Description |
| ----- | ---- | -------- | ------------|
| id | string | Y | The offset link identifier |
| name | string | Y | Offset link name.<br><br>This is a human readable name to recognise and distingish different offset links.<br> |
| title | string |  | Offset link title<br><br>This is the title that appears on the first screen of the offset links flow.<br> |
| description | string |  | Offset link description<br><br>This is the description that appears on the first screen of the offset links flow.<br> |
| logo | string |  | Offset link logo URL<br><br>This is the logo URL that appears on the first screen of the offset links flow.<br> |
| use_logo | boolean | Y | Whether to include the Offset link logo (defined in Account settings) in the footer.<br> |
| url | string | Y | The actual offset link URL that can be used to place orders |
| value | string |  | An amount of money (the fractional part is optional) |
| currency | string |  | ISO 4217 3 character currency code.<br><br>Note: Lune does not support all currency codes.<br> |
| emails | array |  | The email addresses of users that are allowed to use the offset link. |
| bundles | array |  | Bundle objects |
| created_at | string | Y | An <a href="https://pretty-rfc.herokuapp.com/RFC3339">RFC 3339</a>-formatted timestamp. |
| status | string | Y |  |
| expires_at | string |  | An <a href="https://pretty-rfc.herokuapp.com/RFC3339">RFC 3339</a>-formatted timestamp. |
| require_payment | boolean | Y | If true, the user of the Offset Link is required to pay by credit/debit card.<br> |

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


**404** The offset link does not exist



**429** Rate limit exceeded




## Update an offset link



```
PUT /offset-links/{id}
```

#### Path Parameters
| Field | Type | Required | Description | Example |
| ----- | ---- | -------- | ----------- | ------- |
| id | string | Y | The offset links's unique identifier | 1vE213P96LbXNap56NAqVoM7knOedQg5 |

#### Request Body

| Field | Type | Required | Description |
| ----- | ---- | -------- | ------------|
| name | string | Y | Offset link name.<br><br>This is a human readable name to recognise and distingish different offset links.<br> |
| title | string |  | Offset link title<br><br>This is the title that appears on the first screen of the offset links flow.<br> |
| description | string |  | Offset link description<br><br>This is the description that appears on the first screen of the offset links flow.<br> |
| bundles | array |  | The bundle ids selected for use through the particular offset link. |
| value | string |  | An amount of money (the fractional part is optional) |
| emails | array |  | The email addresses of users that are allowed to use the offset link. |
| expires_at | string |  | An <a href="https://pretty-rfc.herokuapp.com/RFC3339">RFC 3339</a>-formatted timestamp. |
| use_logo | boolean | Y | Whether to include the Offset link logo (defined in Account settings) in the footer.<br> |
| require_payment | boolean |  | If true, the user of the Offset Link is required to pay by credit/debit card.<br> |


### Responses

**200** The offset link updated successfully.

#### Response Body

| Field | Type | Required | Description |
| ----- | ---- | -------- | ------------|
| id | string | Y | The offset link identifier |
| name | string | Y | Offset link name.<br><br>This is a human readable name to recognise and distingish different offset links.<br> |
| title | string |  | Offset link title<br><br>This is the title that appears on the first screen of the offset links flow.<br> |
| description | string |  | Offset link description<br><br>This is the description that appears on the first screen of the offset links flow.<br> |
| logo | string |  | Offset link logo URL<br><br>This is the logo URL that appears on the first screen of the offset links flow.<br> |
| use_logo | boolean | Y | Whether to include the Offset link logo (defined in Account settings) in the footer.<br> |
| url | string | Y | The actual offset link URL that can be used to place orders |
| value | string |  | An amount of money (the fractional part is optional) |
| currency | string |  | ISO 4217 3 character currency code.<br><br>Note: Lune does not support all currency codes.<br> |
| emails | array |  | The email addresses of users that are allowed to use the offset link. |
| bundles | array |  | Bundle objects |
| created_at | string | Y | An <a href="https://pretty-rfc.herokuapp.com/RFC3339">RFC 3339</a>-formatted timestamp. |
| status | string | Y |  |
| expires_at | string |  | An <a href="https://pretty-rfc.herokuapp.com/RFC3339">RFC 3339</a>-formatted timestamp. |
| require_payment | boolean | Y | If true, the user of the Offset Link is required to pay by credit/debit card.<br> |

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


**404** An offset link with the specified id belonging to the authenticated account has not been found.



**415** The request is not an application/json encoded request



**429** Rate limit exceeded




## Get the existing offset links



```
GET /offset-links
```



### Responses

**200** Offset links fetched successfully.

#### Response Body

| Field | Type | Required | Description |
| ----- | ---- | -------- | ------------|
| has_more | boolean | Y | Whether or not there are more elements available after this set. If false, this set comprises the end of the array. |
| data | array | Y | Paginated Offset Links |

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




## Create a new offset link



```
POST /offset-links
```


#### Request Body

| Field | Type | Required | Description |
| ----- | ---- | -------- | ------------|
| name | string | Y | Offset link name.<br><br>This is a human readable name to recognise and distingish different offset links.<br> |
| title | string |  | Offset link title<br><br>This is the title that appears on the first screen of the offset links flow.<br> |
| description | string |  | Offset link description<br><br>This is the description that appears on the first screen of the offset links flow.<br> |
| bundles | array |  | The bundle ids selected for use through the particular offset link. |
| value | string |  | An amount of money (the fractional part is optional) |
| emails | array |  | The email addresses of users that are allowed to use the offset link. |
| expires_at | string |  | An <a href="https://pretty-rfc.herokuapp.com/RFC3339">RFC 3339</a>-formatted timestamp. |
| use_logo | boolean | Y | Whether to include the Offset link logo (defined in Account settings) in the footer.<br> |
| require_payment | boolean |  | If true, the user of the Offset Link is required to pay by credit/debit card.<br> |


### Responses

**200** The offset link created successfully.

#### Response Body

| Field | Type | Required | Description |
| ----- | ---- | -------- | ------------|
| id | string | Y | The offset link identifier |
| name | string | Y | Offset link name.<br><br>This is a human readable name to recognise and distingish different offset links.<br> |
| title | string |  | Offset link title<br><br>This is the title that appears on the first screen of the offset links flow.<br> |
| description | string |  | Offset link description<br><br>This is the description that appears on the first screen of the offset links flow.<br> |
| logo | string |  | Offset link logo URL<br><br>This is the logo URL that appears on the first screen of the offset links flow.<br> |
| use_logo | boolean | Y | Whether to include the Offset link logo (defined in Account settings) in the footer.<br> |
| url | string | Y | The actual offset link URL that can be used to place orders |
| value | string |  | An amount of money (the fractional part is optional) |
| currency | string |  | ISO 4217 3 character currency code.<br><br>Note: Lune does not support all currency codes.<br> |
| emails | array |  | The email addresses of users that are allowed to use the offset link. |
| bundles | array |  | Bundle objects |
| created_at | string | Y | An <a href="https://pretty-rfc.herokuapp.com/RFC3339">RFC 3339</a>-formatted timestamp. |
| status | string | Y |  |
| expires_at | string |  | An <a href="https://pretty-rfc.herokuapp.com/RFC3339">RFC 3339</a>-formatted timestamp. |
| require_payment | boolean | Y | If true, the user of the Offset Link is required to pay by credit/debit card.<br> |

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


**415** The request is not an application/json encoded request



**429** Rate limit exceeded




## Get analytics for a given offset link



```
GET /offset-links/{id}/analytics
```

#### Path Parameters
| Field | Type | Required | Description | Example |
| ----- | ---- | -------- | ----------- | ------- |
| id | string | Y | The offset links's unique identifier | 1vE213P96LbXNap56NAqVoM7knOedQg5 |


### Responses

**200** Offset link analytics fetched successfully.

#### Response Body

| Field | Type | Required | Description |
| ----- | ---- | -------- | ------------|
| id | string | Y | The offset link identifier |
| unique_visitors | integer | Y | The number of unique visitors for the specific offset link |
| placed_orders | integer | Y | The number of placed orders for the specific offset link |
| orders | array | Y |  |

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


**404** The offset link does not exist



**429** Rate limit exceeded



