



# Projects

Get projects and bundles


## Get bundles

Returns paginated bundles.

Bundle represent a group of projects of similar unit price and characteristics.

Orders are placed against bundles.

Disabled bundles are not returned.


```
GET /bundles
```



### Responses

**200** The response returns paginated bundles

#### Response Body [PaginatedBundles](paginatedbundles.html):

| Field | Type | Description |
| ----- | ---- | ------------|
| has_more | boolean<br />_**required**_ | Whether or not there are more elements available after this set. If false, this set comprises the end of the array. |
| data | array of [Bundle](bundle.html)<br />_**required**_ | Paginated Bundle objects |

##### Example
```json
{
    "has_more": "boolean",
    "data": [
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
    ]
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


**429** Rate limit exceeded




## Get a bundle

Returns a bundle by id if it exists.

Bundle represent a group of projects of similar unit price and characteristics.

Orders are placed against bundles.


```
GET /bundles/{id}
```

#### Path Parameters
| Field | Type | Description | Example |
| ----- | ---- | -------- | ----------- | ------- |
| id | string <br />_**required**_ | The bundle's unique identifier | ljmkOq7vXd239gAE9WALWQ8ZGVD5ExNz |


### Responses

**200** The response returns a bundle

#### Response Body [Bundle](bundle.html):

| Field | Type | Description |
| ----- | ---- | ------------|
| id | string<br />_**required**_ | The bundle's unique identifier |
| name | string<br />_**required**_ | The bundle's name |
| unit_price | string<br />_**required**_ | Bundle unit price per tonne CO2<br> |
| currency | string<br />_**required**_ | Currency code |
| primary_image | string | A bundle's image URL |
| primary_image_hires | string | A bundle's high resolution image URL |
| description | string | The bundle's description |
| disabled | boolean<br />_**required**_ | Disabled bundles do not accept orders<br> |
| available_quantity | string | Quantity of CO2 offsets available to purchase (in tonnes).<br><br>If available_quantity is not set, assume there is an unlimited amount of offsets to purchase.<br> |
| projects | array of [ProjectSummary](projectsummary.html)<br />_**required**_ | Array of projects that belong to the bundle |

##### Example
```json
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
```


**404** The bundle does not exist



**429** Rate limit exceeded




## Get projects

Returns paginated projects.

Disabled projects are not returned.

Note: orders are placed against bundles not projects.


```
GET /projects
```



### Responses

**200** The response returns paginated projects

#### Response Body [PaginatedProjects](paginatedprojects.html):

| Field | Type | Description |
| ----- | ---- | ------------|
| has_more | boolean<br />_**required**_ | Whether or not there are more elements available after this set. If false, this set comprises the end of the array. |
| data | array of [Project](project.html)<br />_**required**_ | Paginated Project objects |

##### Example
```json
{
    "has_more": "boolean",
    "data": [
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
            "disabled": false,
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
                    "available_quantity": "1000.09"
                }
            ]
        }
    ]
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


**429** Rate limit exceeded




## Get a project by id

Returns a project by id if it exists.

Disabled projects are returned.


```
GET /projects/{id}
```

#### Path Parameters
| Field | Type | Description | Example |
| ----- | ---- | -------- | ----------- | ------- |
| id | string <br />_**required**_ | The project's unique identifier | 1vE213P96LbXNap56NAqVoM7knOedQg4 |


### Responses

**200** The response returns a project

#### Response Body [Project](project.html):

| Field | Type | Description |
| ----- | ---- | ------------|
| id | string<br />_**required**_ | The projects's unique identifier |
| name | string<br />_**required**_ | The project's name |
| short_name | string<br />_**required**_ | The project's short name. May coincide with name. |
| slug | string<br />_**required**_ | Project slug |
| description | string<br />_**required**_ | Project description |
| project_type | string<br />_**required**_ | The project's offset type, eg Forest conservation, Afforestation, Direct Air Capture |
| registry_name | string<br />_**required**_ | The project's Verification Standard Entity name or equivalent organization. |
| registry_link | string | A link to the registry's project details page. |
| latitude | number<br />_**required**_ | Latitude |
| longitude | number<br />_**required**_ | Logitude |
| country_name | string<br />_**required**_ | The project's country |
| country_code | string<br />_**required**_ | The project's 3 character country code |
| region | string | The project's region |
| primary_image | string | A project image URL |
| thumbnail_image | string | A project thumbnail image URL |
| results | array | Project results |
| un_sdg | array | UN Sustainable Development Goals.<br><br>Each number in the array represent one UN Sustainable Development Goal. See https://sdgs.un.org/goals.<br> |
| disabled | boolean<br />_**required**_ | Disabled projects do not get allocated to orders<br> |
| bundles | array of [BundleSummary](bundlesummary.html)<br />_**required**_ | Array of bundles the project is part of |

##### Example
```json
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
    "disabled": false,
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
            "available_quantity": "1000.09"
        }
    ]
}
```


**404** The project does not exist



**429** Rate limit exceeded




## Get a project by slug

Returns a project by slug if it exists.

Disabled projects are returned.


```
GET /projects/by-slug/{slug}
```

#### Path Parameters
| Field | Type | Description | Example |
| ----- | ---- | -------- | ----------- | ------- |
| slug | string <br />_**required**_ | The project's unique slug | alto-mayo |


### Responses

**200** The response returns a project

#### Response Body [Project](project.html):

| Field | Type | Description |
| ----- | ---- | ------------|
| id | string<br />_**required**_ | The projects's unique identifier |
| name | string<br />_**required**_ | The project's name |
| short_name | string<br />_**required**_ | The project's short name. May coincide with name. |
| slug | string<br />_**required**_ | Project slug |
| description | string<br />_**required**_ | Project description |
| project_type | string<br />_**required**_ | The project's offset type, eg Forest conservation, Afforestation, Direct Air Capture |
| registry_name | string<br />_**required**_ | The project's Verification Standard Entity name or equivalent organization. |
| registry_link | string | A link to the registry's project details page. |
| latitude | number<br />_**required**_ | Latitude |
| longitude | number<br />_**required**_ | Logitude |
| country_name | string<br />_**required**_ | The project's country |
| country_code | string<br />_**required**_ | The project's 3 character country code |
| region | string | The project's region |
| primary_image | string | A project image URL |
| thumbnail_image | string | A project thumbnail image URL |
| results | array | Project results |
| un_sdg | array | UN Sustainable Development Goals.<br><br>Each number in the array represent one UN Sustainable Development Goal. See https://sdgs.un.org/goals.<br> |
| disabled | boolean<br />_**required**_ | Disabled projects do not get allocated to orders<br> |
| bundles | array of [BundleSummary](bundlesummary.html)<br />_**required**_ | Array of bundles the project is part of |

##### Example
```json
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
    "disabled": false,
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
            "available_quantity": "1000.09"
        }
    ]
}
```


**404** The project does not exist



**429** Rate limit exceeded



