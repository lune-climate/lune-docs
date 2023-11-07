---
sidebar_position: 2
hide_table_of_contents: true
---
import { ApiReferenceSection } from 'lune-ui-lib'
import Snippet  from '@site/src/components/Snippet';

# Errors

<div className="sections">

<ApiReferenceSection>

<div className="paragraphSections">
<div>


All requests and responses are validated against the [OpenAPI spec](/openapi.yml).

Requests that have been successfully processed return 2xx HTTP status codes.

Most types of error status codes (HTTP 400, 401, 403 etc.) contain a machine-friendly `error_code` and a human-readable error `message`.

Notable exceptions:
* HTTP 404: resource not found, we have nothing to add
* HTTP 500: we were not expecting errors therefore we have nothing to add

You can find a list of `error_code`s  in the [OpenAPI spec](/openapi.yml).

Error codes are defined in a way that balances precision (supporting handling specific error conditions) with redundancy (if we wanted to define an error code for every single thing the list would be huge and handling similar errors would be very tedious).

Responses contain a `CF-Ray` header that can be reported to Lune to help with tracking down issues.

</div>
<div>

## How to handle errors

* A response with an error code – handle according to the response’s error message
* No error code and HTTP 5xx – should not happen, unexpected error. Safe to retry
* Connection error or timeout error – feel free to retry the same request
  * Some API endpoints, like creating an order, employ safety mechanisms (idempotency keys) to prevent creating redundant orders.


</div>
</div>

<div className="miniSections">

<Snippet
    header="Example"
    language="json"
    code={`{
  "error": {
    "error_code": "order_quantity_invalid"
    "message": "Order quantity must be positive.",
  }
}`} />

<Snippet
    header="Example"
    language="json"
    code={`{
  "error": {
    "error_code": "validation_error",
    "message": "Provided data does not match the defined schema.: .body.shipment.mass.amount should match pattern \"^[0-9]+(\\.[0-9]+)?$\", .body.shipment.containers should have required property 'containers', .body.shipment.mass.amount should match pattern \"^[0-9]+(\\.[0-9]+)?$\", .body.shipment should match exactly one schema in oneOf"
  }
}`} />

<Snippet
    header="Example"
    language="json"
    code={`{
  "error": {
    "error_code": "address_not_found",
    "message": "The source address could not be found"
  }
}`} />

</div>

</ApiReferenceSection>

</div>
