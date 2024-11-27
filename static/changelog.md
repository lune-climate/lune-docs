# [New Version] `2024-08-08` - 2024-08-08

## [Non-Breaking Change] - 2024-09-23
Added the new `smart-scan` endpoint. The endpoint enables clients to create emission estimates
with unstructured data. Lune will attempt to parse whatever information is available and create
the appropriate emission estimate.

## [Non-Breaking Change] - 2024-08-29
Added a `region_fallback` parameter to the `listEmissionFactors` API method. The parameter
enables clients to request less strict treatments of the existing `region` parameter in that
emission factors from related regions can also be returned.

## [Non-Breaking Change] - 2024-08-08
Added the `Lune-Version` header, allowing to choose which API version to use for any endpoint.
