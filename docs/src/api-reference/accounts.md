

# Accounts

Get account


## Get account

Returns the account linked to the API Key.

One account object is returned.


```
GET /accounts
```



### Responses

**200** The response returns an account

#### Response Body

| Field | Type | Required | Description |
| ----- | ---- | -------- | ------------|
| id | string | Y | The Account's unique identifier |
| name | string | Y | The Account's name |
| currency | string | Y | The Account's currency |
| balance | string | Y | Account's cash balance.<br><br>Unit: Account currency<br> |
| balance_outstanding | string | Y | The Account's outstanding balance represents the sum of placed and unpaid orders.<br><br>The outstanding balance is mostly negative.<br><br>Unit: Account currency<br> |
| type | string | Y | The account's type.<br><br>See the <a href="#section/Live-and-test-accounts">Live and test accounts section</a> for details.<br> |
| logo | string |  | Offset link logo URL<br><br>This is the logo URL that appears on the first screen of the offset links flow.<br> |

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



