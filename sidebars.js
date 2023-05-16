/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  mySidebar: [
    {
      type: 'doc',
      label: 'Welcome',
      id: 'index',
    },

    {
      type: 'category',
      label: 'Integration guides',
      items: [

        {
          type: 'category',
          label: '1-step integration',
          link: {
            type: 'doc',
            id: 'guides/one-step-integration',
          },
          items: [
            {
              type: 'link',
              label: 'Overview',
              href: '/guides/one-step-integration#overview',
            },
            {
              type: 'link',
              label: 'Offset your product',
              href: '/guides/one-step-integration#offset-your-product',
            },
            {
              type: 'link',
              label: 'Round up',
              href: '/guides/one-step-integration#round-up',
            },
          ]
        },
        {
          type: 'category',
          label: 'Sustainable logistics',
          link: {
            type: 'doc',
            id: 'guides/integrate-logistics',
          },
          items: [
            {
              type: 'link',
              label: 'Overview',
              href: '/guides/integrate-logistics#overview',
            },
            {
              type: 'link',
              label: 'Create a client account',
              href: '/guides/integrate-logistics#create-a-client-account',
            },
            {
              type: 'link',
              label: 'Calculating CO₂ emissions for a shipment',
              href: '/guides/integrate-logistics#calculating-co-emissions-for-a-shipment',
            },
            {
              type: 'link',
              label: 'Offsetting shipment emissions',
              href: '/guides/integrate-logistics#offsetting-shipment-emissions',
            }
          ]
        },

        {
          type: 'category',
          label: 'Sustainable procurement',
          link: {
            type: 'doc',
            id: 'guides/integrate-procurement',
          },
          items: [
            {
              type: 'link',
              label: 'Overview',
              href: '/guides/integrate-procurement#overview',
            },
            {
              type: 'link',
              label: `Enable suppliers to calculate their product's emissions`,
              href: '/guides/integrate-procurement#enable-suppliers-to-calculate-their-products-emissions'
            },
            {
              type: 'link',
              label: 'Display product emissions',
              href: '/guides/integrate-procurement#display-product-emissions',
            },
            {
              type: 'link',
              label: 'Create a client account',
              href: '/guides/integrate-procurement#create-a-client-account',
            },
            {
              type: 'link',
              label: 'Offset emissions',
              href: '/guides/integrate-procurement#offset-emissions',
            }
          ]
        },

        {
          type: 'category',
          label: 'Payments contribution',
          link: {
            type: 'doc',
            id: 'guides/integrate-payments',
          },
          items: [
            {
              type: 'link',
              label: 'Overview',
              href: '/guides/integrate-payments#overview',
            },
            {
              type: 'link',
              label: 'Create a client account',
              href: '/guides/integrate-payments#create-a-client-account',
            },
            {
              type: 'link',
              label: `Store a client's offsetting decision`,
              href: '/guides/integrate-payments#store-a-clients-offsetting-decision',
            },
            {
              type: 'link',
              label: 'Calculate contribution to CO₂ emission offsetting',
              href: '/guides/integrate-payments#calculate-contribution-to-co-emission-offsetting',
            }
          ]
        },

        {
          type: 'category',
          label: 'Green banking',
          link: {
            type: 'doc',
            id: 'guides/integrate-fintech',
          },
          items: [
            {
              type: 'link',
              label: 'Overview',
              href: '/guides/integrate-fintech#overview',
            },
            {
              type: 'link',
              label: 'Create a client account',
              href: '/guides/integrate-fintech#create-a-client-account',
            },
            {
              type: 'link',
              label: 'Calculate emissions for transactions',
              href: '/guides/integrate-fintech#calculate-emissions-for-transactions',
            },
            {
              type: 'link',
              label: 'Displaying emissions and the cost',
              href: '/guides/integrate-fintech#displaying-emissions-and-the-cost',
            },
            {
              type: 'link',
              label: 'Offset emissions',
              href: '/guides/integrate-fintech#offset-emissions',
            }
          ]
        },

        {
          type: 'category',
          label: 'Share your climate impact',
          link: {
            type: 'doc',
            id: 'guides/share-your-impact',
          },
          items: [
            {
              type: 'link',
              label: 'Overview',
              href: '/guides/share-your-impact#overview',
            },
            {
              type: 'link',
              label: 'Create your own Sustainability page',
              href: '/guides/share-your-impact#create-your-own-sustainability-page',
            },
            {
              type: 'link',
              label: 'Create a Sustainability page for your clients',
              href: '/guides/share-your-impact#create-a-sustainability-page-for-your-clients',
            },
          ]
        },

        {
          type: 'category',
          label: 'Lune Pay',
          link: {
            type: 'doc',
            id: 'guides/lune-pay',
          },
          items: [
            {
              type: 'link',
              label: 'Overview',
              href: '/guides/lune-pay#overview',
            },
            {
              type: 'link',
              label: 'Create a client account',
              href: '/guides/lune-pay#create-a-client-account',
            },
            {
              type: 'link',
              label: 'Generate and embed a Lune Pay URL',
              href: '/guides/lune-pay#generate-and-embed-a-lune-pay-url',
            },
            {
              type: 'link',
              label: 'Handle redirection to your app',
              href: '/guides/lune-pay#handle-redirection-to-your-app',
            },
          ]
        },

        {
          type: 'category',
          label: 'Selecting project bundles',
          link: {
            type: 'doc',
            id: 'guides/selecting-project-bundles'
          },
          items: [
            {
              type: 'link',
              label: 'Overview',
              href: '/guides/selecting-project-bundles#overview'
            },
            {
              type: 'link',
              label: 'Create a client account',
              href: '/guides/selecting-project-bundles#create-a-client-account',
            },
            {
              type: 'link',
              label: 'Fetching project bundles and bundle portfolios',
              href: '/guides/selecting-project-bundles#fetching-project-bundles-and-bundle-portfolios',
            },
            {
              type: 'link',
              label: 'Storing the offsetting selection',
              href: '/guides/selecting-project-bundles#storing-the-offsetting-selection',
            },
          ]
        },


      ],
    },
    {
      type: 'category',
      label: 'Lune API',
      items: [
        {
          type: 'autogenerated',
          dirName: 'api'
        }
      ],
    },
    {
      type: 'category',
      label: 'Resources',
      items: [
        {
          type: 'autogenerated',
          dirName: 'resources',
        },
      ]
    }
  ],
};

module.exports = sidebars
