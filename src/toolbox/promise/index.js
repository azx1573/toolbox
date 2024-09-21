/**
 * Promise构造函数
 * 具备能力：
 *   * 构造器拥有的属性和方法：
 *      * 接受一个构造器函数并立即执行(这就是我们所说的Promise函数会同步执行，而then函数会异步执行的源码依据)
 *      * 拥有【resolve和reject】两个函数,resolve函数将Promise对象的状态改为fulfilled,reject函数将Promise对象的状态改为rejected
 *      * 拥有【PromiseState】属性，用于保存Promise对象的状态
 *      * 拥有【PromiseResult】属性，用于保存Promise对象的结果(then方法需要返回成功或失败的结果)
 *      * 拥有【finally】方法，用于指定无论成功还是失败都会执行的回调函数
 *      * 拥有【all】方法，用于指定多个Promise对象同时执行，只有全部成功才会成功，只要有一个失败就会失败
 *      * 拥有【race】方法(类似于甲乙双方比赛，甲方为resolve方，乙方为reject方)，用于指定多个Promise对象同时执行，只要有一个成功就会成功，只要有一个失败就会失败
 *      * 拥有【resolve】方法，返回一个Promise对象，通过Promise.resolve方法返回的Promise对象的状态和结果取决于传入的参数
 *      * 拥有【reject】方法，返回一个失败的Promise对象，不管传入的参数是什么，结果都是失败
 *   * 实例对象原型拥有的属性和方法：
 *      * 拥有【then】方法，用于指定成功和失败的回调函数
 *      * 拥有【catch】方法，用于指定失败的回调函数
 *   * 关于状态的改变：
 *      * Promise对象的状态一旦改变就不会再改变
 *      * Promise对象的状态只能从pending改变为fulfilled或rejected
 *      * 状态的改变支持异步操作：then方法中会保存成功和失败的回调函数，当Promise对象的状态改变时，会调用对应的回调函数
 *   * 关于then方法：
 *      * then方法返回一个新的Promise对象
 *      * then方法支持链式调用，每次调用then方法都会返回一个新的Promise对象
 *      * then方法的结果和状态取决于其内部回调函数的执行结果：
 *        * 如果回调函数返回的是一个Promise对象，那么then方法返回的Promise对象的状态和结果取决于回调函数返回的Promise对象的状态和结果
 *        * 如果回调函数返回的是一个普通值，那么then方法会返回一个成功的Promise对象，结果就是回调函数返回的值
 *        * 如果回调函数抛出异常，那么then方法会返回一个失败的Promise对象，结果就是抛出的异常
 *      * then方法支持链式调用，每次调用then方法都会返回一个新的Promise对象
 *      * 中断链式调用的方法：
 *        * 返回一个pending状态的Promise对象
 *        * 返回一个失败的Promise对象
 *        * 抛出异常
 * @param {*} executor
 */
function Promise(executor) {
  // 保存Promise对象的状态
  this.PromiseState = "pending";
  // 保存Promise对象的结果
  this.PromiseResult = null;
  // 保存异步操作场景的回调函数
  this.callbacks = [];
  // resolve和reject普通函数内部的this指向的是window对象，所以需要保存this
  let self = this;

  /**
   * 成功的回调函数
   * @param {*} data
   * @returns
   */
  function resolve(data) {
    // Promise的状态只能被修改一次
    if (self.PromiseState !== "pending") return;
    // 修改Promise对象的状态为fulfilled;
    self.PromiseState = "fulfilled";
    self.PromiseResult = data;
    // 批量执行异步操作场景成功的回调函数
    self.callbacks.forEach((cb) => {
      cb.onResolved(data);
    });
  }

  /**
   * 失败的回调函数
   * @param {*} data
   * @returns
   */
  function reject(data) {
    // Promise的状态只能被修改一次
    if (self.PromiseState !== "pending") return;
    // 修改Promise对象的状态为rejected;
    self.PromiseState = "rejected";
    self.PromiseResult = data;
    // 批量执行异步操作场景失败的回调函数
    self.callbacks.forEach((cb) => {
      cb.onRejected(data);
    });
  }

  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

/**
 * 返回一个新的Promise对象
 * @param {*} onResolved
 * @param {*} onRejected
 */
Promise.prototype.then = function (onResolved, onRejected) {
  return new Promise((resolve, reject) => {
    if (this.PromiseState === "fulfilled") {
      onResolved(this.PromiseResult);
    }
    if (this.PromiseState === "rejected") {
      onRejected(this.PromiseResult);
    }

    // 保存异步操作场景的回调函数
    this.callbacks.push({
      onResolved,
      onRejected,
    });
  });
};

/**
 * Promise实例对象的catch方法，也返回一个新的Promise对象，只是指定失败的回调函数
 * @param {*} onRejected
 * @returns
 */
Promise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected);
};