module.exports = {
  extends: [
    // 后续新增
    // "eslint:recommended",
    //  "airbnb" 需要下载eslint-config-airbnb插件支持
  ],
  env: {
    node: true, //启用node全局
    browser: true, //启用浏览器全局变量
  },
  parserOptions: {
    ecmaVersion: 12, //启用ES2020
    sourceType: "module", //启用ES6模块
  },
  rules: {
    "no-var": 2, //禁用var
  },
  // plugins: ["promise"],
};
