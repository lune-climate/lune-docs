// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer').themes.github
const darkCodeTheme = require('prism-react-renderer').themes.dracula
require('dotenv').config()

function redirectDirectory(path, oldDir, newDir) {
    const pathItems = path.split('/')
    // redirect /resources/* -> /api-reference/*
    if (pathItems.length > 1 && pathItems[0] === '' && pathItems[1] === newDir) {
        const oldPath = [`/${oldDir}`, ...pathItems.slice(2)].join('/')
        console.log(`redirect ${oldPath} -> ${path}`)
        return oldPath
    }
    // undefined results in no redirect
    return undefined
}

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Lune Documentation',
    tagline: 'Learn how to use Lune to make your product or service climate positive',
    url: 'https://docs.lune.co',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'throw',
    favicon: 'img/favicon.png',

    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    customFields: {
        DOCS_DOMAIN: process.env.REACT_DOCS_DOMAIN,
        DASHBOARD_DOMAIN: process.env.REACT_APP_DASHBOARD_DOMAIN,
        API_DOMAIN: process.env.REACT_APP_API_DOMAIN,
        DOCS_PUBLISHABLE_KEY: process.env.DOCS_PUBLISHABLE_KEY,
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
                title: 'Lune Documentation',
                logo: {
                    alt: 'Lune Logo',
                    src: 'img/lune-logo.png',
                    srcDark: 'img/lune-logo.png',
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
                        label: 'Lune',
                        to: 'https://lune.co',
                    },
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
        ...(process.env.ENABLE_PLAUSIBLE
            ? [
                  {
                      defer: true,
                      'data-domain': 'docs.lune.co',
                      src: 'https://plausible.io/js/plausible.js',
                  },
              ]
            : []),
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
        [
            '@docusaurus/plugin-client-redirects', // Note: this only works for production builds
            {
                redirects: [
                    {
                        to: '/api-reference/bundles/get-bundle',
                        from: [
                            '/api-reference/projects/get-bundle',
                            '/resources/projects/get-bundle',
                        ],
                    },
                    {
                        to: '/api-reference/bundles/list-bundles',
                        from: [
                            '/api-reference/projects/list-bundles',
                            '/resources/projects/list-bundles',
                        ],
                    },
                ],
                createRedirects: (path) => {
                    // this function, at build time, generates static redirects

                    let newPath = redirectDirectory(path, 'resources', 'api-reference')
                    if (newPath) {
                        return newPath
                    }
                    newPath = redirectDirectory(path, 'api', 'key-concepts')
                    if (newPath) {
                        return newPath
                    }

                    // undefined results in no redirect
                    return undefined
                },
            },
        ],
    ],
}

module.exports = config
