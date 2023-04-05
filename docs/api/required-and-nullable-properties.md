---
sidebar_position: 4
sidebar_label: Required and nullable properties
hide_table_of_contents: true
---

# Required and nullable properties

The Lune API, as a general rule, uses `null`s to describe properties that are not defined.

Requests, which take resources with `null` properties, allow clients to omit those properties for convenience.

`nullable` properties in requests are **not-required**.

<br />

Responses, however, never omit `null` properties.

`null` properties in responses are **required**.


## Patch requests

`PATCH` requests behave differently:

* If a property within a resource is set to null, the property is deleted
* If a property within a resource is not set, the property is unaltered
