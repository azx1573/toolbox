/**
 * 节流函数
 * 什么是：见名思意，节流就是控制函数执行频率，每隔指定时间才会执行
 * 用途：鼠标滚动事件的频率控制、按钮点击事件的频率控制
 * @param {*} fn
 * @param {*} delay
 * @returns
 */

export default function throttle(fn, delay) {
  let timer = null;
  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, arguments);
        timer = null;
      }, delay);
    }
  };
}
