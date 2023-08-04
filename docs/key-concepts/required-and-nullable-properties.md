---
sidebar_position: 4
hide_table_of_contents: true
---
import { ApiReferenceSection } from 'lune-ui-lib'
import Snippet  from '@site/src/components/Snippet';

# Required and nullable properties

<div className="sections">

<ApiReferenceSection>

<div className="paragraphSections">
<div>


The Lune API, as a general rule, uses `null`s to describe properties that are not defined.

Requests, which take resources with `null` properties, allow clients to omit those properties for convenience.

`nullable` properties in requests are **not-required**.

<br />

Responses, however, never omit `null` properties.

`null` properties in responses are **required**.

</div>
<div>

## Patch requests

`PATCH` requests behave as follows:

* If a property within a resource is set to `null`, the property is deleted
* If a property within a resource is not set, the property is unaltered

</div>
</div>

<div className="miniSections">

<Snippet
    header="Request"
    language="json"
    code={`{
  "id": "34e9a1c3e12fc0a45d08b4a956a626a16862230b",
  "required_property": "foo"
}
// or
{
  "id": "34e9a1c3e12fc0a45d08b4a956a626a16862230b",
  "required_property": "foo",
  "optional_property": null
}`} />

<Snippet
    header="Response"
    language="json"
    code={`{
  "id": "34e9a1c3e12fc0a45d08b4a956a626a16862230b",
  "required_property": "foo",
  "optional_property": null // is never omitted
}`} />

</div>

</ApiReferenceSection>

</div>
