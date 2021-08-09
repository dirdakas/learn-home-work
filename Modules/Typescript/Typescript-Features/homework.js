var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
console.log("\n  Task\n    1. Create class, which extends from an AbstractClass\n    2. Apply interfaces to class, it's method, property\n    3. Use generics there\n    4. Analyze transpiled code in ES5 and explain it\n");
var LimbEnum;
(function (LimbEnum) {
    LimbEnum["WING"] = "Wing";
    LimbEnum["PAW"] = "Paw";
    LimbEnum["TAIL"] = "Tail";
    LimbEnum["HORN"] = "Horn";
})(LimbEnum || (LimbEnum = {}));
var LimbPossitionEnum;
(function (LimbPossitionEnum) {
    LimbPossitionEnum["BACK"] = "Back";
    LimbPossitionEnum["LEFT_TOP"] = "Left Top";
    LimbPossitionEnum["LEFT_BOTTOM"] = "Left Bottom";
    LimbPossitionEnum["RIGHT_TOP"] = "Right Top";
    LimbPossitionEnum["RIGHT_BOTTOM"] = "Right Bottom";
    LimbPossitionEnum["FOREHEAD"] = "Forehead";
})(LimbPossitionEnum || (LimbPossitionEnum = {}));
var Animal = /** @class */ (function () {
    function Animal(type, limbs) {
        this.type = type;
        this.DEFAULT_TARGET = 'none';
        this.target = this.DEFAULT_TARGET;
        this.limbs = [];
        this.limbs = limbs;
    }
    Animal.prototype.greet = function () {
        console.log("Hello, I'm " + this.type + " and I'm roaming the earth...");
    };
    Animal.prototype.setTarget = function (target) {
        this.target = target;
    };
    Animal.prototype.resetTarget = function () {
        this.target = this.DEFAULT_TARGET;
    };
    Animal.prototype.getTarget = function () {
        return this.target;
    };
    Animal.prototype.setName = function (name) {
        this.name = name;
    };
    Animal.prototype.whatIsMyName = function () {
        console.log("My name is: " + this.name + ", which is a type of " + typeof this.name);
    };
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super.call(this, 'Dog', [
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
        ]) || this;
    }
    Dog.prototype.makeSound = function () {
        console.log('Wuff wuff');
    };
    Dog.prototype.getMemory = function (object) {
        console.log("Im remembering - " + typeof object + " " + JSON.stringify(object));
        return object;
    };
    return Dog;
}(Animal));
var dog = new Dog();
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
var memory = dog.getMemory('Raining');
console.log(typeof memory === 'string');
var memory1 = dog.getMemory(123);
console.log(typeof memory1 === 'number');
var Person = /** @class */ (function () {
    function Person(name, age, nickName) {
        this.name = name;
        this.age = age;
        this.nickName = nickName;
    }
    return Person;
}());
var person1 = new Person('Phil', 22, 'SemyCol');
var person2 = new Person('Phil', 22, 7);
var memory2 = dog.getMemory(person1);
console.log(memory2 instanceof Person);
var memory3 = dog.getMemory(person2);
console.log(memory3 instanceof Person);
