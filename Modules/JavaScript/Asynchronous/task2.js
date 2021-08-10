console.log(`
  Task #2

    Write ReversePromise class so that ‘then’ functions are calling from the end to the start. 

      Example:

      let promise = new ReversePromise((resolve) => {
        console.log(1);
        resolve();
      })
      .then(() => console.log(2))
      .then(() => console.log(3))
      .then(() => console.log(4))
      //1, 4, 3, 2
`);

class ReversePromise extends Promise {
  list = [];

  then(b) {
    this.list.push(b);

    setTimeout(() => {
      if (this.list.length > 0) {
        this.list.reverse().forEach(item => item());
        this.list = [];
      }
    }, 0)

    return this;
  }
}

let promise = new ReversePromise((resolve) => {
  console.log(1);
  resolve();
})
.then(() => console.log(2))
.then(() => console.log(3))
.then(() => console.log(4))