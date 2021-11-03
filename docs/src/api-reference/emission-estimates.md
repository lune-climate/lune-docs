



# Emission estimates

Estimate CO2 emissions (caused by shipping goods for example).


## Estimate electricity emissions

Estimate emissions produced by electricity consumption.

The value returned is in CO2e – it accounts for both CO2 and non-CO2 emissions.


```
POST /estimates/electricity
```


#### Request Body [ElectricityEstimateRequest](electricityestimaterequest.html):

| Field | Type | Description |
| ----- | ---- | ------------|
| consumption |  object [ElectricityConsumption](electricityconsumption.html)<br />_**required**_ |  |
| country_code | string | The three-letter code of the country where the consumption takes place, if applicable.<br><br>Providing this value will improve the estimation process. If the value is not provided<br>the global average will be used.<br> |

##### Example
```json
{
    "consumption": {
        "amount": "40.501",
        "unit": "MWh"
    },
    "country_code": "string"
}
```

### Responses

**200** Estimation calculated successfully.


#### Response Body [Mass](mass.html):

| Field | Type | Description |
| ----- | ---- | ------------|
| amount | string<br />_**required**_ |  |
| unit | string<br />_**required**_<br /><br />Enum: <ul><li>`kg`</li><li>`t`</li></ul> | Unit, `t` for tonne, `kg` for kilogram |

##### Example
```json
{
    "amount": "40.501",
    "unit": "kg"
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



**503** The service is temporarily unavailable




## Estimate flight emissions

Estimate emissions produced by passengers in a commercial airflight.

The value returned is in CO2e – it accounts for both CO2 and non-CO2 emissions.


```
POST /estimates/flight
```


#### Request Body [FlightEstimateRequest](flightestimaterequest.html):

| Field | Type | Description |
| ----- | ---- | ------------|
| route | <br />_**required**_ | Either the flying distance or the start/destination airport code (ICAO or IATA). |
| cabin_class |  object [CabinClass](cabinclass.html) |  |
| passengers | number | Number of passengers the calculation should be applied to.<br>This parameter defaults to 1. |

##### Example
```json
{
    "route": {
        "amount": "40.501",
        "unit": "km"
    },
    "cabin_class": "string",
    "passengers": "number"
}
```

### Responses

**200** Estimation calculated successfully.


#### Response Body [Mass](mass.html):

| Field | Type | Description |
| ----- | ---- | ------------|
| amount | string<br />_**required**_ |  |
| unit | string<br />_**required**_<br /><br />Enum: <ul><li>`kg`</li><li>`t`</li></ul> | Unit, `t` for tonne, `kg` for kilogram |

##### Example
```json
{
    "amount": "40.501",
    "unit": "kg"
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


#### Request Body [ShippingEstimateRequest](shippingestimaterequest.html):

| Field | Type | Description |
| ----- | ---- | ------------|
| shipment |  object [Shipment](shipment.html)<br />_**required**_ |  |
| route | <br />_**required**_ | Either the shipping distance or the start/destination address pair. |
| method |  object [ShippingMethod](shippingmethod.html)<br />_**required**_ |  |
| country_code | string | The three-letter code of the country where the shipping takes place, if applicable.<br><br>Providing this value will improve the estimation process. If the shipping spans<br>multiple countries you can either make multiple per-country estimations or choose<br>the country with the largest share of the route.<br> |

##### Example
```json
{
    "shipment": {
        "mass": {
            "amount": "40.501",
            "unit": "kg"
        }
    },
    "route": {
        "amount": "40.501",
        "unit": "km"
    },
    "method": "string",
    "country_code": "string"
}
```

### Responses

**200** Estimation calculated successfully.


#### Response Body [Mass](mass.html):

| Field | Type | Description |
| ----- | ---- | ------------|
| amount | string<br />_**required**_ |  |
| unit | string<br />_**required**_<br /><br />Enum: <ul><li>`kg`</li><li>`t`</li></ul> | Unit, `t` for tonne, `kg` for kilogram |

##### Example
```json
{
    "amount": "40.501",
    "unit": "kg"
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


#### Request Body [TransactionEstimateRequest](transactionestimaterequest.html):

| Field | Type | Description |
| ----- | ---- | ------------|
| value |  object [MonetaryAmount](monetaryamount.html)<br />_**required**_ |  |
| merchant |  object [Merchant](merchant.html)<br />_**required**_ |  |
| diet |  object [Diet](diet.html) |  |

##### Example
```json
{
    "value": {
        "value": "3.14",
        "currency": "string"
    },
    "merchant": {
        "category_code": "0763",
        "name": "The Corner Store",
        "country_code": "GBR"
    },
    "diet": "string"
}
```

### Responses

**200** Estimation calculated successfully.


#### Response Body [Mass](mass.html):

| Field | Type | Description |
| ----- | ---- | ------------|
| amount | string<br />_**required**_ |  |
| unit | string<br />_**required**_<br /><br />Enum: <ul><li>`kg`</li><li>`t`</li></ul> | Unit, `t` for tonne, `kg` for kilogram |

##### Example
```json
{
    "amount": "40.501",
    "unit": "kg"
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



**503** The service is temporarily unavailable



