# Run the docs app

Ensure you have the right version of `node` installed (see `.nvmrc`).


## nvm

You can use `nvm` to manage node versions.

Check if you have `nvm` already, otherwise install it using one of the following methods:
* `brew install nvm`

Now install the correct node version:

```
nvm install
```

## Start the app

To use the correct node version:

```
nvm use
```

Update dependencies (this is not always needed, but if the app breaks please run it):

```
yarn install
```

To start the documentation app in development mode:

```
yarn start
```

To run production build locally (required for testing search):

```
yarn build && yarn serve
```

## Application

This application is made with Docusaurus:
https://docusaurus.io/

The main structure of the application is:

- `docs`: Contains all the documentation files (generated and manual inserted)
- `src`: Contains all React components, utility methods, index page and global css file.
- `scripts`: Contains scripts needed by the application. Example: parse OpenAPI schema.
- `static`: Contains any static file that is to be exported as is to the website. Images, fonts etc.

## Configuration

Main configuration for the application can be found on `docusaurus.config.js`. For configuration
of things like categories, there is `_category_.json` file created in these folders.

## OpenAPI schema parsing

Currently, parsing is done via a script, `scripts/update-from-remote-schema.ts`.
The script work can be described as:

- Clear previous generated doc files. Everything inside `AllResources` and `CoreResources`
  is removed except the manually inserted category information file (`_category_.json`).
- Read OpenAPI schema and convert it to JSON.
- For each tag in the schema, create the necessary folder and category file while preserving
  the ordering. The linked `x-components` are inserted. This is on `CoreResources`
- For each endpoint in the schema, create the endpoint doc file in the appropriate tag folder.
  In cases where the tag of the endpoint was not present in the previous tags, it is created.
- For each component, create the doc file in `AllResources`.
- Export the full JSON APISchema as ReactContext to `src/components/APISchemaContext.tsx`. This is
  used for derefencing later. We might want to start preprocessing the derefencing, but it's not critical
  so future work.

Each doc file is mostly a simple markdown file that calls either the `Resource` or `Endpoint` React
components that we have. In it, a full JSON is passed with all the necessary information.

## Parameter/Properties parsing

For both Resources and Endpoints, it is necessary to parse the OpenAPI schema to the format the MUI
components expect. For that, we use `src/components/JsonPropertyParser` and
`src/components/ParameterParser`. The main behaviour is to mostly check for types and act accordingly.
This is a recursive parsing approach where dereferencing is always done. The final result is an object
that contains the original information while making sure that the MUI components interface is present.
This usually means the presence of `type`, `name` and `json`/`jsons`.

The `src/components/Endpoint` and `src/components/Resource` components don't do any parsing per se,
but they direct the parsers to the necessary fields and show results accordingly.

## Utilities

There are two utility methods present. `src/components/ResourceExample` and `src/components/Curl`. The
first one creates an example of any schema component based on the parsed object. The second creates a
curl string example given endpoint information, parameters and requestBody. Both of these are used
to present snippets.

## Gated content

Some content is gated to users who have a Lune Dashboard account.

Gated content is symmetrically encrypted and encapsulated into the `<Gated />` or `<GatedMarkdown />` components.

In development, to view gated content set the `docs_publishable_key` cookie as follows:

```
document.cookie = `docs_publishable_key=${encodeURIComponent('SECRET')}`
```

Replace `SECRET` with the publishable key, then refresh the page.

To encrypt or decrypt content use the following two commands, `yarn encrypt-content` and `yarn decrypt-content`, for example:

```
yarn encrypt-content docs/product-and-design-guides/logistics-calculations-methodology.md
yarn decrypt-content docs/product-and-design-guides/logistics-calculations-methodology.md
```

They require the publishable key as `DOCS_PUBLISHABLE_KEY` environment variable.

Both commands can take multiple files as parameters.

To edit gated content:
1. Run `yarn decrypt-content THE_FILE_YOU_ARE_EDITING`
2. Edit the content
3. Run `yarn encrypt-content THE_FILE_YOU_ARE_EDITING`

To add gated content:
1. Add content wrapped in `<!-- BEGIN GATED CONTENT, DO NOT COMMIT THIS AS-IS -->` and
   `<!-- END GATED CONTENT, DO NOT COMMIT THIS AS-IS -->`
2. Run `yarn encrypt-content THE_FILE_YOU_ARE_EDITING`

When making changes do not commit clear text content.
