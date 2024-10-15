import isEqual from "../isEqual";

/**
 * 数组去重，使用最简for循环方便其它功能拓展
 * @param {*} arr
 * @returns
 */
const unique = (arr) => {
  const newArr = [...arr];
  for (let i = 0, len = newArr.length; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (isEqual(newArr[i], newArr[j])) {
        newArr.splice(j, 1);
        j--;
        len--;
      }
    }
  }
  return newArr;
};

const array = unique([
  { a: 1, b: 2 },
  { a: 1, b: 3 },
  { b: 2, a: 1 },
]);

console.log("result", array);

export default unique;
