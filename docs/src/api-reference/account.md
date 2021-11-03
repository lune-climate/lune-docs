---
sidebarDepth: 0
---


## Account



| Field | Type | Description |
| ----- | ---- | ------------|
| id | string<br />_**required**_ | The Account's unique identifier |
| name | string<br />_**required**_ | The Account's name |
| currency | string<br />_**required**_ | The Account's currency |
| balance | string<br />_**required**_ | Account's cash balance.<br><br>Unit: Account currency<br> |
| balance_outstanding | string<br />_**required**_ | The Account's outstanding balance represents the sum of placed and unpaid orders.<br><br>The outstanding balance is mostly negative.<br><br>Unit: Account currency<br> |
| type | string<br />_**required**_<br /><br />Enum: <ul><li>`live`</li><li>`test`</li> </ul> | The account's type.<br><br>See the <a href="#section/Live-and-test-accounts">Live and test accounts section</a> for details.<br> |
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
