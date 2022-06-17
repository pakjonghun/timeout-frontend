const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].bundle.js',
    clean: true,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', 'json'],
    alias: {
      '@assets': resolve(__dirname, 'assets'),
      '@models': resolve(__dirname, 'src', 'models'),
      '@redux': resolve(__dirname, 'src', 'redux'),
      '@routers': resolve(__dirname, 'src', 'routers'),
      '@hooks': resolve(__dirname, 'src', 'hooks'),
      '@pages': resolve(__dirname, 'src', 'pages'),
      '@components': resolve(__dirname, 'src', 'components'),
      '@utils': resolve(__dirname, 'src', 'utils'),
    },
  },
  module: {
    rules: [
      { test: /\.(jpg|jpge)$/, type: 'asset' },
      {
        test: /\.tsx?$/,
        use: [{ loader: 'babel-loader' }],
        exclude: resolve(__dirname, 'node_modules'),
        include: resolve(__dirname, 'src'),
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
  ],
};
