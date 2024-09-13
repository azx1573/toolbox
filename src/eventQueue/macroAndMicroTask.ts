/**
 * macro task and micro task sets
 * summarize:
 * 1. the method of method in Promise is a micro-task, but the Promise itself is a synchronous task
 * 2. resolve has no effect without method of the
 * 3. once the state of Promise was changed to fulfilled by the first resolve. The other resolves have no chance to execute anymore
 */

export const example1 = () => {
  console.log(2);

  setTimeout(() => {
    console.log(2);
  }, 0);

  const p = new Promise((resolve, reject) => {
    console.log(3);
    resolve(1000);
    console.log(4);
  });
  p.then((data) => {
    console.log(data);
  });
  console.log(5);
  // answer: 2 3 4 5 1000 2
  // summarize: Promise的then是微任务，但是promise本身是同步任务
};

export const example2 = () => {
  console.log(11);

  setTimeout(() => {
    console.log(12);

    let p = new Promise((resolve) => {
      resolve(13);
    });

    p.then((res) => {
      console.log(res);
    });

    console.log(15);
  }, 0);

  console.log(14);

  // answer: 11 14 12 15 13
};

export const example3 = () => {
  setTimeout(() => {
    // p1
    new Promise((resolve, reject) => {
      console.log(2);

      resolve("p1");

      // p2
      new Promise((resolve, reject) => {
        console.log(3);

        setTimeout(() => {
          resolve("setTimeout2");
          console.log(4);
        }, 0);

        resolve("p2");
      }).then((data) => {
        console.log(data);
      });

      setTimeout(() => {
        resolve("setTimeout1");
        console.log(5);
      }, 0);
    }).then((data) => {
      console.log(data);
    });
  }, 0);

  // answer: 2 3 p2 p1 4 5
  // summarize:
};

export const example4 = () => {
  setTimeout(() => {
    console.log(1);
  }, 0);

  // p1
  new Promise((resolve, reject) => {
    console.log(2);
    resolve("p1");

    // p2
    new Promise((resolve, reject) => {
      console.log(3);

      setTimeout(() => {
        resolve("setTimeout2");
        console.log(4);
      }, 0);

      resolve("p2");
    }).then((data) => {
      console.log(data);
    });

    setTimeout(() => {
      resolve("setTimeout1");
      console.log(5);
    }, 0);
  }).then((data) => {
    console.log(data);
  });

  console.log(6);

  // answer: 2 3 6 p2 p1 1 4 5
  // summarize: resolve执行如果没有then的触发，那么其传的值也不会输出
};

const examples = [example1, example2, example3, example4];

function dynamicExecute(number) {
  if (number >= 1 && number <= examples.length) {
    examples[number - 1]();
  } else {
    console.log("Invalid number.");
  }
}

dynamicExecute(4);
