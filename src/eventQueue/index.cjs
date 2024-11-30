/**
 * Event Queue
 * 虽然目前浏览器不存在宏任务队列和微任务队列的概念，但为了方便理解，我们可以将浏览器的事件队列分为宏任务队列和微任务队列：
 * 1. 在commonJS文件中，nextTick是Node.js的一个API，它的回调会在下一次事件循环开始前执行，因此执行到最后一个nextTick时，最后一个NextTick的回调会在下一次事件循环开始前执行，优先打印6
 * 2. 清空微任务队列时，会打印出4，然后执行nextTick时下一次事件循环开始前执行，打印5，最后是宏任务队列中的setTimeout，打印2
 *
 * 和mjs文件中的执行结果不同之处在于：Promise的then会不会在同步任务执行时执行，根据NodeJS这部分功能的作者介绍，mjs的执行本身就是一个微任务，
 * 所以同步任务执行完后会立即执行并清空微队列中的任务，即此处Promise的then的优先级高于nextTick
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
example7(); // 1 6 4 5 2
