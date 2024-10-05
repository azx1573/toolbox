const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (pre) => {
  return [
    // 使用MiniCssExtractPlugin.loader替换style-loader，可以提取css到单独文件
    MiniCssExtractPlugin.loader,
    "css-loader",
    {
      // 通过postcss-loader自动处理浏览器兼容性
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [
            [
              "postcss-preset-env",
              {
                browsers: "last 2 versions",
              },
            ],
          ],
        },
      },
    },
    pre, // 动态传入预处理器的loader,注入less-loader/sass-loader/stylus-loader
  ].filter(Boolean);
};
