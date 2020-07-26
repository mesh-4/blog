const { resolve } = require('path')
const { merge } = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const RobotstxtPlugin = require('robotstxt-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [
      new TerserPlugin({ parallel: true, sourceMap: true }),
      new OptimizeCSSAssetsPlugin(),
    ],
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new WebpackPwaManifest({
      name: "Senlima's Blog",
      short_name: "Senlima's Blog",
      description: 'A blog of web development note.',
      background_color: '#272727',
      orientation: 'portrait',
      display: 'standalone',
      start_url: '.',
      ios: true,
      inject: true,
      ios: {
        'apple-mobile-web-app-title': "Senlima's blog",
        'apple-mobile-web-app-status-bar-style': 'black',
      },
      icons: [
        {
          src: resolve('public/logo1024.png'),
          sizes: [96, 128, 192, 256, 384, 512, 1024],
        },
      ],
    }),
    new RobotstxtPlugin({
      policy: [
        {
          userAgent: '*',
          allow: '/',
          disallow: '/login',
        },
      ],
    }),
  ],
  devtool: 'source-map',
})
