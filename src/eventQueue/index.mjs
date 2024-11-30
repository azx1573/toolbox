/**
 * Event Queue
 * 虽然目前浏览器不存在宏任务队列和微任务队列的概念，但为了方便理解，我们可以将浏览器的事件队列分为宏任务队列和微任务队列：
 * 1. 在mjs文件中，同步任务执行完后，会立即执行并清空微队列中的任务，因此Promise的then中的回调会在同步任务执行完后立即执行
 * 2. nextTick是Node.js的一个API，它的回调会在下一次事件循环开始前执行
 * 3. 当微任务队列清空后执行完最后一个nextTick时，最后一个NextTick的回调会在下一次事件循环开始前执行
 */
const example7 = () => {
  console.log(1);

  setTimeout(() => {
    console.log(2);
  }, 0);

  new Promise((resolve, reject) => {
    resolve(3);
  }).then(() => {
    console.log(4);
    process.nextTick(() => {
      console.log(5);
    });
  });

  process.nextTick(() => {
    console.log(6);
  });
};
example7(); // 1 4 6 5 2
