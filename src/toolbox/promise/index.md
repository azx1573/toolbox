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

⭐️v3.0 版本：

一、完善 then 方法：

1. 完善 then 方法的执行结果和状态
2. then 方法的结果和状态取决于其内部回调函数（onResolved 和 onRejected）的执行结果：
3. 如果内部回调函数的执行结果是一个新的 Promise 对象，则 then 的状态和值取决于内部 Promise 的执行结果
4. 如果内部回调函数的执行结果是一个普通值，则返回一个 fulfilled 状态的回调函数，值为 onResolved 的执行结果
5. 如果 then 的回调函数内部抛出异常，则 then 返回的返回值就是 rejected 状态的 Promise，值为 err
6. onResolved 和 onRejected 的处理方式一致

⭐️v4.0 版本：

一、完善 then 方法：

1. 支持异步修改状态
2. 支持 catch 的异常穿透(then 方法的第二个回调允许用户不传，此时，需要生成一个默认的失败回调)
3. 支持成功时回调函数没传的情况处理(then 方法第一个回调函数如果没传，则手动指定一个)

二、支持构造函数新方法：

1. 支持 resolve 方法(返回一个 Promise 对象，其结果和状态取决于内部 Promise 的状态和结果)
2. 支持 reject 方法(不论入参是什么，始终返回一个 rejected 状态的 Promise 对象)
3. 支持 all 方法(返回一个 Promise 对象，所有的 Promise 都成功则 all 成功，结果为所有 Promise 执行结果组成的数组；反之只要有一个失败则 all 失败，结果为失败 Promise 的执行结果)

三、实例对象方法新增：

1. finally 方法(不论之前调用链中执行成功还是失败，都会执行)

⭐️v5.0 版本：

1. 将 Promise 的 then 方法、catch 方法、resolve 和 reject 异步更改状态后执行回调的方式跳转为异步

⭐️v6.0 版本：

1. 改造为 Class 版本
