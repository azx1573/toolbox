const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const generateStyleLoader = require("./generateStyleLoader");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const PreloadWebpackPlugin = require("@vue/preload-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
// @ts-check
/** @type {import('webpack').Configuration} */

module.exports = {
  entry: {
    index: path.resolve(__dirname, "/src/index.js"),
  },
  mode: "production",
  devtool: "source-map",
  output: {
    //入口文件输出配置
    filename: "static/js/[name].[contenthash:10].js",
    //非入口文件输出配置, 例如按需加载的文件
    chunkFilename: "static/js/[name].chunk.js",
    //诸如图片、字体等资源的输出命名配置
    assetModuleFilename: "static/[contenthash:10][ext][query]",
    path: path.resolve(__dirname, "../lib"),
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
            // 统一图片和字体等资源的命名，采用output中的assetModuleFilename配置
            // generator: {
            //   // 配置输出文件名，ext代表保留原文件扩展名
            //   filename: "static/img/[hash:10][ext]",
            // },
          },
          // 使用webpack内置的资源模块类型处理字体文件(asset/resource为单独文件，会发起http请求获取)
          {
            test: /\.(eot|ttf|woff2?)$/,
            type: "asset/resource", // 生成单独文件
            // 统一图片和字体等资源的命名，采用output中的assetModuleFilename配置
            // generator: {
            //   // 配置输出文件名，ext代表保留原文件扩展名
            //   filename: "static/font/[hash:10][ext]",
            // },
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
    // 将css单独提取到文件中，而不是以字符串的形式打包到js中，避免js文件过大
    new MiniCssExtractPlugin({
      filename: "static/css/[name].css",
      chunkFilename: "static/css/[name].chunk.css",
    }),
    new webpack.LoaderOptionsPlugin({
      browserlist: [
        "last 2 version", // 兼容最新两个版本，
        ">1%", // 兼容市场份额大于1%的浏览器
        "not dead", // 不兼容已经停止维护的浏览器
      ],
    }),
    // webpack默认压缩只是针对简单的比如空格等，用插件开启css压缩
    new CssMinimizerPlugin(),
    // 资源预加载，用于动态生成link标签，设置rel="preload" as="script"，提前加载js文件
    new PreloadWebpackPlugin({
      rel: "preload",
      as: "script",
    }),
    // 资源预加载，用于动态生成link标签，设置rel="prefetch"，提前加载js文件
    // new PreloadWebpackPlugin({
    //   rel: "prefetch",
    // }),
    // PWA插件，用于生成service-worker文件，提供离线访问能力
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true, // 立即激活service
      skipWaiting: true, // 强制等待中的service worker被激活
    }),
  ],
  //webpack的优化配置，包括代码分割、压缩、模块分析等
  optimization: {
    // 代码分割
    splitChunks: {
      chunks: "all", // 默认是async，表示只对异步代码进行分割，all表示同步异步代码都分割
      // minSize: 20000, // 生成chunk的最小大小，单位byte，默认是20kb
      // minRemainingSize: 0, // 生成chunk的最小剩余大小，单位byte，默认是0
      // minChunks: 1, // 生成chunk的最小引用次数，默认是1, 表示只有被引用1次的模块才会被分割
      // maxAsyncRequests: 30, // 按需加载时的最大并行请求数，默认是30
      // maxInitialRequests: 30, // 入口js文件最大并行请求数，默认是30
      // enforceSizeThreshold: 50000, // 强制分割前检查chunk大小，单位byte，默认是50kb，超过50一定会被分割，此时会忽略miniRemainingSize/maxAsyncRequests/maxInitialRequests
      cacheGroups: {
        // 缓存组，可以继承或者覆盖splitChunks的配置
        // defaultVendors: {
        //   // 默认配置，打包node_modules中的模块
        //   test: /[\\/]node_modules[\\/]/,
        //   priority: -10, // 权重，当一个模块符合多个缓存组时，会被分到权重高的缓存组
        //   reuseExistingChunk: true, // 是否复用已经存在的chunk, 如果当前chunk包含已经存在的chunk，就会复用已经存在的chunk而不是生成新的chunk
        //   filename: "vendors.js", // 生成的文件名
        // },
        // 默认配置，打包其他模块，此时会忽略splitChunks中同名配置
        default: {
          priority: -20, // 权重
          reuseExistingChunk: true, // 是否复用已经存在的chunk
        },
      },
    },
    //抽离模块间运行时的依赖关系到单独的文件中，避免被依赖的模块hash变化导致缓存失效
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`,
    },
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  stats: {
    chunks: true,
    chunkModules: true,
  },
};
