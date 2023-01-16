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

**Retiring**: Order has been partially or fully allocated but has not yet been fully retired

**Complete**: Order has been retired

**Cancelled**: Order has been cancelled by user request

**Failed**: Order failed to process

</div>
</div>

<>

![Order statuses](/img/order-statuses.png)

</>

</ApiReferenceSection>

</div>
