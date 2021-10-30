---
sidebarDepth: 0
---

## OffsetLink



| Field | Type | Description |
| ----- | ---- | ------------|
| id | string<br />_**required**_ | The offset link identifier |
| name | string<br />_**required**_ | Offset link name.<br><br>This is a human readable name to recognise and distingish different offset links.<br> |
| title | string | Offset link title<br><br>This is the title that appears on the first screen of the offset links flow.<br> |
| description | string | Offset link description<br><br>This is the description that appears on the first screen of the offset links flow.<br> |
| logo | string | Offset link logo URL<br><br>This is the logo URL that appears on the first screen of the offset links flow.<br> |
| use_logo | boolean<br />_**required**_ | Whether to include the Offset link logo (defined in Account settings) in the footer.<br> |
| url | string<br />_**required**_ | The actual offset link URL that can be used to place orders |
| value | string | An amount of money (the fractional part is optional) |
| currency | string | ISO 4217 3 character currency code.<br><br>Note: Lune does not support all currency codes.<br> |
| emails | array | The email addresses of users that are allowed to use the offset link. |
| bundles | array of [Bundle](bundle.html) | Bundle objects |
| created_at | string<br />_**required**_ | An <a href="https://pretty-rfc.herokuapp.com/RFC3339">RFC 3339</a>-formatted timestamp. |
| status | string<br />_**required**_<br /><br />Enum: <ul><li>`enabled`</li><li>`disabled`</li></ul> |  |
| expires_at | string | An <a href="https://pretty-rfc.herokuapp.com/RFC3339">RFC 3339</a>-formatted timestamp. |
| require_payment | boolean<br />_**required**_ | If true, the user of the Offset Link is required to pay by credit/debit card.<br> |

##### Example
```json
{
    "id": "UwjfkXjfksoHXzA1qjANL58GhjwqkxpB",
    "name": "Marketing Campaign July 2021",
    "title": "string",
    "description": "string",
    "logo": "string",
    "use_logo": "boolean",
    "url": "https://links.lune.co/ds234cAd",
    "value": "3.14",
    "currency": "string",
    "emails": [
        "john@doe.com"
    ],
    "bundles": [
        {
            "id": "BmWxrvXo29eGqzA1qjANL5PwnkgaO8R3",
            "name": "Latin America Forestry",
            "unit_price": "6.09",
            "currency": "GBP",
            "primary_image": "https://assets.lune.co/bundles/latin-america-forestry.png",
            "primary_image_hires": "https://assets.lune.co/bundles/latin-america-hires.jpg",
            "description": "A conglomeration of renewable energy projects around the world",
            "disabled": false,
            "available_quantity": "1000.09",
            "projects": [
                {
                    "id": "owda1kVEl60jnPykZeADr57Z8OqbKMXx",
                    "name": "Alto Mayo",
                    "short_name": "Alto Mayo",
                    "slug": "alto-mayo",
                    "description": "string",
                    "project_type": "Forest conservation",
                    "registry_name": "Verified Carbon Standard",
                    "registry_link": "https://registry.verra.org/app/projectDetail/VCS/1566",
                    "latitude": "-5.87798",
                    "longitude": "-77.612352",
                    "country_name": "Peru",
                    "country_code": "string",
                    "region": "Huancavelica",
                    "primary_image": "https://assets.lune.co/projects/Alto+Mayo+1.png",
                    "thumbnail_image": "https://assets.lune.co/projects/Alto+Mayo+1_thumbnail.png",
                    "results": [
                        "Reduced deforestation of 75% from baseline levels, the first time a project in Peru reaches such high results",
                        "Co-benefits include: poverty reduction across local communities, education around sustainable farming, conservation of biodiversity"
                    ],
                    "un_sdg": [
                        1,
                        4,
                        8,
                        13,
                        15
                    ],
                    "disabled": false
                }
            ]
        }
    ],
    "created_at": "1985-04-12T23:20:50.52Z",
    "status": "enabled",
    "expires_at": "1985-04-12T23:20:50.52Z",
    "require_payment": "boolean"
}
```
