/**
 * 将函数柯里化
 * 什么是柯里化：利用闭包的特性，将多个参数转换为单个参数的高阶函数
 * 用途：
 * 1. 通过柯里化，实现了参数的复用
 * 2. 动态生成新函数
 * @param {*} fn
 * @returns fn
 */
function curry(fn) {
  return function (a) {
    return function (b) {
      return fn(a, b);
    };
  };
}
/**
 * 使用箭头函数简化柯里化方法
 * @param {*} fn
 * @returns fn
 */
const curry2 = (fn) => (a) => (b) => fn(a, b);

function sum(a, b) {
  return a + b;
}
const curriedSum = curry(sum);
const curriedSum2 = curry2(sum);

console.log(111, curriedSum(1)(2)); // 3
console.log(222, curriedSum2(1)(2)); // 3
