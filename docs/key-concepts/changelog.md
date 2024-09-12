---
sidebar_position: 13
sidebar_label: Changelog
hide_table_of_contents: true
---

# Changelog

In chronological order, here are all changes to the Lune API

## 2024-08-08

** August 29, 2024 **

Added a `region_fallback` parameter to the `listEmissionFactors` API method. The parameter
enables clients to request less strict treatments of the existing `region` parameter in that
emission factors from related regions can also be returned.

** August 8, 2024 **

Added the `Lune-Version` header, allowing to choose which API version to use for any endpoint.

