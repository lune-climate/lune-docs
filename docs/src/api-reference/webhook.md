---
sidebarDepth: 0
---


## Webhook



| Field | Type | Description |
| ----- | ---- | ------------|
| id | string<br />_**required**_ | The webhook's identifier |
| url | string<br />_**required**_ | An HTTPS URL |
| enabled | boolean<br />_**required**_ | Determines if events should be sent to the webhook or not. |
| secret | string<br />_**required**_ | The secret key used to generate the webhook payload HMAC. |

##### Example
```json
{
    "id": "ljmkOq7vXd239gAE9WALWQ8ZGVD5ExNz",
    "url": "string",
    "enabled": "boolean",
    "secret": "string"
}
```
