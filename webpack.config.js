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
    filename: "static/js/[chunkhash:10].bundle.js",
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
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/,
        type: "asset", // 通用资源模块类型，会自动根据文件大小选择base64或者file,默认8kb,可通过parser.dataUrlCondition.maxSize修改
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
        generator: {
          // 配置输出文件名，ext代表保留原文件扩展名
          filename: "static/img/[hash:10][ext]",
        },
      },
      {
        test: /\.(eot|ttf|woff2?)$/,
        type: "asset/resource", // 生成单独文件
        generator: {
          // 配置输出文件名，ext代表保留原文件扩展名
          filename: "static/font/[hash:10][ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "toolbox",
      template: path.resolve(__dirname, "index.html"),
    }),
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
    }),
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
