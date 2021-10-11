# Quick start

```sh
curl https://api.lune.co/v1/orders/by-mass \
  -H 'Authorization: Bearer <API_KEY>' \
  -H 'Content-Type: application/json' \
  -X POST \
  -d '{"mass": { "amount": "100.510", "unit": "t"} }'
```
