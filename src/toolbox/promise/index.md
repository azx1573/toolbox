从 0-1 渐进式手写 Promise 思路和步骤：

v1.0 版本
一、梳理 Promise 的所有功能补充注释

二、手写构造函数基本架子(构造函数拥有的属性)

1. 接收一个构造器函数并立即执行(这就是我们所说的 Promise 函数会同步执行，而 then 函数会异步执行的源码依据)
2. 拥有【resolve 和 reject】两个函数,resolve 函数负责将 Promise 对象的状态改为 fulfilled,reject 函数负责将 Promise 对象的状态改为 rejected
3. 拥有【PromiseState】属性，用于保存 Promise 对象的状态

三、实例对象原型拥有的属性和方法

1. 拥有【then】方法，用于指定成功和失败的回调函数
2. 拥有【catch】方法，用于指定失败的回调函数
