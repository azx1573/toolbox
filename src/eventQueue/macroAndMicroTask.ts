/**
 * macro task and micro task sets
 * summarize:
 * 1. the method of method in Promise is a micro-task, but the Promise itself is a synchronous task
 * 2. resolve has no effect without method of the
 * 3. once the state of Promise was changed to fulfilled by the first resolve. The other resolves have no chance to execute anymore
 * 4. await is also belong to micro task
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
};

export const example5 = () => {
  async function async1() {
    console.log("async1 start");
    await async2();
    console.log("async1 end");
  }

  async function async2() {
    console.log("async2");
  }

  console.log("script start");

  setTimeout(() => {
    console.log("setTimeout");
  }, 0);

  async1();
  // answer:script start => async1 start => async2 => async1 end => setTimeout
};

export const example6 = () => {
  debugger;
  async function asyncFunction() {
    console.log("asyncFunction start");
    // p1
    await new Promise((resolve) => {
      console.log("Promise in asyncFunction");
      resolve("First Promise resolved");
    });
    console.log("asyncFunction after await");
  }
  // p2
  new Promise((resolve) => {
    console.log("First Promise");
    resolve("second Promise resolved");
  }).then((data) => {
    console.log(data);
  });

  asyncFunction();
  // p3
  new Promise((resolve) => {
    console.log("Second Promise");
    resolve("third Promise resolved");
  }).then((data) => {
    console.log(data);
  });

  console.log("Global sync code");
  // Answer：First Promise => asyncFunction start => Promise in asyncFunction => Second Promise => Global sync code => second Promise resolved => asyncFunction after await => third Promise resolved
};

const examples = [example1, example2, example3, example4, example5, example6];

function dynamicExecute(number) {
  if (number >= 1 && number <= examples.length) {
    examples[number - 1]();
  } else {
    console.log("Invalid number.");
  }
}

dynamicExecute(6);
