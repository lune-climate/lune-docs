---
sidebarDepth: 0
---


## OrderQuoteByQuantityRequest

Order by Quantity details

| Field | Type | Description |
| ----- | ---- | ------------|
| mass |  object [Mass](mass.html)<br />_**required**_ |  |
| bundle_selection | array of [BundlePercentageRequest](bundlepercentagerequest.html) | Optional allocation ratios by bundle.<br><br>The sum of all allocation ratios must equal 100.<br><br>If not specified, the preconfigured allocation ratios are going to be used.<br><br>If, for each selection, `percentage` is not provided, the selection is divided equally (best effort) between bundles. `percentage` must be provided for all or none of the bundles.<br> |

##### Example
```json
{
    "mass": {
        "amount": "40.501",
        "unit": "kg"
    },
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
