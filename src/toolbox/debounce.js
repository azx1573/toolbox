/**
 * 防抖函数
 * 什么是：连续触发事件时，只会执行最后一次事件，如果在延迟事件范围内再次触发会重新开始延时
 * 用途：输入框搜索或输入事件频率控制
 * @param {*} fn
 * @param {*} delay
 * @returns
 */
export default function debounce(fn, delay) {
  let timer = null;

  // 取消防抖
  const cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
    return cancel;
  };
}
