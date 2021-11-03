---
sidebarDepth: 0
---


## Bundle



| Field | Type | Description |
| ----- | ---- | ------------|
| id | string<br />_**required**_ | The bundle's unique identifier |
| name | string<br />_**required**_ | The bundle's name |
| unit_price | string<br />_**required**_ | Bundle unit price per tonne CO2<br> |
| currency | string<br />_**required**_ | Currency code |
| primary_image | string | A bundle's image URL |
| primary_image_hires | string | A bundle's high resolution image URL |
| description | string | The bundle's description |
| disabled | boolean<br />_**required**_ | Disabled bundles do not accept orders<br> |
| available_quantity | string | Quantity of CO2 offsets available to purchase (in tonnes).<br><br>If available_quantity is not set, assume there is an unlimited amount of offsets to purchase.<br> |
| projects | array of [ProjectSummary](projectsummary.html)<br />_**required**_ | Array of projects that belong to the bundle |

##### Example
```json
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
```
