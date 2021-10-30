---
sidebarDepth: 0
---

## Merchant



| Field | Type | Description |
| ----- | ---- | ------------|
| category_code | string<br />_**required**_ | An ISO 18245 Merchant Category Code (leading zeros need to be preserved) corresponding<br>to the transaction.<br><br>See https://github.com/greggles/mcc-codes for available codes.<br> |
| name | string | The name of the merchant. |
| country_code | string<br />_**required**_ | The three-letter code of the merchant's country. |

##### Example
```json
{
    "category_code": "0763",
    "name": "The Corner Store",
    "country_code": "GBR"
}
```
