---
sidebarDepth: 0
---

## OffsetLinkRequest



| Field | Type | Description |
| ----- | ---- | ------------|
| name | string<br />_**required**_ | Offset link name.<br><br>This is a human readable name to recognise and distingish different offset links.<br> |
| title | string | Offset link title<br><br>This is the title that appears on the first screen of the offset links flow.<br> |
| description | string | Offset link description<br><br>This is the description that appears on the first screen of the offset links flow.<br> |
| bundles | array | The bundle ids selected for use through the particular offset link. |
| value | string | An amount of money (the fractional part is optional) |
| emails | array | The email addresses of users that are allowed to use the offset link. |
| expires_at | string | An <a href="https://pretty-rfc.herokuapp.com/RFC3339">RFC 3339</a>-formatted timestamp. |
| use_logo | boolean<br />_**required**_ | Whether to include the Offset link logo (defined in Account settings) in the footer.<br> |
| require_payment | boolean | If true, the user of the Offset Link is required to pay by credit/debit card.<br> |

##### Example
```json
{
    "name": "Marketing Campaign July 2021",
    "title": "string",
    "description": "string",
    "bundles": [
        "string"
    ],
    "value": "3.14",
    "emails": [
        "john@doe.com"
    ],
    "expires_at": "1985-04-12T23:20:50.52Z",
    "use_logo": "boolean",
    "require_payment": "boolean"
}
```
