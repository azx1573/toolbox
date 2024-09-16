/**
 * 最古老的去重方法
 * 优点：效率高，性能好，可拓展性好
 * 缺点：无法对引用类型等复杂类型的数据去重
 * @param {*} arr
 * @returns new Array
 */
const basicFunc = (arr) => {
  const newArr = [...arr];
  const len = newArr.length;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (newArr[i] === newArr[j]) {
        newArr.splice(j, 1);
        j--;
      }
    }
  }
  return newArr;
};

/**上述basicFunc方法无法判断类似数组对象，进一步改造一下
 * 将上述方法稍微改造一下，支持引用类型数据去重
 * 优点：效率高，性能好，可拓展性好
 * 缺点：比如数组对象这种数据，当key顺序改变时无法精准判断
 * @param {*} arr
 * @returns new Array
 */
const basicFunc2 = (arr) => {
  const newArr = [...arr];
  const len = newArr.length;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (JSON.stringify(newArr[i]) === JSON.stringify(newArr[j])) {
        newArr.splice(j, 1);
        j--;
      }
    }
  }
  return newArr;
};

// 上述方法改造为支持引用类型数据去重的见：./src/toolbox/arrayRemoveDuplicates/unique.js
// 下面使用其它方法去重

/** 使用New Set方法去重
 * 优点：高效简洁
 * 缺点：
 * 1. Set对于数据的判重是基于===严格相等的，对于对象类说，只有它们的引用相同时才会被认为是相等的，因此无法准确判断复杂数据类型是否重复
 * 2. 无法保证数组的顺序
 * 详见：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set
 * @param {*} arr
 * @returns new Array
 */
function unique(arr) {
  return [...new Set(arr)];
}

/** 使用indexOf方法去重
 * 现代方法中最原始的去重方法
 */
function unique2(arr) {
  const newArr = [];
  for (let i = 0, len = arr.length; i < len; i++) {
    if (newArr.indexOf(arr[i]) === -1) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}

/**
 * 使用filter方法结合indexOf去重
 * 最简洁有趣的方法-一行搞定
 */
const unique3 = (arr) =>
  arr.filter((item, index, self) => self.indexOf(item) === index);

/**
 * 复杂数据类型去重：比如数组对象
 * 思路：
 * 1. 如果数组对象有key,则利用其key去重
 * 2. 如果没有，为其生成一个唯一key，然后去重
 */
function unique4(array) {
  const newArr = array.map((arr) => ({
    ...arr,
    key: arr.key || crypto.randomUUID(),
  }));
  return newArr
    .filter(
      (item, index, self) => self.findIndex((s) => s.key === item.key) === index
    )
    .map((item) => {
      const { key, ...newObj } = item;
      return newObj;
    });
}
