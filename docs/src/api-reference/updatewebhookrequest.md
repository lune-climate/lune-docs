---
sidebarDepth: 0
---

## UpdateWebhookRequest



| Field | Type | Description |
| ----- | ---- | ------------|
| url | string | An HTTPS URL |
| enabled | boolean | Determines if events should be sent to the webhook or not. Defaults to `true` for newly created<br>webhooks. When updating a webhook and the value is not explicitly specified the existing value<br>will be used.<br> |

##### Example
```json
{
    "url": "string",
    "enabled": "boolean"
}
```
