const { resolve } = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { ReactLoadablePlugin } = require('react-loadable/webpack')

const isDevelopment = process.env.NODE_ENV === 'development'

module.exports = {
  entry: ['./src/main.jsx'],
  output: {
    filename: isDevelopment ? 'bundle.[hash].js' : '[contenthash].bundle.js',
    path: resolve(__dirname, '..', 'dist'),
    publicPath: isDevelopment ? '/' : 'https://senlima.blog/',
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': resolve('src'),
      '@store': resolve('src/store'),
      '@components': resolve('src/components'),
      '@modules': resolve('src/modules'),
      '@common': resolve('src/modules/common'),
      '@image': resolve('src/modules/image'),
      '@audio': resolve('src/modules/audio'),
      '@article': resolve('src/modules/article'),
      '@podcast': resolve('src/modules/podcast'),
      '@markdown': resolve('src/modules/markdown'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
          'eslint-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDevelopment,
            },
          },
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|jpe?g)$/,
        use: ['file-loader'],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader'],
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      favicon: 'public/favicon.ico',
      hash: true,
      inject: true,
      minify: isDevelopment
        ? {}
        : {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            removeScriptTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          },
    }),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].[contenthash].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id].[contenthash].css',
    }),
    new CopyPlugin({
      patterns: [{ from: './src/assets', to: './assets' }],
    }),
    new ReactLoadablePlugin({
      filename: './dist/react-loadable.json',
    }),
    new ManifestPlugin(),
  ],
  performance: false,
}
