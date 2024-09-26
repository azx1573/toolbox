// 上述basicFunc2方法无法精准判断出数组对象元素位置改变的情况，进一步改造一下
const isObject = (obj) => typeof obj === "object" && obj !== null;
/**
 * 判断两个对象是否相等
 * Object.is方法仅对于基本数据类型去重，对于引用类型数据，会返回false，但是相比于===判断，该方法更准确，可以精准判断+0/-0 以及NaN
 * @param {*} obj1
 * @param {*} obj2
 * @returns new Array
 */
const isEqual = (obj1, obj2) => {
  // 两值中任何一个不是对象，直接比较
  if (!isObject(obj1) || !isObject(obj2)) {
    return Object.is(obj1, obj2);
  }

  // 两值都是对象，递归比较

  // 首先判断key的个数是否相同
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);
  // key的个数不相等，直接返回false
  if (obj1Keys.length !== obj2Keys.length) {
    return false;
  }

  // key的个数相同，开始比较key的值
  for (const key of obj1Keys) {
    // 判断obj2的key数组中是否包含obj1的key，如果不包含，直接返回false
    if (!obj2Keys.includes(key)) {
      return false;
    }
    // obj1的key包含在obj2的key数组中,则递归开始比较value
    const res = isEqual(obj1[key], obj2[key]);
    if (!res) {
      return false;
    }
  }
  // 至此，返回true
  return true;
};

// 暂使用最基本最古老的方法去重方便拓展
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
