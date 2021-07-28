'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2021-07-27T21:31:17.178Z',
    '2021-07-26T07:42:02.383Z',
    '2021-07-25T09:15:04.904Z',
    '2021-07-24T10:17:24.185Z',
    '2021-07-23T14:11:59.604Z',
    '2021-07-22T17:01:17.194Z',
    '2021-07-21T23:36:17.929Z',
    '2021-07-20T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return `Today`;
  if (daysPassed === 1) return `Yesterdat`;
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth()}`.padStart(2, 0);
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

// Formatting currency per locale
const formatCur = function(value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: `currency`,
    currency: currency,
  }).format(value);
}


const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? acc.movements
    .slice()
    .sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    // Display 2 characters on the date, and append "0" if there is only 1 character
    
    const displayDate = formatMovementDate(date, acc.locale);
    
    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(out, acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }

    // Decrease 1s
    time--;
  };

  // Set time to 5 minutes
  let time = 120;

  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

// FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

// Experimenting API
// const now = new Date();
// const options = {
//   hour: `numeric`,
//   minute: `numeric`,
//   day: `numeric`,
//   month: `numeric`,
//   year: `numeric`,
//   //weekday: `short`,
// };
// const locale = navigator.locale;

// Internationalization
// labelDate.textContent = new Intl.DateTimeFormat(
//   currentAccount.locale, options
// ).format(now);


btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    const now = new Date();
    const options = {
      hour: `numeric`,
      minute: `numeric`,
      day: `numeric`,
      month: `numeric`,
      year: `numeric`,
      //weekday: `short`,
    };
    // const locale = navigator.locale;

    // Internationalization
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    
    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function() {
      // Add movement
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      // Reset timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

//// Conversion
// Adding a "+" will automatically convert the character into a number
// console.log(Number(23));
// console.log(+23);

// //// Parsing
// // This will only work if the character starts with a number
// // This will remove all characters in a string that isn't a number
// console.log(Number.parseInt(`30px`));
// console.log(Number.parseInt(`e23`));

// // The second parameter denotes which number system you are parsing
// // If we put 10, then we are specifying that the parsing below is for decimal
// console.log(Number.parseInt(`30px`, 10));
// console.log(Number.parseInt(`2.5rem`));
// // Float type considers decimal numbers, that's why in the log, it included the ".5"
// console.log(Number.parseFloat(`2.5rem`));

// // Checks if the parameter is NaN value
// console.log(Number.isNaN(20));
// // But its limitation is that it considers "infinity" as not a NaN
// console.log(Number.isNaN(20/0));
// // So to check if a value is a number, and to avoid the bug from above result, we can use isFinite()
// console.log(Number.isFinite(20/0)); // false
// console.log(Number.isFinite(20));   // true
// console.log(Number.isFinite(`20`));   // false, not a number, its a string

// //// Square root
// console.log(Math.sqrt(25));

// //// Max value
// console.log(Math.max(11,2,33,4,5)); // logs 33
// console.log(Math.min(11,2,33,4,5)); // logs 2

// //// PI
// console.log(Math.PI);

// //// Random 
// // random() = generates random numbers up to 5.99999999
// // trunc()  = truncates excess decimal after 5
// // + 1      = adds 1 so the random number will be until 6, like we intended
// console.log(Math.trunc(Math.random() * 6) + 1);

// // deconstructed random():
// const randomInt = (min, max) => Math.trunc(Math.random() * (max - min) + 1) + min;
// // logic explanation:
// // trunc()        = removes decimal
// // Math.random()  = gives us a value between 0 ~ 1
// // (max - min)    = when multipled to random, we will get 0~(max-min)
// // + min          = will be added to the value that random generated, as well as (max - min)
// // So it will be:
// // random()       = 0 ~ 1       --→ min ~ 1
// // (max - min)    = max - min   --→ max - min + min
// // Then min + min will be cancelled, so we will get min ~ max
// console.log(randomInt(10, 20));

// //// Rounding
// // Rounding integers
// console.log(Math.trunc(23.3));  //  23

// // Rounding up integers
// console.log(Math.ceil(23.3));   //  24
// // Rounding down integers
// console.log(Math.floor(23.3));  //  23

// // Rounding decimals
// console.log((2.7).toFixed(0));  //  3, in String format
// console.log((2.7).toFixed(3));  //  2.700, in String format
// // the parameter inside toFixed() will simply return the number of decimal places we want to see
// // so in the first output, it is automatically rounded up to the nearest decimal
// console.log((2.345).toFixed(2));  //  2.35, in String format
// console.log(+(2.345).toFixed(2));  //  2.35, in number format

// //// Remainder (Modulo)
// console.log(5 % 2);

// If a number is bigger than MAX_SAFE_INTEGER, then it might not be represented accurately
// console.log(Number.MAX_SAFE_INTEGER);

// //// BigInt
// // This can store numbers as large as we want
// console.log(29348832894293848283943298483289483829439n);
// // or
// console.log(BigInt(29348832894293848283943298483289483829439));

// // Operations will work the same when using bigint
// // But this will not work with other numbers that are not in bigint
// const huge = 13121213265449848949498489n;
// const num = 23;
// // so we have to convert the other into bigint
// console.log("huge * num: ",huge * BigInt(num));

// // Exceptions
// console.log(20n > 15);    //  true
// console.log(20n < 15);    //  false
// console.log(20n === 20);  //  false
// console.log(20n == `20`); //  true, due to type coercion

// // Divisions
// console.log(11n / 3n);    //  it will return the nearest bigint, which will truncate the decimal
// console.log(11 / 3);

//// Creating dates
// Create
// const now = new Date();
// console.log(now);
// console.log(new Date(`Aug 02 2020 18:05:41`));
// console.log(new Date(`December 24, 2015`));
// console.log(new Date(account1.movementsDates[0]));

// console.log(new Date(2037, 10, 19, 15, 23, 5));
// // Thu Nov 19 2037 15:23:05 GMT+0800 (Singapore Standard Time)
// // even though we inputted "10", we still got November because dates are zero-based in js
// console.log(new Date(2037, 10, 31));
// // Tue Dec 01 2037 00:00:00 GMT+0800 (Singapore Standard Time)
// // if the days exceed the days of the month, it will autocorrect to the next month

// console.log(new Date(0)); // Thu Jan 01 1970 07:30:00 GMT+0730 (Singapore Standard Time)
// console.log(new Date(3 * 24 * 60 * 60 * 1000)); // printing the day 3 days from above date
// 3    = 3 days
// 24   = hours in a day
// 60   = minutes in an hour
// 60   = seconds in a minute
// 1000 = milliseconds in a second

// Working with dates
// const future = new Date(2037, 10, 19, 15, 23);
// console.log(future);                // Thu Nov 19 2037 15:23:00
// console.log(future.getFullYear());  // 2037
// console.log(future.getMonth());     // 10 (Nov)
// console.log(future.getDate());      // 19
// console.log(future.getDay());       // 4  (Thursday)
// console.log(future.getHours());     // 15
// console.log(future.getMinutes());   // 23
// console.log(future.getSeconds());   // 0
// console.log(future.toISOString());  // 2037-11-19T07:23:00.000Z
// console.log(future.getTime());      // gets the exact millisecond since "future" date

// console.log(new Date(2142228180000));
// // this returns the same date as "future"

// console.log(Date.now());
// future.setFullYear(2070);
// console.log(future);

// const future = new Date(2037, 10, 19, 15, 23);
// console.log(+future);

// const calcDaysPassed = (date1, date2) =>
//   (date2 - date1) / (1000 * 60 * 60 * 24);

// const days1 = calcDaysPassed(new Date(2037, 3, 4),
// new Date(2037, 3, 14));
// console.log(days1);

//// Timers

/// setTimeout
// This will add a delay to the execution
// const ingredients = [`olives`, `spinach`];
// const pizzaTimer = setTimeout(
//   (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}`),
//   3000,
//   ...ingredients
// );

// Same timer but without arguments:
// const pizzaTimer = setTimeout(() => console.log(`Message`), 3000);

// console.log(`Waiting...`);

// if (ingredients.includes(`spinach`)) clearTimeout(pizzaTimer);

// /// setInterval
// // This will keep being executed per INTERVAL, which we set at 1000ms, or 1 second
// setInterval(function() {
//   const now = new Date();
//   console.log(now);
// }, 1000);