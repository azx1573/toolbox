const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// @ts-check
/** @type {import('webpack').Configuration} */

module.exports = {
  entry: {
    index: path.resolve(__dirname, "/src/index.js"),
  },
  mode: "development",
  devtool: "inline-source-map",
  output: {
    filename: "[chunkhash].bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "toolbox",
      template: path.resolve(__dirname, "index.html"),
    }),
  ],
  resolve: {
    extensions: [".ts", ".js"],
  },
  devServer: {
    port: 168,
    hot: true,
    open: true,
  },
};
