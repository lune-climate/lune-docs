---
sidebarDepth: 0
---

## Address



| Field | Type | Description |
| ----- | ---- | ------------|
| street_line1 | string<br />_**required**_ | A street and house number (or equivalent). |
| street_line2 | string | An address component more precise than a street and house number. |
| postcode | string<br />_**required**_ | The postal code in the format specific to the country it's in |
| city | string<br />_**required**_ |  |
| country_code | string<br />_**required**_ | A three-letter country code. |

##### Example
```json
{
    "street_line1": "1 Hollow Road",
    "street_line2": "Apartment 2",
    "postcode": "99 210",
    "city": "Ledville",
    "country_code": "GBR"
}
```
