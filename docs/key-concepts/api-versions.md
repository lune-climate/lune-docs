---
sidebar_position: 13
sidebar_label: API versions
---

# API versions

The Lune API uses calendar versioning to introduce breaking changes over time. You can specify which version to use by using a request header.

To determine which version to use to process a request, Lune uses the following logic in order:
1. Use the version specified in `Lune-Version`
2. Use the organisation pinned version if existent. This is set on the first API request of the organisation.
3. Use the latest API version.

Lune sends a `Lune-Version` header which contains the value of the version used to process the request.

For a full list of versions and all introduced changes in the API see [Changelog](/key-concepts/changelog)
