console.log(`
  Task 1.
    Create a function runningAverage() that returns a callable function object.
    Update the series with each given value and calculate the current average.

    rAvg = runningAverage();
    rAvg(10) = 10.0;
    rAvg(11) = 10.5;
    rAvg(12) = 11;
`);

const runningAverage = () => {
  let sum = 0;
  let timesCalled = 0;

  return (newVal) => {
    if (newVal) {
      sum += newVal;
      timesCalled ++;
  
      return sum / timesCalled;
    }
  };
};

let rAvg = runningAverage();
console.log(rAvg(10));
console.log(rAvg(11));
console.log(rAvg(12));


console.log('----------');
console.log(`
  Task 2.
    Write a sum function which will work properly when invoked using syntax below.

    sum(2, 3); // Outputs	5
    sum(2)(3); // Outputs	5
    sum(1)(2)(3)(4); // Outputs	10

    *** Locally it seems that there is an issue with JS. Works fine with \`jsfiddle\`[https://jsfiddle.net/47aubz9j/]
`);

const sum = (...arg1) => {
  let currentSum = arg1.reduce((a, b) => a + b, 0);

  const f = (...arg2) => {
    currentSum += arg2.reduce((a, b) => a + b, 0);
    return f;
  };

  f.toString = () => currentSum.toString();

  return f;
}

console.log(sum(2, 3));
console.log(sum(2)(3));
console.log(sum(1)(2)(3)(4));
