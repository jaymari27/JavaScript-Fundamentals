'use strict';

///////////////////////////////////////
// CODING CHALLENGE #2

(function () {
    const header = document.querySelector('h1');
    header.style.color = 'red';
  
    // Why did this work?
    // Since this is an IIFE, this should have been done and this event listener below shouldn't have worked
    // My understanding: Since it is inside the IIFE function, it is technically inside its reference. Since functions remember all variables in the references of its parent, then it is able to take the variable "header" and execute its own functionality
    document.querySelector('body').addEventListener('click', function () {
      header.style.color = 'blue';
    });
})();

/*

///////////////////////////////////////
// Closures

// Global scope
const secureBooking = function() {
    let passengerCount = 0;

    return function() {
        passengerCount++;
        console.log(`${passengerCount} passengers`);
    }
}

// booker acts as a "child" scope to secureBooking
// And ANY function has access to the variable environments of the execution context in which the function was created
// So in this case, booker was "born" in the execution context of secureBooking
// so since booker is INITIALIZED with secureBooking, it will always have access to its variables
// reference = execution context
// This is what closure is
const booker = secureBooking();

// This will update the passengerCount despite being re-initialized in the function
booker();   // 1 passenger
booker();   // 2
booker();   // 3

// Example 1

let f;

const g = function () {
    const a = 23;
    f = function() {
        console.log(a * 2);
    }
}

const h = function () {
    const b = 777;
    f = function() {
        console.log(b * 2);
    }
}

// "f" was overwritten and was able to access due to the closure
g();
f();
// Re-assigning f function
h();
f();
console.dir(f); // shows that f function now has "h" closure

// Example 2

const boardPassengers = function(n, wait) {
    const perGroup = n/3;
    
    // function = function to be executed
    // 1000     = how many milliseconds it takes before the function is executed
    setTimeout(function(){
        console.log(`We are now boarding all ${n} passengers`);
        console.log(`There are 3 groups, each with ${perGroup} passengers`);
    }, wait* 1000);
    // multiply by 1000 since the input will be in seconds
}

boardPassengers(180, 3);




///////////////////////////////////////
// CODING CHALLENGE # 1

const invalidInput = () => {
    alert(`That's not a valid input. Please enter again`);
};


const poll = {
    question: 'What is your favourite programming language?',
    options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
    answers: new Array(4).fill(0),
    // 1.1
    registerNewAnswer () {
        const userInput = Number(prompt(`${this.question}\n${this.options.join('\n')}`));
        // 1.2
        if (isNaN(userInput)) {
            invalidInput();
            this.registerNewAnswer();
        } else {
            if (userInput > this.answers.length) {
                invalidInput();
                this.registerNewAnswer();
            } else if (userInput < 0) {
                invalidInput();
                this.registerNewAnswer();
            } else {
                this.answers[userInput]++;
                this.displayResults('string');
            }
        }
    },

    // 3
    displayResults(type = 'array') {
        if (type === 'array') {
            alert(this.answers);
        } else if (type === 'string') {
            alert(`Poll results are ${this.answers.join(', ')}`);
        }
    },
};

// 2
document.querySelector('.poll').addEventListener('click', poll.registerNewAnswer.bind(poll));

// Test Data
// poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
// poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');
// poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });
///////////////////////////////////////
// The call and apply Methods

const lufthansa = {
    airline: 'Lufthansa',
    iataCode: 'LH',
    bookings: [],
    // book: function() {}
    book(flightNum, name) {
      console.log(
        `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
      );
      this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
    },
  };
  
  lufthansa.book(239, 'Jonas Schmedtmann');
  lufthansa.book(635, 'John Smith');
  
  const eurowings = {
    airline: 'Eurowings',
    iataCode: 'EW',
    bookings: [],
  };
  
  // Creating a function using function values from lufthansa.book
  const book = lufthansa.book;
   
  // Call method
  // Syntax: functionName.call(objectName, arg1, argN...)
  book.call(eurowings, 23, 'Sarah Williams');
  console.log(eurowings);
  
  book.call(lufthansa, 239, 'Mary Cooper');
  console.log(lufthansa);
  
  const swiss = {
    airline: 'Swiss Air Lines',
    iataCode: 'LX',
    bookings: [],
  };
  
  book.call(swiss, 583, 'Mary Cooper');
  
  // Apply method
  // not used in modern js
  // basically this edits the contents
  const flightData = [583, 'George Cooper'];
  book.apply(swiss, flightData);
  console.log(swiss);
  
  book.call(swiss, ...flightData);
  
  ///////////////////////////////////////
  // The bind Method
  // book.call(eurowings, 23, 'Sarah Williams');
  
  // creates a new function, binded with objectName that calls it
  const bookEW = book.bind(eurowings);
  const bookLH = book.bind(lufthansa);
  const bookLX = book.bind(swiss);
  
  bookEW(23, 'Steven Williams');

  // With EventListeners
  lufthansa.planes = 300;
  lufthansa.buyPlane = function () {
      console.log(this);
      this.planes++;
      console.log(this.planes);
  }
  lufthansa.buyPlane;

  // Binding this to lufthansa will bind 「this」→「lufthansa」
  // So it won't just be undefined
  document.querySelector('.buy').addEventListener('click',lufthansa.buyPlane.bind(lufthansa));

  // Partial Application
  const addTax = (rate, value) => value + value * rate;
  console.log(addTax(0.1, 200))
  const addVat = addTax.bind(null, 0.23);
  // addVat = value => value + value * 0.23

  console.log(addVat(100));
  console.log(addVat(23));

  // Other way of doing this without bind method:
  const addTaxRate = function (rate) {
      return function (value) {
          return value + value * rate;
      };
  };

  console.log(addVat(100));
  console.log(addVat(23));

const greet = greeting => name => console.log(`${greeting} ${name}`);

const greeterHey = greet('Hey');

greet('Hello')('Jonas');
*/