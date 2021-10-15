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
    ['link', { rel: 'icon', href: 'https://assets.lune.co/lune-logo-dark.png' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: 'https://github.com/lune-climate/lune-docs',
    logo: 'https://assets.lune.co/lune-logo.svg',
    editLinks: true,
    showEditLink: true,
    smoothScroll: true,
    docsDir: '',
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
          ]
        }
      ],
      '/api-reference/': [
        {
          title: '🚜   API Reference',
          collapsable: false,
          children: [
            '',
            'orders',
            'projects',
            'accounts',
            'activity',
            'bundle-selections',
            'emission-estimates',
            'offset-links',
            'webhooks',
            'webhook-request',
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
