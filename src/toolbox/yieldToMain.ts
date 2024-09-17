/**
 * 长任务拆分
 * @returns {Promise<void>}
 */
const yieldToMain = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
};

function timeout(delay: number) {
  return new Promise((resole) => {
    setTimeout(() => {
      resole(true);
    }, delay);
  });
}

export { yieldToMain, timeout };
