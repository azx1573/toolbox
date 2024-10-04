const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

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
    new BundleAnalyzerPlugin(),
  ],
  resolve: {
    extensions: [".ts", ".js"],
  },
  devServer: {
    port: 168,
    hot: true,
    open: true,
    compress: true,
    client: {
      progress: true,
  },
  stats: {
    chunks: true,
    modules: true,
    assets: true,
    moduleAssets: true,
    chunkGroups: true,
    chunkOrigins: true,
  },
};
