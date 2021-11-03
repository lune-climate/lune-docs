---
sidebarDepth: 0
---


## Project



| Field | Type | Description |
| ----- | ---- | ------------|
| id | string<br />_**required**_ | The projects's unique identifier |
| name | string<br />_**required**_ | The project's name |
| short_name | string<br />_**required**_ | The project's short name. May coincide with name. |
| slug | string<br />_**required**_ | Project slug |
| description | string<br />_**required**_ | Project description |
| project_type | string<br />_**required**_ | The project's offset type, eg Forest conservation, Afforestation, Direct Air Capture |
| registry_name | string<br />_**required**_ | The project's Verification Standard Entity name or equivalent organization. |
| registry_link | string | A link to the registry's project details page. |
| latitude | number<br />_**required**_ | Latitude |
| longitude | number<br />_**required**_ | Logitude |
| country_name | string<br />_**required**_ | The project's country |
| country_code | string<br />_**required**_ | The project's 3 character country code |
| region | string | The project's region |
| primary_image | string | A project image URL |
| thumbnail_image | string | A project thumbnail image URL |
| results | array | Project results |
| un_sdg | array | UN Sustainable Development Goals.<br><br>Each number in the array represent one UN Sustainable Development Goal. See https://sdgs.un.org/goals.<br> |
| disabled | boolean<br />_**required**_ | Disabled projects do not get allocated to orders<br> |
| bundles | array of [BundleSummary](bundlesummary.html)<br />_**required**_ | Array of bundles the project is part of |

##### Example
```json
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
    "disabled": false,
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
            "available_quantity": "1000.09"
        }
    ]
}
```
