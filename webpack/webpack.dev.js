const { join } = require('path')
const { merge } = require('webpack-merge')
const { HotModuleReplacementPlugin } = require('webpack')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  watch: true,
  entry: ['webpack-dev-server/client?http://localhost:7070'],
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  devServer: {
    contentBase: join(__dirname, '..', 'dist'),
    historyApiFallback: true,
    host: '127.0.0.1',
    port: 7070,
    hot: true,
    inline: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods':
        'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization',
    },
  },
  plugins: [new HotModuleReplacementPlugin()],
  devtool: 'cheap-eval-source-map',
  watchOptions: {
    ignored: /dist/,
  },
})
