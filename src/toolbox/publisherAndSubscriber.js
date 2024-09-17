/**
 * 发布订阅者模式
 * 介绍：
 * 1. 存在一个事件中心(类似菜鸟驿站)：统一接收所有发布者发布的事件，并负责通知所有的订阅者
 * 2. 存在一个发布者(菜鸟驿站发货负责人，对接多个商家集中填单发货)：负责发布所有的事件
 * 3. 存在一个订阅者(菜鸟驿站的消费者，callback相当于订阅方式，比如通过短信的方式)：当订阅了感兴趣的事件后，会通过订阅者设置的订阅方式自动收到来自发布者的通知
 * @returns {
 *  describe: (event, callback) => {},
 *  publish: (event, data) => {},
 * }
 */
export default function createPubSub() {
  /** 创建一个事件中心：作为中间代理商的角色，接收所有发布者发布的事件，并负责通知所有的订阅者 */
  const subscribers = {};

  /**
   * 订阅事件
   * @param {*} event
   * @param {*} callback
   */
  function describe(event, callback) {
    /** 如果没有订阅者时创建一个空数组，这样发布者就无需做非法格式的判断*/
    if (!subscribers[event]) {
      subscribers[event] = [];
    }
    /** 将订阅者订阅的事件统一存储到事件中心 */
    subscribers[event].push(callback);
  }
  /**
   * 发布事件
   * @param {*} event
   * @param {*} data
   * @returns
   */
  function publish(event, data) {
    // 如果没有任何订阅者订阅事件时，直接返回
    if (!subscribers[event]) {
      return;
    }

    /** 遍历所有订阅者订阅的事件，集中统一发布 */
    subscribers[event]?.forEach((callback) => {
      callback(data);
    });
  }

  /**
   * 取消订阅
   */
  function unSubscribe(event, callback) {
    /** 如果没有订阅者时创建一个空数组，这样发布者就无需做非法格式的判断*/
    if (!subscribers[event]) {
      return;
    }
    /** 将订阅者订阅的事件统一存储到事件中心 */
    subscribers[event] = subscribers[event].filter((cb) => cb !== callback);
  }

  /** 事件中心统一向外公布发布和订阅方法 */
  return {
    describe,
    publish,
    unSubscribe,
  };
}

const pubSub = createPubSub();
const callback = (data) => {
  console.log(666, "订阅者收到来自已订阅event的消息", data);
};

// 订阅者1订阅事件
pubSub.describe("event1", callback);
pubSub.unSubscribe("event1", callback);

// 发布者发布事件(如果订阅后取消了订阅，则不会收到消息)
pubSub.publish("event1", "Hello-sunflower");
