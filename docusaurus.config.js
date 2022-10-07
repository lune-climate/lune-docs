// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')
require('dotenv').config()

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Lune Docs',
    tagline: 'Learn how to use Lune to make your product or service climate positive',
    url: 'https://docs.lune.co',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.png',

    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    customFields: {
        DASHBOARD_DOMAIN: process.env.REACT_APP_DASHBOARD_DOMAIN,
        API_DOMAIN: process.env.REACT_APP_API_DOMAIN,
    },

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            {
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    routeBasePath: '/',
                    // We don't use category indexes, and we have files with the same name as
                    // the category that we don't want to be treated as indexes. Fully disable these.
                    async sidebarItemsGenerator({
                        isCategoryIndex: defaultCategoryIndexMatcher, // The default matcher implementation, given below
                        defaultSidebarItemsGenerator,
                        ...args
                    }) {
                        return defaultSidebarItemsGenerator({
                            ...args,
                            isCategoryIndex() {
                                // No doc will be automatically picked as category index
                                return false
                            },
                        })
                    },
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            },
        ],
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        {
            colorMode: {
                defaultMode: 'light',
                disableSwitch: true,
                respectPrefersColorScheme: false,
            },
            // meta tag, in particular og:image and twitter:image
            image: 'img/lune-icon-512.png',

            // HTML metadata (and override existing ones).
            // metadata: [{name: 'twitter:card', content: 'summary'}],

            // Announcement bar. This is a non-fixed optionally dismisable panel above navbar.
            // announcementBar: {
            //    id: 'support_us',
            //    content:
            //      'We are looking to revamp our docs, please fill <a target="_blank" rel="noopener noreferrer" href="#">this survey</a>',
            //    backgroundColor: '#fafbfc',
            //    textColor: '#091E42',
            //    isCloseable: false,
            //  },

            navbar: {
                title: 'Documentation',
                logo: {
                    alt: 'Lune Logo',
                    src: 'img/lune-logo-512.png',
                    srcDark: 'img/lune-logo-512-white.png',
                },
                items: [
                    {
                        type: 'search',
                        position: 'right',
                    },
                ],
                hideOnScroll: true,
            },

            footer: {
                style: 'light',
                logo: {
                    alt: 'Lune Logo',
                    src: 'img/lune-logo-512.png',
                    srcDark: 'img/lune-logo-512-white.png',
                    width: 80,
                },
                links: [
                    {
                        label: 'Blog',
                        to: 'https://lune.co/blog/',
                    },
                    {
                        label: 'Twitter',
                        to: 'https://twitter.com/luneclimate',
                    },
                    {
                        label: 'GitHub',
                        to: 'https://github.com/lune-climate/lune-docs',
                    },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} Lune Climate Ltd. All rights reserved.`,
            },

            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
            },
        },
    staticDirectories: ['static'],
    scripts: [
      { src: '/js/lune.js', defer: true },
      ...(process.env.ENABLE_PLAUSIBLE ? [{ defer: true, 'data-domain': 'docs.lune.co', src: 'https://plausible.io/js/plausible.js' }] : [])
    ],
    plugins: [
        [
            require.resolve('docusaurus-lunr-search'),
            {
                excludeRoutes: ['docs/AllResources/*'],
                languages: ['en'], // language codes
            },
        ],
        require.resolve('./plugins/custom-webpack-plugin'),
    ],
}

module.exports = config
