// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Lune Docs',
    tagline: 'Learn how to use Lune to make your product or service climate positive',
    url: 'https://docs.lune.co',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.png',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'lune-climate', // Usually your GitHub org/user name.
    projectName: 'lune-prototype-docusaurus', // Usually your repo name.

    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
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
                disableSwitch: false,
                respectPrefersColorScheme: true,
            },
            navbar: {
                title: 'Documentation',
                logo: {
                    alt: 'Lune Logo',
                    src: 'img/lune-logo-512.png',
                    srcDark: 'img/lune-logo-512-white.png',
                },
                items: [
                    {
                        href: 'https://github.com/lune-climate/lune-docs',
                        label: 'GitHub',
                        position: 'right',
                    },
                ],
            },
            footer: {
                style: 'dark',
                links: [
                    {
                        title: 'Useful Links',
                        items: [
                            {
                                label: 'Twitter',
                                href: 'https://twitter.com/luneclimate',
                            },
                            {
                                label: 'Blog',
                                to: 'https://lune.co/blog/',
                            },
                        ],
                    },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} Lune Climate Ltd. All rights reserved.`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
            },
        },
    scripts: [{ src: 'js/lunejs.js', defer: true }],
}

module.exports = config
