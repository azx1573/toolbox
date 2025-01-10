import timeout from "./timeout.ts";

/**
 * 并发任务控制器
 * 1. 通过add方法添加任务，返回Promise
 * 2. 通过Promise的then方法，可以获取任务执行结果
 * 3. 通过concurrentCount设置并发数量
 * 4. 任务执行完成后，会自动执行下一个任务
 * ***思路***
 * 好比银行柜台排队办理业务，柜台是有限的，因此每次只能办理指定数量的业务，其它需要排队等待，但是为了提高效率，哪个柜台办理结束即可叫下一个号
 * @param {Number} concurrentCOunt 并发数量，默认为2
 */
class SuperTask {
  constructor(concurrentCount = 2) {
    this.conCurrentCount = concurrentCount;
    this.runningCount = 0;
    this.tasks = []; // 任务队列
  }

  /**
   * 向任务队列添加任务
   * @param {*} task
   * @returns
   */
  add(task) {
    return new Promise((resolve, reject) => {
      this.tasks.push({ task, resolve, reject });
      this._run(); // 每次添加任务后，都会尝试执行任务
    });
  }

  /**
   * 执行任务,并发数量控制
   */
  _run() {
    const { task, resolve, reject } = this.tasks.shift();
    while (this.tasks.length && this.runningCount < this.conCurrentCount) {
      this.runningCount++;
      task()
        .then(resolve, reject)
        .finally(() => {
          this.runningCount--;
          this._run();
        });
    }
  }
}

const superTask = new SuperTask();

function addTask(delay, name) {
  superTask
    .add(() => timeout(delay))
    .then(() => {
      console.log(`任务${name}执行完成`);
    });
}
addTask(10000, "1"); // 10s任务1执行完成
addTask(5000, "2"); // 5s任务2执行完成
addTask(3000, "3"); // 8s任务3执行完成
addTask(4000, "4"); // 12s任务4执行完成
addTask(5000, "5"); // 15s任务5执行完成

export default SuperTask;
