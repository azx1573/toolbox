/**
 * 简易版 requestIdleCallback Polyfill
 * @param {*} cb
 * @returns
 */
function requestIdleCallbackPolyfill(cb) {
  const start = Date.now();
  return setTimeout(() => {
    cb({
      didTimeout: false,
      timeRemaining() {
        return Math.max(0, 50 - (Date.now() - start));
      },
    });
  }, 1);
}

export default requestIdleCallbackPolyfill;
