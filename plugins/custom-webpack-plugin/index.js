// eslint-disable-next-line
module.exports = function (context, options) {
  return {
    name: 'custom-webpack-plugin',
    // eslint-disable-next-line
    configureWebpack(config, isServer, utils) {
      return {
        resolve: {
          fallback: {
            path: require.resolve('path-browserify'),
            url: require.resolve('url/'),
            process: require.resolve('process/browser')
          },
        },
      };
    },
  };
};
