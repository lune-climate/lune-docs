const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Documentation',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['script', { defer: true, dataDomain: 'docs.lune.co', src: 'https://plausible.io/js/plausible.js' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: 'https://github.com/lune-climate/lune-docs',
    logo: '/lune-vsmall.jpg',
    editLinks: true,
    showEditLink: true,
    smoothScroll: true,
    docsDir: 'docs/src',
    lastUpdated: true,
    navbar: true,
    nav: [
      {
        text: 'Guides',
        link: '/guides/',
      },
      {
        text: 'API Reference',
        link: '/api-reference/'
      },
    ],
    sidebar: {
      '/guides/': [
        {
          title: '📒 Guides',
          collapsable: false,
          children: [
            'one-percent-contribution-towards-carbon-removal',
            'download-completion-certificate',
            'customer-project-bundle-selection',
            'offset-checkout-delivery-emissions',
            'subaccounts-management',
          ]
        }
      ],
      '/api-reference/': [
        {
          title: '💡 API Reference',
          collapsable: false,
          children: [
            '',
            'api-reference',
          ]
        },
        {
          title: '🚜 API Endpoints',
          collapsable: false,
          children: [
            '',
            'endpoints-orders',
            'endpoints-projects',
            'endpoints-accounts',
            'endpoints-client-accounts',
            'endpoints-activity',
            'endpoints-bundle-selections',
            'endpoints-emission-estimates',
            'endpoints-offset-links',
            'endpoints-webhooks',
            'endpoints-webhook-request',
          ]
        },
        {
          title: '🦸 Core Resources',
          collapsable: false,
          children: [
            'account',
            'activity',
            'analytics',
            'bundle',
            'error',
            'offsetlink',
            'order',
            'project',
            'webhook',
            'webhookevent',
          ]
        },
        {
          title: '🗂 All Resources',
          collapsable: true,
          children: [
            'account',
            'activity',
            'address',
            'airportcode',
            'airportsourcedestination',
            'analytics',
            'bundle',
            'bundlepercentage',
            'bundlepercentagerequest',
            'bundleselection',
            'bundleselectionrequest',
            'bundlesummary',
            'cabinclass',
            'containershippingmethod',
            'createorderbyquantityrequest',
            'createorderbyvaluerequest',
            'createwebhookrequest',
            'currencycode',
            'diet',
            'distance',
            'electricityconsumption',
            'electricityestimaterequest',
            'error',
            'errors',
            'flightestimaterequest',
            'hugeoiltankerseashippingmethod',
            'iatacode',
            'icaocode',
            'identifiedvesselshippingmethod',
            'mass',
            'merchant',
            'metadata',
            'monetaryamount',
            'money',
            'offsetlink',
            'offsetlinkanalytics',
            'offsetlinkorder',
            'offsetlinkrequest',
            'offsetlinkstatus',
            'offsetquantityseriesitem',
            'offsetvalueseriesitem',
            'order',
            'orderbase',
            'orderbundle',
            'orderbyquantity',
            'orderbyvalue',
            'orderproject',
            'orderquotebase',
            'orderquotebyquantity',
            'orderquotebyquantityrequest',
            'orderquotebyvalue',
            'orderquotebyvaluerequest',
            'paginatedactivity',
            'paginatedbase',
            'paginatedbundles',
            'paginatedoffsetlinks',
            'paginatedorders',
            'paginatedprojects',
            'project',
            'projectsummary',
            'roroseashippingmethod',
            'seashippingmethod',
            'shipment',
            'shippingestimaterequest',
            'shippingmethod',
            'simpleshippingmethod',
            'sourcedestination',
            'timestamp',
            'transactionestimaterequest',
            'updatewebhookrequest',
            'url',
            'variablefuelseashippingmethod',
            'variablefuelvariableloadseashippingmethod',
            'webhook',
            'webhookevent',
            'webhookrequest',
          ]
        }
      ],
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
  ]
}
