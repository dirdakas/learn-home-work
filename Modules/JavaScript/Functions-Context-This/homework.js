console.log(`
  Task.

    Create a function NamedOne which takes first & last names as parameters
    and returns an object with firstName, lastName and fullName ( = firstName + a space + lastName ) properties
    which should be all accessible.
`);

function NamedOne(firstName, lastName) {
  this._firstName = firstName;
  this._lastName = lastName;
  this._fullName = lastName;
}

Object.defineProperty(NamedOne.prototype, 'firstName', {
  get: function() {
    return this._firstName;
  },
  set: function(newName) {
    this._firstName = newName;
  }
});

Object.defineProperty(NamedOne.prototype, 'lastName', {
  get: function() {
    return this._lastName;
  },
  set: function(newLastName) {
    this._lastName = newLastName;
  }
});

Object.defineProperty(NamedOne.prototype, 'fullName', {
  get: function() {
    return `${this._firstName} ${this._lastName}`;
  },
  set: function(fullName) {
    const splits = fullName.split(' ');
    console.log('splits', splits)
    if (splits.length === 2) {
      this._firstName = splits[0];
      this._lastName = splits[1];
      this._fullName = `${splits[0]} ${splits[1]}`
    }
  }
});


const	namedOne = new NamedOne('Naomi', 'Wang');
console.log('------ initialisation of data', namedOne)
console.log(namedOne.firstName, namedOne.firstName === 'Naomi');
console.log(namedOne.lastName, namedOne.lastName === 'Wang');
console.log(namedOne.fullName, namedOne.fullName === 'Naomi Wang');

namedOne.firstName = 'John'
namedOne.lastName = 'Doe'
console.log('------ changing data', namedOne)
console.log(namedOne.firstName, namedOne.firstName === 'John');
console.log(namedOne.lastName, namedOne.lastName === 'Doe');
console.log(namedOne.fullName, namedOne.fullName === 'John Doe')

namedOne.fullName	=	'Bill Smith';
console.log('------ changing data', namedOne)
console.log(namedOne.firstName, namedOne.firstName === 'Bill');
console.log(namedOne.lastName, namedOne.lastName === 'Smith');
console.log(namedOne.fullName, namedOne.fullName === 'Bill Smith');

namedOne.fullName	=	'Tom'	//	->	no	:	lastName	missing
console.log('------ changing data', namedOne)
console.log(namedOne.firstName, namedOne.firstName === 'Bill');
console.log(namedOne.fullName, namedOne.fullName === 'Bill Smith');
namedOne.fullName	=	'TomDonnovan'	//	->	no	:	no	space	between	first	&	last	names
console.log('------ changing data', namedOne)
console.log(namedOne.firstName, namedOne.firstName === 'Bill');
console.log(namedOne.fullName, namedOne.fullName === 'Bill Smith');
