---
sidebar_position: 4
sidebar_label: Order lifecycle
hide_table_of_contents: true
---
import { ApiReferenceSection } from 'lune-ui-lib'

# Order status and lifecycle


<div className="sections">

<ApiReferenceSection>

<div className="paragraphSections">

<div>

Orders have statuses and follow a precise lifecycle:

**Received**: Order has been received by Lune, but has not been processed

**Placed**: Order has been placed against `Bundles`

**Paid**: Order has been paid

**Retiring**: Order has credits partially [allocated or retired](https://www.notion.so/luneco/Explaining-the-difference-in-carbon-credit-retirement-timelines-83d6a39105c049b0859eb7399dd7942e). The order's certificate is issued

**Complete**: Order has been fully retired. The order's certificate includes all retired credits

**Cancelled**: Order has been cancelled by user request

**Failed**: Order failed to process

</div>
<div>

## Retirement

Retirements are performed in discrete tonnes.

Orders for fractional tonne offsets are aggregated on a first-come-first-serve basis and retired as soon as their combined quantities reach 1 tCO2.

Aggregation occurs for orders belonging to the same account and beneficiary.

</div>
</div>

<>

![Order statuses](/img/order-statuses.png)

</>

</ApiReferenceSection>

</div>
