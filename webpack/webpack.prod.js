const { join, resolve } = require('path')
const { merge } = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const RobotstxtPlugin = require('robotstxt-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const WorkboxPlugin = require('workbox-webpack-plugin')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    namedModules: true,
    usedExports: true,
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [
      new TerserPlugin({ parallel: true, sourceMap: true }),
      new OptimizeCSSAssetsPlugin(),
    ],
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
    }),
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
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-title': "Senlima's blog",
        'apple-mobile-web-app-status-bar-style': 'black',
      },
      icons: [
        {
          src: resolve('public/logo1024.png'),
          sizes: [120, 152, 167, 180, 1024],
          destination: join('icons', 'ios'),
          ios: true,
        },
        {
          src: resolve('public/logo1024.png'),
          size: 1024,
          destination: join('icons', 'ios'),
          ios: 'startup',
        },
        {
          src: resolve('public/logo1024.png'),
          sizes: [96, 128, 192, 256, 384, 512, 1024],
          destination: join('icons', 'web'),
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
    new WorkboxPlugin.GenerateSW({
      swDest: 'sw.js',
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: new RegExp('https://senlima.blog'),
          handler: 'StaleWhileRevalidate',
        },
      ],
    }),
  ],
  devtool: 'none',
})
