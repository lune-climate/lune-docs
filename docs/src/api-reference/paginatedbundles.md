---
sidebarDepth: 0
---

## PaginatedBundles



| Field | Type | Description |
| ----- | ---- | ------------|
| has_more | boolean<br />_**required**_ | Whether or not there are more elements available after this set. If false, this set comprises the end of the array. |
| data | array of [Bundle](Bundle)<br />_**required**_ | Paginated Bundle objects |

##### Example
```json
{
    "has_more": "boolean",
    "data": [
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
    ]
}
```
