console.log(`
  Task.

    Write a myNew function that replicates all the behavior of the new operator.
    This function should take one function parameter (the constructor), plus an unknown 
      number of additional parameters of any type (arguments for the constructor).
    When invoked, myNew should do everything new does and return the same object new 
    would evaluate to, as specified below:
    
      var john = myNew(Person, 'John', 30) - should work the same as:
      var john = new Person('John', 30);
`);

function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.introduce = function(){
  return `My name is ${this.name} and I am ${this.age}`;
};

function myNew(classType, ...args) {
  const o = Object.create(classType.prototype);
  const c = classType.call(o, ...args)
  
  if (c instanceof Object || c instanceof Function) {
    return c;
  } else {
    return o;
  }
}

const john = new Person('John', 30);
const jack = new Person('Jack', 40);

console.log( john.introduce(), john.introduce() === 'My name is John and I am 30');
console.log( jack.introduce(), jack.introduce() === 'My name is Jack and I am 40');
console.log('-------');

const newJohn = myNew(Person, 'John', 30);
console.log( newJohn, newJohn.introduce(), newJohn.introduce() === 'My name is John and I am 30');