---
sidebar_position: 5
sidebar_label: Pagination
---
import { ApiReferenceSection } from 'lune-ui-lib'
import Snippet  from '@site/src/components/Snippet';

# Pagination

<div className="sections">

<ApiReferenceSection>

<div className="paragraphSections">
<div>

All GET endpoints that return an array of resources are paginated.

Lune supports **cursor-based pagination**. This means that, to get all objects, you must paginate through the results by providing *next_cursor* as the *after* query parameter for subsequent page requests.

Each result includes a *has_more* boolean field. If this is true, then the next page requested will return additional results.

By default, each page returns 10 objects, however, by setting *limit* you can request up to 100 objects.

</div>
</div>

<div className="miniSections">

<Snippet
    header="Request"
    language="bash"
    code={`curl https://api.lune.co/v1/orders?after=24e9a1c3e12fc0a45d08b4a956a626a16862230b&limit=50 \\
  -H "Authorization: Bearer $API_KEY"
`} />

<Snippet
    header="Response"
    language="json"
    code={`{
  "has_more": false,
  "next_cursor": "48601af52aef3968e4730fbf60589e2e2852ed23",
  "data": [
    {
      "id": "34e9a1c3e12fc0a45d08b4a956a626a16862230b",
      ...
    },
    {
      "id": "48601af52aef3968e4730fbf60589e2e2852ed23",
      ...
    }
  ]
}`} />

</div>

</ApiReferenceSection>

</div>
