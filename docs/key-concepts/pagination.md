---
sidebar_position: 5
sidebar_label: Pagination
---

# Pagination

All GET endpoints that return an array of resources are paginated.

Lune supports cursor-based pagination. This means that, to get all objects, you must paginate through the results by providing the last resource id as a *after* query parameter.

Each result includes a *has_more* boolean field. If this is true, then the next page requested will return additional results.

By default, each page returns 10 objects, however, by setting *limit* you can request up to 100 objects.
