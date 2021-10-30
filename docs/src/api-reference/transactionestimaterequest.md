---
sidebarDepth: 0
---

## TransactionEstimateRequest

Parameters for estimating emissions associated with purchasing goods or services.

| Field | Type | Description |
| ----- | ---- | ------------|
| value | object<br />_**required**_ |  |
| merchant | object<br />_**required**_ |  |
| diet | string<br /><br />Enum: <ul><li>`high_meat_eater`</li><li>`medium_meat_eater`</li><li>`low_meat_eater`</li><li>`fish_eater`</li><li>`vegetarian`</li><li>`vegan`</li></ul> | A diet followed by an individual.<br><br>High meat-eater is someone consuming over 100 grams of meat per day, medium is 50-99 grams per day<br>and low is less than 50 grams per day. A fish eater is someone that doesn't consume meat other than<br>fish.<br> |

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
