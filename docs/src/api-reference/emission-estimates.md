

# Emission estimates

Estimate CO2 emissions (caused by shipping goods for example).


## Estimate electricity emissions

Estimate emissions produced by electricity consumption.

The value returned is in CO2e – it accounts for both CO2 and non-CO2 emissions.


```
POST /estimates/electricity
```


#### Request Body

| Field | Type | Required | Description |
| ----- | ---- | -------- | ------------|
| consumption | object | Y |  |
| country_code | string |  | The three-letter code of the country where the consumption takes place, if applicable.<br><br>Providing this value will improve the estimation process. If the value is not provided<br>the global average will be used.<br> |


### Responses

**200** Estimation calculated successfully.


#### Response Body

| Field | Type | Required | Description |
| ----- | ---- | -------- | ------------|
| amount | string | Y |  |
| unit | string | Y | Unit, `t` for tonne, `kg` for kilogram |

##### Example
```json
{
    "amount": "40.501",
    "unit": "kg"
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



**503** The service is temporarily unavailable




## Estimate flight emissions

Estimate emissions produced by passengers in a commercial airflight.

The value returned is in CO2e – it accounts for both CO2 and non-CO2 emissions.


```
POST /estimates/flight
```


#### Request Body

| Field | Type | Required | Description |
| ----- | ---- | -------- | ------------|
| route |  | Y | Either the flying distance or the start/destination airport code (ICAO or IATA). |
| cabin_class | string |  | Cabin of class to be used for the specified passengers.<br>Higher classes account for more emissions since total weight and volume necessary to accomodate the class is higher.<br>This parameter defaults to first. |
| passengers | number |  | Number of passengers the calculation should be applied to.<br>This parameter defaults to 1. |


### Responses

**200** Estimation calculated successfully.


#### Response Body

| Field | Type | Required | Description |
| ----- | ---- | -------- | ------------|
| amount | string | Y |  |
| unit | string | Y | Unit, `t` for tonne, `kg` for kilogram |

##### Example
```json
{
    "amount": "40.501",
    "unit": "kg"
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



**503** The service is temporarily unavailable




## Estimate shipping emissions

Estimate emissions produced by shipping something from point A to point B.

The value returned is in CO2e – it accounts for both CO2 and non-CO2 emissions.

Some examples of the input payload:

* Source/destination addresses, 10 tonnes transported by a diesel truck:

  ```json
  { 
      "shipment": { "mass": { "amount": "10.0", "unit": "t" } },
      "route": {
          "source": {
              "street_line1": "Karl-Liebknecht-Str. 13",
              "country_code": "DEU",
              "city": "Berlin",
              "postcode": "10178"
          },
          "destination": {
              "street_line1": "62 Great Russell St",
              "country_code": "GBR",
              "city": "London",
              "postcode": "WC1B 3BG"
          }
      },
      "method": "diesel_truck"
  }
  ```
* 1 tonne transported 2000 km by a small general cargo ship with Marine Gasoil (MGO) fuel used:

  ```json
  {
      "shipment": { "mass": { "amount": "1.0", "unit": "t" } },
      "route": { "amount": "2000.0", "unit": "km" },
      "method": { "vessel_type": "sea_general_cargo_small", "fuel": "MGO" }
  }
  ```

* 3 containers (TEUs) transported 5000 km by a refrigerated container ship over an
  Europe/South America trade lane:

  ```json
  {
      "shipment": { "containers": "3.0" },
      "route": { "amount": "5000.0", "unit": "km" },
      "method": {
          "vessel_type": "container_ship",
          "refrigerated": true,
          "trade_lane": "disaggregated_europe_to_south_america"
      }
  }
  ```

* 10 tonnes transported 4000 km by a vessel with IMO number 9745225:

  ```json
  {
      "shipment": { "mass": { "amount": "10.0", "unit": "t" } },
      "route": { "amount": "4000.0", "unit": "km" },
      "method": { "vessel_imo_number": "9745225" }
  }
  ```



You can plug those payloads in the following command:

```
curl https://api.lune.co/v1/estimates/shipping \
-H 'Authorization: Bearer <API_KEY>' \
-H 'Content-Type: application/json' \
-X POST \
-d <PAYLOAD>
```


```
POST /estimates/shipping
```


#### Request Body

| Field | Type | Required | Description |
| ----- | ---- | -------- | ------------|
| shipment |  | Y | Either a mass given in kilograms or tonnes (`mass`) or the number of [Twenty-foot Equivalent<br>Units (TEUs)](https://en.wikipedia.org/wiki/Twenty-foot_equivalent_unit) (with their cargo type,<br>optionally). Note that providing `mass` will result in more accurate estimates for methods other<br>than `container_ship`. Estimates using `container_ship` are more precise when the shipment is given<br>in TEUs.<br> |
| route |  | Y | Either the shipping distance or the start/destination address pair. |
| method |  | Y |  |
| country_code | string |  | The three-letter code of the country where the shipping takes place, if applicable.<br><br>Providing this value will improve the estimation process. If the shipping spans<br>multiple countries you can either make multiple per-country estimations or choose<br>the country with the largest share of the route.<br> |


### Responses

**200** Estimation calculated successfully.


#### Response Body

| Field | Type | Required | Description |
| ----- | ---- | -------- | ------------|
| amount | string | Y |  |
| unit | string | Y | Unit, `t` for tonne, `kg` for kilogram |

##### Example
```json
{
    "amount": "40.501",
    "unit": "kg"
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



**503** The service is temporarily unavailable




## Estimate transaction-related emissions

Estimate emissions produced by purchasing goods or services.

`value` and `merchant` tell us what's the value of the transaction and who the goods or services
have been purchased from. `value` should exclude shipping and taxes – if it doesn't, then the
results are likely to be higher than they should be.

`diet`, if provided, will affect the estimates for purchases we determine are food-related.

The value returned is in CO2e – it accounts for both CO2 and non-CO2 emissions.


```
POST /estimates/transactions
```


#### Request Body

| Field | Type | Required | Description |
| ----- | ---- | -------- | ------------|
| value | object | Y |  |
| merchant | object | Y |  |
| diet | string |  | A diet followed by an individual.<br><br>High meat-eater is someone consuming over 100 grams of meat per day, medium is 50-99 grams per day<br>and low is less than 50 grams per day. A fish eater is someone that doesn't consume meat other than<br>fish.<br> |


### Responses

**200** Estimation calculated successfully.


#### Response Body

| Field | Type | Required | Description |
| ----- | ---- | -------- | ------------|
| amount | string | Y |  |
| unit | string | Y | Unit, `t` for tonne, `kg` for kilogram |

##### Example
```json
{
    "amount": "40.501",
    "unit": "kg"
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



**503** The service is temporarily unavailable



