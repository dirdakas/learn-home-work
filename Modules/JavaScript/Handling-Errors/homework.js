console.log(`
  Task #1
    Create your custom error and trigger it.
`);

function MyCustomError(message) {
  this.name = 'MyCustomError';
  this.message = message = message || 'My Custom Error Message DEFAULT'
}
MyCustomError.prototype = Error.prototype;

console.log('----------- Custom message provided for error ----------')
try {
  var e = new MyCustomError('this is my custom message');
  throw e;
} catch (e) {
  console.log('error message:::: ', e.message, e instanceof Error, e)
}

console.log('----------- Custom message was NOT provided for error ----------')
try {
  var e = new MyCustomError();
  throw e;
} catch (e) {
  console.log('error message:::: ', e.message, e instanceof Error, e)
}
