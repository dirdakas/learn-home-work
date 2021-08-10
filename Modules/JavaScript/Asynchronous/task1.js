console.log(`
  Task #1

    Write your own Promise class with syncThen method.

      Example:

      let promise = new MyPromise((resolve) => {
        console.log(1);
        resolve();
      }).synchThen(() => {
        console.log(2);
      }).then(() => {
        console.log(3);
      })
      console.log(4);
      //1, 2, 4, 3
`);

class MyPromise extends Promise {
  synchThen(f) {
    f();
    return this;
  }
}

let promise = new MyPromise((resolve) => {
  console.log(1);
  resolve();
}).synchThen(() => {
  console.log(2);
}).then(() => {
  console.log(3);
})
console.log(4);