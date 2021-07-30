'use strict';

/*
///////////////////////////////////////
// Constructor Functions and the new Operator

// Use uppercase for constructor functions
const Person = function (firstName, birthYear) {
  // console.log(this);
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  /// Creating methods inside functions:
  // Never to this! Since in every instance of Person, they will all have a declaration of this method. This creates MUDA
  // this.calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // };
};

// Constructor functions use "new"
const jonas = new Person('Jonas', 1991);
console.log(jonas);

//// We need the "new" object since constructor functions don't have them. In order for them to use the "this" keyword, we need the "new" keyword
///////////////////////////////////////
/// What happens with "new" keyword:///
///////////////////////////////////////
// 1. An empty object is created
// 2. "this" keyword in constructor function call is set to the new object
// 3. The new object is linked (__proto__ property) to the constructor function's prototype property
/// __proto__ always points to an object's prototype
// 4. The new object is returned from the constructor function call

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
console.log(matilda, jack);

// matilda, jack, and jonas are all instances of Person
console.log(jonas instanceof Person);

Person.hey = function () {
  console.log('Hey there 👋');
  console.log(this);
};
Person.hey();
// The code below will result in a TypeError, since the hey() property is not in the prototype of jonas, so he doesn't have access to it.
// jonas.hey();
*/

/*
///////////////////////////////////////
// Prototypes
// All objects created through the constructor function will inherit all properties and methods inside the function. In this case, when we add a prototype "calcAge" to the function "Person", all instances that refer back to "Person" will have access to "calcAge". So jonas, jack, and matilda can all access "calcAge", even though it won't appear to the object themselves. This is especially useful since we don't need to have a separate copy to each object (jack, matilda, jonas), but instead we will have ONE copy of this prototype.
console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge();
matilda.calcAge();

// __proto__ will view all prototypes that the object "jonas" have access to
console.log(jonas.__proto__);
console.log(jonas.__proto__ === Person.prototype);

// Since this prototype is not declared in function "Person", it will return as "FALSE" in the below log. Only jonas and matilda has access to it.
console.log(Person.prototype.isPrototypeOf(jonas));
console.log(Person.prototype.isPrototypeOf(matilda));
console.log(Person.prototype.isPrototypeOf(Person));

// .prototyeOfLinkedObjects

// all objects will inherit this prototype "species" and its value "Homo Sapiens"
Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species, matilda.species);

// An object will only have a property if it was declared inside it. That's why jonas has the property "firstName", but not "species". jonas only has access to "species", but he does not own it.
console.log(
  "jonas.hasOwnProperty('firstName')",
  jonas.hasOwnProperty('firstName')
);
console.log("jonas.hasOwnProperty('species')", jonas.hasOwnProperty('species'));
*/

/*
///////////////////////////////////////
// Prototypal Inheritance on Built-In Objects

// view prototypes that jonas has access to
console.log(jonas.__proto__);

// view prototype of object.prototype
console.log(jonas.__proto__.__proto__);

// object.prototype is already on top of the prototype chain, therefore its prototype is null
console.log(jonas.__proto__.__proto__.__proto__);

// this will point back to Person, since it is the constructor function
console.dir(Person.prototype.constructor);

const arr = [3, 6, 6, 5, 6, 9, 9]; // new Array === []
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);

console.log(arr.__proto__.__proto__);

// Assigning unique value to the array
// All arrays will have access to this method
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

const h1 = document.querySelector('h1');
console.dir(x => x + 1);
*/

/*
///////////////////////////////////////
// Coding Challenge #1


// 1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
// 2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
// 3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
// 4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

// DATA CAR 1: 'BMW' going at 120 km/h
// DATA CAR 2: 'Mercedes' going at 95 km/h

// GOOD LUCK 😀


const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

// Creating a method "accelerate" outside of "Car" to optimize performance
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

// Both prototypes can manipulate the properties inside the constructor function "Car" since they all have access to its data, since they are being inherited
bmw.accelerate();
bmw.accelerate();
bmw.brake();
bmw.accelerate();

*/

/*
///////////////////////////////////////
// ES6 Classes

// Class expression
// const PersonCl = class {}

// Class declaration
class PersonCl {
  // constructor method is the same as constructor functions
  // We pass arguments to the constructor that we want the object to have
  // So when we call this object PersonCl, it will execute all inside the constructor method and return values inside it
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  /// Instance methods
  // Methods will be added to .prototype property
  // These are methods that instances will have access to
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  /// Set a property that already exists
  // We initialized "fullName" already so it already exists in above code, then we created a setter of the same name. What this does is that whenever that initialization of "this.fullName" is executed, then the setter "fullName" is going to be executed in its place. So when we initialize fullName, the setter will validate its input first before passing the value to the this.fullName property.
  // We set it to "this._fullName" because this is not the same this.fullName with the one above. We need to declare a new variable, so we put an underscore there as common practice.
  // Checking if the entered value is a full name
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  /// Static method
  // These methods are not available to the instances
  static hey() {
    console.log('static hey(): Hey there 👋');
    console.log(this);
  }
}

const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica);
jessica.calcAge();
console.log(jessica.age);

console.log(
  'jessica.__proto__ === PersonCl.prototype',
  jessica.__proto__ === PersonCl.prototype
);

// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };
jessica.greet();

// 1. Classes are NOT hoisted. Meaning, we can't refer these classes before they are declared in the code.
// 2. Classes are first-class citizens. We can pass them into functions, and also return them from functions.
// 3. Classes are executed in strict mode. Even if we didn't activate strict mode in the js file, the classes will still be executed as if we did.

const walter = new PersonCl('Walter White', 1965);
// PersonCl.hey();
*/

/*
///////////////////////////////////////
// Setters and Getters
const account = {
  owner: 'Jonas',
  movements: [200, 530, 120, 300],

  // getter sample
  get latest() {
    return this.movements.slice(-1).pop();
  },

  // setter sample
  set latest(mov) {
    this.movements.push(mov);
  },
};

// These are read as properties
console.log(account.latest);

account.latest = 50;
console.log(account.movements);
*/

/*
///////////////////////////////////////
// Object.create
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

// Create empty object "steven"
const steven = Object.create(PersonProto);
console.log('Empty steven object:', steven);
// Assigning values to steven's prototypes
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();

console.log(
  'steven.__proto__ === PersonProto',
  steven.__proto__ === PersonProto
);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();
*/

/*
///////////////////////////////////////
// Coding Challenge #2

// 1. Re-create challenge 1, but this time using an ES6 class;
// 2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
// 3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
// 4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

// DATA CAR 1: 'Ford' going at 120 km/h

// GOOD LUCK 😀

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const ford = new CarCl('Ford', 120);
console.log(ford.speedUS);
ford.accelerate();
ford.accelerate();
ford.brake();
ford.speedUS = 50;
console.log(ford);
*/

///////////////////////////////////////
// Inheritance Between "Classes": Constructor Functions

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

/// Student constructor function
const Student = function (firstName, birthYear, course) {
  /// Below code is not optimal, since we do not want a repeat of codes. All we need to do is call the Person function and pass our data there. This way, we can ensure that our Student function is flexible to possible changes in Person.
  // this.firstName = firstName;
  // this.birthYear = birthYear;
  /// We do a function call using the call() method and include a "this" keyword in the parameters to set the referred object, so the "this" in Person function is not undefined. Leaving it undefined will result in an error.
  Person.call(this, firstName, birthYear);
  this.course = course;
};

/// Linking prototypes
// Student.prototype now inherits Person.prototype, therefore it has access to everything that happens in Person.prototype
// Prototype linking must be done before creating more methods under Student.prototype because object.create will return an empty object because otherwise, object.create will overwrite all created methods under Student.prototype. Basically the Student.prototype will become an empty object as well.
Student.prototype = Object.create(Person.prototype);

/// We should not link prototypes this way:
// Student.prototype = Person.prototype;
/// Explanation: This will make their prototypes into one, which we do not want. These two are different objects, that's why we must create separate objects for them.
/// My POV: This is similar to database design. For example, Student and Person are databases. Students have a studentID identifier, then their studentID is linked to the Person database, which contains their personal information, like the firstName and birthYear. These data are unnecessary to be included in the Student database, that's why we conduct normalization and pass those unnecessary data to a different database.

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

/// linking the "mike" object to Student, which then gives it access to the Person prototype, since the Student function is linked there
const mike = new Student('Mike', 2020, 'Computer Science');
mike.introduce();
mike.calcAge();

console.log('mike.__proto__', mike.__proto__);
console.log('mike.__proto__.__proto__', mike.__proto__.__proto__);

/// Checking if the prototype chain is as intended
// This will return true since we initialized mike as a Student
console.log('mike instanceof Student', mike instanceof Student);
// This is also true since mike is a Student, which inherits Person because we linked them together
console.log('mike instanceof Person', mike instanceof Person);
// This is true, since at the top of the chain, Person inherits Object
console.log('mike instanceof Object', mike instanceof Object);

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

///////////////////////////////////////
// Coding Challenge #3

// 1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
// 2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
// 3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
// 4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

// DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

// GOOD LUCK 😀

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

/// Link the prototypes
// EV will inherit Car
EV.prototype = Object.create(Car.prototype);

// Create methods after linking
EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

/// Polymorphism: The child class can overwrite a property of its parent with the same name. In the code above, we can see that we declared Car.prototype.accelerate. In below code, EV created its own prototype "accelerate". Since we set EV to inherit Car, it is technically its child object. As the child object, it is able to overwrite the property of its parent, so this is the property that was executed in the log.
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} is going at ${this.speed} km/h, with a charge of ${this.charge}`
  );
};

const tesla = new EV('Tesla', 120, 23);
tesla.chargeBattery(90);
console.log(tesla);
tesla.brake();
tesla.accelerate();

///////////////////////////////////////
// Inheritance Between "Classes": ES6 Classes

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance methods
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // Static method
  static hey() {
    console.log('Hey there 👋');
  }
}

/// Other way of linking prototypes
// StudentCl
class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // The super() class is necessary when we are using the "extends" keyword
    // super function call needs to happen first, sincec this is responsible for creating the "this" keyword in this subclass
    // In super functions, we don't need to specify the parent object name since it is already specified after the "extends" keyword in above code.
    super(fullName, birthYear);
    // It's unnecessary to initialize this.course since the super function will be passed the arguments that the constructor() already has
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student I feel more like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}

const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
martha.introduce();
martha.calcAge();

///////////////////////////////////////
// Inheritance Between "Classes": Object.create

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

/// Adding a prototype in the middle of the chain
const steven = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);

// Initializing in init method so we don't have to do it for every student object
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
// Initialization of student jay's information
jay.init('Jay', 2010, 'Computer Science');
jay.introduce();
jay.calcAge();

///////////////////////////////////////
// Encapsulation: Protected Properties and Methods
// Encapsulation: Private Class Fields and Methods

/// 1) Public fields
// these are data that outside users have access to, and are allowed to manipulate
/// 2) Private fields
// these are data that outside users must not be able to manipulate
/// 3) Public methods
// these are methods that outside users have access to, and are allowed to manipulate
/// 4) Private methods
// these are methods that outside users must not be able to manipulate
/// (there is also the static version)

class Account {
  /// 1) Public fields (instances)
  // no need to initialize it as "const" or "let" or "var"
  // These are fields that are available on every created object, or every instance created by this class. So below, we created the instance "acc1", so since it is created by this class, it has access to its public fields.
  locale = navigator.language;

  /// 2) Private fields (instances)
  // Parang static variable, within the class lang pwede marefer. That's we declare them outside of the subclasses, so that all of them has access to it.
  // So basically the class Account is our self-part, and the user is the other Part that does not have access to our static variables.
  #movements = [];
  #pin;

  // The constructor method is called by "new" operator, which creates a "this" object. This method is mandatory in regular class, but it may be omitted in a child class.
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;

    /// Protected property
    // these are data that should be private, but are technically not since javascript does not support it
    // this._movements = [];
    // this.locale = navigator.language;

    console.log(`constructor: Thanks for opening an account, ${owner}`);
  }

  /// 3) Public methods

  /// Public interface
  // users can view their movements but are not able to manipulate them
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    // if (this.#approveLoan(val)) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log(`requestLoan(val): Loan approved`);
      return this;
    }
  }

  // the static methods are not available on all the instances but only on the class itself, so its the same as static variables. It will work within self part only
  // This cannot access instance properties nor methods, only static ones.
  static helper() {
    console.log('static helper(): Helper');
  }

  /// 4) Private methods
  // In the real world, there are functions that we should not have access to. In this example, approveLoan must not be executable by the user. This should only be called by the requestLoan
  // #approveLoan(val) {
  _approveLoan(val) {
    return true;
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);

// acc1._movements.push(250);
// acc1._movements.push(-140);
// acc1.approveLoan(1000);

acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
console.log('acc1.getMovements(): ', acc1.getMovements());
console.log('acc1: ', acc1);
Account.helper();

// console.log(acc1.#movements);
// console.log(acc1.#pin);
// console.log(acc1.#approveLoan(100));

/// Chaining
// In order for methods to be chainable, they must have a "return" value. So up there, the methods deposite, withdraw, and requestLoan all have return values.
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
console.log('acc1.getMovements(): ', acc1.getMovements());

///////////////////////////////////////
// Coding Challenge #4

// 1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
// 2. Make the 'charge' property private;
// 3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

// DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

// GOOD LUCK 😀

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

class EVCl extends CarCl {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} is going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }`
    );
    return this;
  }
}

const rivian = new EVCl('Rivian', 120, 23);
console.log(rivian);
// console.log(rivian.#charge);
rivian
  .accelerate()
  .accelerate()
  .accelerate()
  .brake()
  .chargeBattery(50)
  .accelerate();

console.log('rivian.speedUS: ', rivian.speedUS);
