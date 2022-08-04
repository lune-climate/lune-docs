---
sidebar_position: 8
sidebar_label: Content type
---

# Content type

It's assumed that the incoming requests contain `application/json` payloads, so you can either explicitly
send the `Content-Type` header set to `application/json` or just skip the header altogether. Setting the
header to a value different from `application/json` will result in an HTTP 415 Unsupported Media Type
error.

The responses are returned using JSON with the appropriate `Content-Type` value (`application/json`)
unless specified otherwise.
