/**
 * 下载内容如果是文本，用户要求单独打开一个页面并将下载的内容加载到页面中
 * @param filePath
 */
export const downloadWithTagA = (filePath) => {
  const a = document.createElement("a");
  a.href = filePath;
  a.target = "_blank";
  a.download = filePath;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.open(filePath);
};
