const isObject = (obj) => typeof obj === "object" && obj !== null;

/**
 * 提供一个判断两数相等的简易方法
 * 判断思路：
 * 一、如果两个值中任何一个不是对象，直接比较
 * 二、如果两个值都是对象，递归比较
 *   1. 首先判断key的个数是否相同，如果不相同，直接返回false
 *   2. key的个数相同，开始比较key的值，遍历obj1的key数组，判断obj2的key数组中是否包含obj1的key，如果不包含，直接返回false
 *   3. obj1的key包含在obj2的key数组中,则递归开始比较value
 *   4. 如果递归比较的结果为false，直接返回false
 * 三、至此，返回true
 * @param {*} obj1
 * @param {*} obj2
 * @returns
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

export default isEqual;
