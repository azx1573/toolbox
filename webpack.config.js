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
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.styl$/,
        use: ["style-loader", "css-loader", "stylus-loader"],
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
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
  },
};
