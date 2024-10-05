const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const EslintWebpackPlugin = require("eslint-webpack-plugin");

// @ts-check
/** @type {import('webpack').Configuration} */

module.exports = {
  entry: {
    index: path.resolve(__dirname, "../src/index.js"),
  },
  mode: "development",
  devtool: "inline-source-map",
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
    // 生成指定html文件
    new HtmlWebpackPlugin({
      title: "toolbox",
      template: path.resolve(__dirname, "../index.html"),
    }),
    // 打包分析插件
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
    }),
    // 配置eslint插件
    new EslintWebpackPlugin({
      context: path.resolve(__dirname, "src"),
    }),
  ],
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
