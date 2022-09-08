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
                respectPrefersColorScheme: true,
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
    scripts: [{ src: '/js/lune.js', defer: true }],
    plugins: [
        [
            require.resolve('docusaurus-lunr-search'),
            {
                excludeRoutes: ['docs/AllResources/*'],
                languages: ['en'], // language codes
            },
        ],
    ],
}

module.exports = config
