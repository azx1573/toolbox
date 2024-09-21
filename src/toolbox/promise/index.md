从 0-1 渐进式手写 Promise 思路和步骤：

⭐️v1.0 版本：

一、梳理 Promise 的所有功能补充注释

二、手写构造函数基本架子(构造函数拥有的属性)

1. 接收一个构造器函数并立即执行(这就是我们所说的 Promise 函数会同步执行，而 then 函数会异步执行的源码依据)
2. 拥有【PromiseState】属性，用于保存 Promise 对象的状态，初始为 pending
3. 拥有【resolve 和 reject】两个函数,resolve 函数负责将 Promise 对象的状态改为 fulfilled,reject 函数负责将 Promise 对象的状态改为 rejected

三、实例对象原型拥有的属性和方法

1. 拥有【then】方法，用于指定成功和失败的回调函数
2. 拥有【catch】方法，用于指定失败的回调函数

⭐️v2.0 版本：

一、实现 resolve 和 reject 方法，使其拥有：

1. 支持 PromiseState 状态的改变
2. 支持 PromiseResult 结果的保存（状态改变后其他地方使用时用到，比如 then 方法中，比如处理构造器内部异常改变其状态后）
3. Promise 的状态只能被改变一次，而且只能有 pending 改为 fulfilled 或者 rejected
4. 支持异步改变状态(需要在 then 方法中保存对应的回调函数，然后等 Promise 状态改变后执行添加的回调)

二、完善构造器函数，使其拥有：

1. 保存 Promise 对象的执行结果(状态改变后其他地方使用时用到，比如 then 方法中，比如处理构造器内部异常改变其状态后)
2. 支持构造器内部异常的抛出与处理，执行失败回调

三、实现 then 方法，使其拥有：

1. 接受一个成功时的回调 onResolved 和 一个失败时的回调 onRejected
2. then 方法的返回结果也是一个 Promise 对象
3. 状态为 fulfilled 时调用成功时的回调，为 rejected 时调用失败时的回调,并将 resolve 或 reject 执行时保存的执行结果传入对应的回调函数
4. 基于 then 的返回是一个 Promise 对象，所以可链式调用，因此异步改变状态时需考虑链式调用的场景

四、实现 catch 方法，执行失败时的回调

1. catch 也是返回一个 Promise 对象
2. 可以复用 then 方法的第二个失败时的回调的实现
