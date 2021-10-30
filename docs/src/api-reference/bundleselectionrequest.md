---
sidebarDepth: 0
---

## BundleSelectionRequest

Optional allocation ratios by bundle.

The sum of all allocation ratios must equal 100.

If not specified, the preconfigured allocation ratios are going to be used.

If, for each selection, `percentage` is not provided, the selection is divided equally (best effort) between bundles. `percentage` must be provided for all or none of the bundles.



##### Example
```json
[
    {
        "bundle_id": "BmWxrvXo29eGqzA1qjANL5PwnkgaO8R3",
        "percentage": 34
    },
    {
        "bundle_id": "VndoQ0PZjGMzvYOZGwqy6kbgN1eOJx9B",
        "percentage": 66
    }
]
```
