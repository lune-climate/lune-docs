---
hide_table_of_contents: true
---

import LuneApiSection from '@site/src/md/luneapi.md';
import ApiKeySection from '@site/src/md/apikey.md';
import RowTable from '@site/src/md/logistics-sheet-row.mdx';
import ResultsTable from '@site/src/md/logistics-sheet-row-results.mdx';
import ClientAccountSection from '@site/src/md/clientaccount.md';
import Snippet  from '@site/src/components/Snippet';
import Tip from '@site/src/components/Tip';
import { ApiReferenceSection } from 'lune-ui-lib'

# Logistics CSV spreadsheet calculations

<div className="sections">

<ApiReferenceSection>
<div className="paragraphSections">

<div>

## Overview

In this guide, you will learn how to calculate emissions for shipments by:
* filling and uploading a CSV spreadsheet

This guide has been updated to reflect **version 2 of spreadsheet calculations**. However, we still support version 1
spreadsheets.

</div>
<div>

## Who is this guide for?

This guide is aimed at Sustainability Specialists or Product Managers.

Feel free to contact our [support team](mailto:support@lune.com) if you encounter any issues.

<br />

<Tip>

Calculations will count towards your tier limit, one per row.


</Tip>

</div>

</div>

<>

![logistics-csv-upload](/img/logistics-sheets-overview.png)

</>
</ApiReferenceSection>

<ApiReferenceSection>

<div className="paragraphSections">

<div>

## Download CSV template

Navigate to the [logistics spreadsheet calculation](https://dashboard.lune.co/calculate-emissions/logistics-sheets) page.

Click on the 'Download CSV template' button to download the template.

There are 4 templates, one for every transport mode we support: rail, sea, road & air. Templates contain sample data.
Amend and/or delete rows to fit your data. Combine the different transport modes into a shipment's legs for more
complex journeys.

Do not delete the header row.

To test the flow, feel free to upload the template and see results.

</div>
</div>

<>

![Download CSV template](/img/logistics-sheets-download-csv-template.png)

</>

</ApiReferenceSection>

<ApiReferenceSection>

<div className="paragraphSections">

<div>

## CSV format

Populate the CSV sheet using your preferred editor.

Ensure to save the file as csv with a `.csv` extension.

You may either omit or leave blank non-required columns.

Each row may contain up to 10 legs, only one leg is required. All legs have the same format, the table below describes all legs for correctness.

<br />

<Tip>

Files up to 2MB are supported

</Tip>

</div>
<div>

### What to input?

Required inputs are:

1. Route or distance
2. Cargo weight
3. Transport mode

In addition, a value for **version** is required and must be set to `2`.

<br />

#### Route or distance

**Route**

For shipment origin/destination, fill the **source** and eac **leg{x}_destination** column with one of the location types below:

- A comma-seperated address, ending with a country code. Where the country code is a 3-letter ISO 3166 country code.
This cannot be a country code alone, you must provide more than one address line.

    
    Examples:
    Apple Lane, London, SW1A 2AA, GBR
    Ontario, CAN


- A UN LOCODE. For a full list of options [https://unece.org/trade/cefact/unlocode-code-list-country-and-territory](https://unece.org/trade/cefact/unlocode-code-list-country-and-territory).
- An IATA or ICAO airport code
- Geographical coordinates formatted as `lat <number> lon <number>`.


    Example:
    lat 12.33 lon -91.21

**Distance**

Input the distance in km in the column for `leg1_distance_km`. If you have distance data, you can use it *instead of* Route.

<br />

#### Cargo weight

Input either cargo weight in kg or in TEU, or both.
- `mass_kg`: cargo weight in kilograms
- `containers`: number of TEU (Twenty-foot Equivalent Units)

<br />

#### Transport mode

The transport method for the first leg is entered in `leg1_method` or `leg1_vessel_identification` or `leg1_flight_number`.

- `leg1_method`: Must be in Lune’s accepted format. See the list of available transport methods in the [Reference](#reference) below. Examples: `cargo_plane`, `container_ship`, `diesel_truck`, `truck_articulated_40t.`
- `leg1_vessel_identification`: The vessel's [IMO number](https://en.wikipedia.org/wiki/IMO_number) *without* the `IMO` prefix or a vessel name. When an identifier is provided, the leg's method is ignored.

<br />

The same format applies to `let2_method`, `leg3_method`, and so on.

</div>
<div>

### Reference

<RowTable />


</div>
</div>

<>

</>

</ApiReferenceSection>

<ApiReferenceSection>

<div className="paragraphSections">

<div>

## Upload and wait for results

Once you've filled the sheet, [drop the file](https://dashboard.lune.co/calculate-emissions/logistics-sheets) in the appropriate box.

Depending on the size, it may take a few minutes to process the sheet.

You'll receive an email when the results are ready.

Please follow the link in your email to download the results.

<br />

<Tip>

We apply your API rate limit when processing a sheet.

</Tip>

</div>
<div>

### Results

The following columns are added to the columns provided by you.

<ResultsTable />


</div>
</div>

<>

![logistics-csv-drop](/img/logistics-sheets-drop.png)

![logistics-csv-email](/img/logistics-sheets-email.png)

</>

</ApiReferenceSection>

</div>
