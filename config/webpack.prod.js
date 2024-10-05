const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const generateStyleLoader = require("./generateStyleLoader");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// @ts-check
/** @type {import('webpack').Configuration} */

module.exports = {
  entry: {
    index: path.resolve(__dirname, "/src/index.js"),
  },
  mode: "production",
  devtool: "source-map",
  output: {
    filename: "static/js/[chunkhash:10].bundle.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/",
    clean: true,
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.ts$/,
            use: "ts-loader",
            exclude: /node_modules/,
          },
          {
            test: /\.(js|ts)$/,
            include: path.resolve(__dirname, "../src"),
            loader: "babel-loader",
            options: {
              cacheDirectory: true, // 开启babel缓存
              cacheCompression: false, // 关闭babel缓存压缩，提升编译速度
              plugins: ["@babel/plugin-transform-runtime"], // 减少babel编译代码体积
            },
          },
          {
            test: /\.css$/,
            use: generateStyleLoader(),
          },
          {
            test: /\.less$/,
            use: generateStyleLoader("less-loader"),
          },
          {
            test: /\.s[ac]ss$/,
            use: generateStyleLoader("sass-loader"),
          },
          {
            test: /\.styl$/,
            use: [MiniCssExtractPlugin.loader, "css-loader", "stylus-loader"],
            use: generateStyleLoader("stylus-loader"),
          },
          // 使用webpack内置的资源模块类型处理图片文件(asset为通用资源模块，会自动根据文件大小选择base64或者file)
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
          // 使用webpack内置的资源模块类型处理字体文件(asset/resource为单独文件，会发起http请求获取)
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
    ],
  },
  plugins: [
    // 生成指定html文件
    new HtmlWebpackPlugin({
      title: "toolbox",
      template: path.resolve(__dirname, "../index.html"),
    }),
    // 打包分析插件
    // new BundleAnalyzerPlugin({
    //   openAnalyzer: false,
    // }),
    // 配置eslint插件
    new EslintWebpackPlugin({
      context: path.resolve(__dirname, "src"),
      cache: true, // 开启eslint缓存
    }),
    // 将css单独提取到文件
    new MiniCssExtractPlugin(),
    new webpack.LoaderOptionsPlugin({
      browserlist: [
        "last 2 version", // 兼容最新两个版本，
        ">1%", // 兼容市场份额大于1%的浏览器
        "not dead", // 不兼容已经停止维护的浏览器
      ],
    }),
    // webpack默认压缩只是针对简单的比如空格等，用插件开启css压缩
    new CssMinimizerPlugin(),
  ],
  resolve: {
    extensions: [".ts", ".js"],
  },
  stats: {
    chunks: true,
    chunkModules: true,
  },
};
