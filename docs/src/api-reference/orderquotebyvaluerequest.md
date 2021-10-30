---
sidebarDepth: 0
---

## OrderQuoteByValueRequest

Order by Value details

| Field | Type | Description |
| ----- | ---- | ------------|
| value | string<br />_**required**_ | Maximum price of CO2 offsets to purchase (in the account's currency) |
| bundle_selection | array of [BundlePercentageRequest](bundlepercentagerequest.html) | Optional allocation ratios by bundle.<br><br>The sum of all allocation ratios must equal 100.<br><br>If not specified, the preconfigured allocation ratios are going to be used.<br><br>If, for each selection, `percentage` is not provided, the selection is divided equally (best effort) between bundles. `percentage` must be provided for all or none of the bundles.<br> |

##### Example
```json
{
    "value": "7700.00",
    "bundle_selection": [
        {
            "bundle_id": "BmWxrvXo29eGqzA1qjANL5PwnkgaO8R3",
            "percentage": 34
        },
        {
            "bundle_id": "VndoQ0PZjGMzvYOZGwqy6kbgN1eOJx9B",
            "percentage": 66
        }
    ]
}
```
