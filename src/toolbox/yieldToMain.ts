/**
 * 长任务拆分
 * @returns {Promise<void>}
 */
const yieldToMain = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
};

export default yieldToMain;
