# Quick start

The Lune API makes it very easy to purchase carbon offsets:

1. [Sign up](https://dashboard.lune.co/signup) to Lune
2. Validate your email
3. Get your [API Key](https://dashboard.lune.co/api-keys) from the dashboard

then:

```sh
curl https://api.lune.co/v1/orders/by-mass \
  -H 'Authorization: Bearer <API_KEY>' \
  -H 'Content-Type: application/json' \
  -X POST \
  -d '{"mass": { "amount": "100.510", "unit": "t"} }'
```

**You've just purchased 100.51 tonnes of Carbon Offsets! 🎉**
