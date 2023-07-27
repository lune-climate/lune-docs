import Snippet  from '@site/src/components/Snippet';
import Tip from '@site/src/components/Tip';
import { ApiReferenceSection } from 'lune-ui-lib'

<ApiReferenceSection>

<div className="paragraphSections">

<div>

## Create a client account


A [client account](/api-reference/client-accounts/create-client-account) is required for each of your clients and defines their basic characteristics, for example, the currency used to display emission offsetting prices.

<Tip>

Store and map the client account id to your client in your database.

</Tip>

Client accounts are optional but recommended for B2B businesses and discouraged for B2C businesses.
Learn about their [benefits](/key-concepts/client-accounts) and [how to use](/key-concepts/live-test-accounts#accounts) either.


</div>
<div>

### Sample request

You can optionally pass in `beneficiary` to link a client account to the legal entity receiving the carbon offset.

</div>
<div>

### Sample response

A successful request will return a unique id, which you will need to pass in later interactions with the Lune API.

**Where**:

- `id` is the unique identifier for each of your clients, which you must map in your code base
- `name` is a name that you will use to identify your client and present offsetting options to
- `currency` defines the currency used to display the price for each offsetting option
- `type` defines the type of account.  Use `test` for your playground
- `beneficiary` is the legal entity shown on the Carbon Offset Certificate and carbon registries

Following a successful response, a client account will be added to your dashboard:

<Tip>

You can access the dedicated client account page by appending the `id` to `/client-account` e.g., `https://dashboard.lune.co/settings/client-accounts/K4enjo9g08vx3MpjnbpPrEZ57XJkDVdb`.

</Tip>

</div>
</div>

<div className="miniSections">

<Snippet
    header="Sample request"
    language="bash"
    code={`curl "https://api.lune.co/v1/accounts/client" \\
  -X POST \\
  -H "Authorization: Bearer $API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '
    {
      "name": "MY TEST COMPANY",
      "currency": "USD",
      "beneficiary": "MY TEST COMPANY INC"
    }'`}
/>

<Snippet
    header="Sample response"
    language="json"
    code={`{
  "id": "K4enjo9g08vx3MpjnbpPrEZ57XJkDVdb",
  "name": "MY TEST COMPANY",
  "currency": "USD",
  "balance": "0",
  "balance_outstanding": "0",
  "type": "test",
  "scope": "client_account",
  "beneficiary": "MY TEST COMPANY INC",
  "organisation_id": "42O097M13DKvo5pmlJYZjmVlGzqJwXbE",
  "bundle_portfolio_id": null,
  "logo": null
}`}
/>

![new-client-account](/img/clientaccounts.png)

</div>
</ApiReferenceSection>
