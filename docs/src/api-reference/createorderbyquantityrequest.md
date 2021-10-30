---
sidebarDepth: 0
---

## CreateOrderByQuantityRequest

Order by Quantity details

| Field | Type | Description |
| ----- | ---- | ------------|
| mass |  object [Mass](Mass)<br />_**required**_ | Mass of CO2 offsets to purchase |
| idempotency_key | string | Optional unique identifier provided by the client.<br><br>`idempotency_key` has two purposes:<br>1. Clients can safely retry order requests without accidentally performing the same operation twice. The current state of the original order is returned.<br>2. Clients can use `idempotency_key` to reconcile orders with other entities on their system.<br> |
| bundle_selection | array of [BundlePercentageRequest](BundlePercentageRequest) | Optional allocation ratios by bundle.<br><br>The sum of all allocation ratios must equal 100.<br><br>If not specified, the preconfigured allocation ratios are going to be used.<br><br>If, for each selection, `percentage` is not provided, the selection is divided equally (best effort) between bundles. `percentage` must be provided for all or none of the bundles.<br> |
| metadata | object | An arbitrary dictionary (key-value pairs) to store application-specific information.<br><br>Lune doesn't use this information for order processing. Its purpose is for the API<br>clients to be able to attach arbitrary information (to an order for example) and<br>then retrieve it.<br> |

##### Example
```json
{
    "mass": {
        "amount": "40.501",
        "unit": "kg"
    },
    "idempotency_key": "5bd808a954e",
    "bundle_selection": [
        {
            "bundle_id": "BmWxrvXo29eGqzA1qjANL5PwnkgaO8R3",
            "percentage": 34
        },
        {
            "bundle_id": "VndoQ0PZjGMzvYOZGwqy6kbgN1eOJx9B",
            "percentage": 66
        }
    ],
    "metadata": {
        "property1": "string",
        "property2": "number"
    }
}
```
