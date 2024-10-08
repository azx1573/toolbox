const path = require("path");
const os = require("os");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const generateStyleLoader = require("./generateStyleLoader");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const PreloadWebpackPlugin = require("@vue/preload-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

// 获取CPU核数
const threads = os.cpus().length;
// @ts-check
/** @type {import('webpack').Configuration} */

module.exports = {
  entry: {
    index: path.resolve(__dirname, "../src/index.js"),
  },
  mode: "development",
  devtool: "cheap-module-source-map",
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
            use: [
              {
                loader: "thread-loader", // 开启多线程loader
                options: {
                  workers: threads, // 开启的线程数
                },
              },
              {
                loader: "babel-loader",
                options: {
                  cacheDirectory: true, // 开启babel缓存
                  cacheCompression: false, // 关闭babel缓存压缩，提升编译速度
                  plugins: ["@babel/plugin-transform-runtime"], // 减少babel编译代码体积
                },
              },
            ],
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
            use: generateStyleLoader("stylus-loader"),
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
      cache: true,
      threads, // 开启多线程eslint
    }),
    // 将css提取到单独文件
    new MiniCssExtractPlugin(),
    new webpack.LoaderOptionsPlugin({
      browserlist: [
        "last 2 version", // 兼容最新两个版本，
        ">1%", // 兼容市场份额大于1%的浏览器
        "not dead", // 不兼容已经停止维护的浏览器
      ],
    }),
    // 资源预加载，用于动态生成link标签，设置rel="preload" as="script"，提前加载js文件
    new PreloadWebpackPlugin({
      rel: "preload",
      as: "script",
    }),
    // 资源预加载，用于动态生成link标签，设置rel="prefetch"，提前加载js文件
    // new PreloadWebpackPlugin({
    //   rel: "prefetch",
    // }),
  ],
  //webpack的优化配置，包括代码分割、压缩、模块分析等
  optimization: {
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
    // 压缩配置
    minimizer: [
      // 压缩css
      new CssMinimizerPlugin(),
      // 压缩js
      new TerserWebpackPlugin({
        parallel: true, // 开启多线程压缩
        terserOptions: {
          compress: {
            drop_console: true, // 删除console
            drop_debugger: true, // 删除debugger
          },
        },
      }),
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  stats: {
    chunks: true,
    chunkModules: true,
  },
  devServer: {
    port: 168,
    hot: true, // 启用热模块替换
    open: true,
    compress: true, // 开发服务器是否启用gzip压缩
    client: {
      progress: true,
    },
    static: {
      // 为打包后的静态资源提供服务，服务启动后执行打包后的文件，通过directory可指定资源路径
      directory: path.resolve(__dirname, "../dist"),
    },
  },
};
