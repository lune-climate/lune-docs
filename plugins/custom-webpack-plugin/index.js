const webpack = require('webpack')

// eslint-disable-next-line
module.exports = function (context, options) {
    return {
        name: 'custom-webpack-plugin',
        // eslint-disable-next-line
        configureWebpack(config, isServer, utils) {
            return {
                // Required by react-markdown. Solves the following error:
                // Did you mean 'browser.js'?
                // BREAKING CHANGE: The request 'process/browser' failed to resolve only because it was resolved as fully specified
                // (probably because the origin is strict EcmaScript Module, e. g. a module with javascript mimetype, a '*.mjs' file, or a '*.js' file where the package.json contains '"type": "module"').
                // The extension in the request is mandatory for it to be fully specified.
                // Add the extension to the request.
                // Cannot read properties of undefined (reading 'module')
                module: {
                    rules: [
                        {
                            test: /\.m?js/,
                            resolve: {
                                fullySpecified: false,
                            },
                        },
                    ],
                },
                // Required in order for Buffer to work in a browser
                plugins: [
                    // Work around for Buffer is undefined:
                    //         // https://github.com/webpack/changelog-v5/issues/10
                    new webpack.ProvidePlugin({
                        Buffer: ['buffer', 'Buffer'],
                    }),
                    new webpack.ProvidePlugin({
                        process: 'process/browser',
                    }),
                ],
                resolve: {
                    fallback: {
                        path: require.resolve('path-browserify'),
                        url: require.resolve('url/'),
                        process: require.resolve('process/browser'),
                        crypto: require.resolve('crypto-browserify'),
                        stream: require.resolve('stream-browserify'),
                        buffer: require.resolve('buffer'), // required to use Buffer in a browser
                    },
                },
            }
        },
    }
}
