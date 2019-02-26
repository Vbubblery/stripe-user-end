const withImages = require('next-images');
module.exports = withImages(
{
  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
    // Perform customizations to webpack config
    // Important: return the modified config
    config.module.rules.push({
      test: /\.(css|scss)/,
      loader: 'emit-file-loader',
      options: {name: 'dist/[path][name].[ext]'}
    },
    {
      test: /\.css$/,
      loader: 'babel-loader!raw-loader'
    },
    {
      test: /\.scss$/,
      loader: 'babel-loader!raw-loader!sass-loader'
    });
    return config;
  },
  webpackDevMiddleware: config => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config
  }
  //cssModules: true
})
