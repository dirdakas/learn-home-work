console.log(`
  Task
    1. Create class, which extends from an AbstractClass
    2. Apply interfaces to class, it's method, property
    3. Use generics there
    4. Analyze transpiled code in ES5 and explain it
`);

enum LimbEnum {
  WING = 'Wing',
  PAW = 'Paw',
  TAIL = 'Tail',
  HORN = 'Horn'
}

enum LimbPossitionEnum {
  BACK = 'Back',
  LEFT_TOP = 'Left Top',
  LEFT_BOTTOM = 'Left Bottom',
  RIGHT_TOP = 'Right Top',
  RIGHT_BOTTOM = 'Right Bottom',
  FOREHEAD = 'Forehead'
}

interface ILimb {
  type: LimbEnum;
  position: LimbPossitionEnum;
  isHealthy: boolean;
  isGone?: boolean;
}

abstract class Animal {
  private DEFAULT_TARGET: string = 'none';
  private target: string = this.DEFAULT_TARGET;
  limbs: ILimb[] = [];
  private name;

  constructor(
    public type: string,
    limbs: ILimb[]
  ) {
    this.limbs = limbs;
  }

  abstract makeSound(): void;

  greet(): void {
    console.log(`Hello, I'm ${this.type} and I'm roaming the earth...`);
  }

  setTarget(target: string): void {
    this.target = target;
  }

  resetTarget(): void {
    this.target = this.DEFAULT_TARGET;
  }

  getTarget(): string {
    return this.target;
  }

  setName(name) {
    this.name = name;
  }

  whatIsMyName() {
    console.log(`My name is: ${this.name}, which is a type of ${typeof this.name}`);
  }
}

class Dog extends Animal {
  constructor() {
    super('Dog',
    [
      {
        type: LimbEnum.PAW,
        position: LimbPossitionEnum.LEFT_BOTTOM,
        isHealthy: true
      },
      {
        type: LimbEnum.PAW,
        position: LimbPossitionEnum.RIGHT_BOTTOM,
        isHealthy: true
      },
      {
        type: LimbEnum.PAW,
        position: LimbPossitionEnum.LEFT_TOP,
        isHealthy: false,
        isGone: true
      },
      {
        type: LimbEnum.PAW,
        position: LimbPossitionEnum.RIGHT_TOP,
        isHealthy: true
      }
    ])
  }

  makeSound() {
    console.log('Wuff wuff');
  }

  getMemory<T>(object: T): T {
    console.log(`Im remembering - ${typeof object} ${JSON.stringify(object)}`);

    return object;
  }
}

const dog: Dog = new Dog();
dog.greet();
dog.makeSound();
dog.setName(undefined);
dog.whatIsMyName();
dog.setName(7);
dog.whatIsMyName();
dog.setName('Voldemort');
dog.whatIsMyName();

dog.setName(['aaaa']);
dog.whatIsMyName();

const memory = dog.getMemory('Raining')
console.log(typeof memory === 'string')

const memory1 = dog.getMemory(123)
console.log(typeof memory1 === 'number')

class Person<T> {
  constructor(
    public name: string,
    public age: number,
    public nickName: T
  ) {}
}

const person1 = new Person<string>('Phil', 22, 'SemyCol')
const person2 = new Person<number>('Phil', 22, 7)

const memory2 = dog.getMemory(person1);
console.log(memory2 instanceof Person)

const memory3 =dog.getMemory(person2);
console.log(memory3 instanceof Person)