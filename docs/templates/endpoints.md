# {{ tag.name }}

{{{ tag.description }}}

{{#each endpoints }}

## {{ this.summary }}

{{{ this.description }}}

<EndpointParser json="{{ json this }}" />

{{/each}}
