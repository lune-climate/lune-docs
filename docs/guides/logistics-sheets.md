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

![Sustainability page](/img/sustainability-page.png)

</>
</ApiReferenceSection>

<ApiReferenceSection>

<div className="paragraphSections">

<div>

## Download CSV template

Navigate to the [logistics spreadsheet calculation](https://dashboard.lune.co/calculate-emissions/logistics-sheets) page.

Click on the 'Download CSV template' button to download the template.

The template contains sample data. Amend and/or delete rows to fit your data.

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

<RowTable />


</div>
</div>

<>

![Download CSV template](/img/logistics-sheets-download-csv-template.png)

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

#### Results

The following columns are added to the columns provided by you.

<ResultsTable />


</div>
</div>

<>

![Download CSV template](/img/logistics-sheets-download-csv-template.png)

</>

</ApiReferenceSection>

</div>
