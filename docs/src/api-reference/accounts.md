



# Accounts




## Get account

Returns the account linked to the API Key.

One account object is returned.


```
GET /accounts
```



### Responses

**200** The response returns an account

#### Response Body [Account](Account):

| Field | Type | Description |
| ----- | ---- | ------------|
| id | string<br />_**required**_ | The Account's unique identifier |
| name | string<br />_**required**_ | The Account's name |
| currency | string<br />_**required**_ | The Account's currency |
| balance | string<br />_**required**_ | Account's cash balance.<br><br>Unit: Account currency<br> |
| balance_outstanding | string<br />_**required**_ | The Account's outstanding balance represents the sum of placed and unpaid orders.<br><br>The outstanding balance is mostly negative.<br><br>Unit: Account currency<br> |
| type | string<br />_**required**_<br /><br />Enum: <ul><li>`live`</li><li>`test`</li></ul> | The account's type.<br><br>See the <a href="#section/Live-and-test-accounts">Live and test accounts section</a> for details.<br> |
| logo | string | Offset link logo URL<br><br>This is the logo URL that appears on the first screen of the offset links flow.<br> |

##### Example
```json
{
    "id": "ljmkOq7vXd239gAE9WALWQ8ZGVD5ExNz",
    "name": "Acme Corporation",
    "currency": "GBP",
    "balance": "23.50",
    "balance_outstanding": "-132.50",
    "type": "live",
    "logo": "string"
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



