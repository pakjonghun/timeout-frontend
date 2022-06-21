const { resolve } = require('path');
const Dotenv = require('dotenv-webpack');
const commonConfig = require('./webpack.config.common');
const { merge } = require('webpack-merge');

module.exports = merge(commonConfig, {
  devtool: 'source-map',
  mode: 'development',
  devServer: {
    static: {
      directory: resolve(__dirname, 'public'),
    },
    compress: true,
    port: 3000,
    open: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [new Dotenv()],
});
