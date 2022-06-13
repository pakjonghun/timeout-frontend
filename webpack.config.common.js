const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: resolve(__dirname, "public"),
    filename: "[name].[contenthash].bundle.js",
    clean: true,
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", "json"],
    alias: {
      "@routers": resolve(__dirname, "src", "routers"),
      "@hooks": resolve(__dirname, "src", "hooks"),
      "@routers": resolve(__dirname, "src", "routers"),
      "@components": resolve(__dirname, "src", "components"),
      "@utils": resolve(__dirname, "src", "utils"),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{ loader: "babel-loader" }],
        exclude: resolve(__dirname, "node_modules"),
        include: resolve(__dirname, "src"),
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new webpack.ProvidePlugin({
      React: "react",
    }),
  ],
};
