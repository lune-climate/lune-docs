---
sidebar_position: 12
sidebar_label: Changelog
hide_table_of_contents: true
---

# Changelog

In chronological order, here are all changes to the Lune API
### 2024-08-08:
- **Introduced calendar version `2024-08-08`**
- Added the `Lune-Version` header, allowing to choose which API version to use for any endpoint.
### 2024-08-29:
- Added a `region_fallback` parameter to the `listEmissionFactors` API method. The parameterenables clients to request less strict treatments of the existing `region` parameter in thatemission factors from related regions can also be returned.
