'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

const displayMovements = function(movements, sort = false) {
  // emptying container so the old spaceholder content wont be shown
  containerMovements.innerHTML = ``;
  
  // We use slice so as not to mutate the actual value, and create a copy instead
  const movs = sort ? movements.slice().sort((a, b) => a- b) : movements;
  movs.forEach(function(mov, i) {
    // determining if the movement is either deposit or withdrawal
    const type = mov > 0 ? `deposit` : `withdrawal`;
    
    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
          <div class="movements__value">${mov}€</div>
        </div>
    `;

    // afterbegin = where we want the html to be inserted
    // afterbegin = insert AFTER the beginning of the element
    // html       = the html to be inserted. in our case, it is our const "html"
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// displayMovements(account1.movements);

const createUsernames = function (acc) {
  // Iterating for all elements
  acc.forEach(function(acc) {
    acc.username = acc.owner  // "owner" is the common key property of all accounts. This contains the full name of each person
    .toLowerCase()
    .split(' ')               // Separate the whole string into an array
    .map(name => name[0])     // Here we take the first character of every string in the array 
    .join('');                // Combining the initials into one string
  })
};

// Creating usernames for all elements inside accounts array
createUsernames(accounts);
console.log("Accounts: ",accounts);

const updateUI = function(acc) {
  // Display movements
  displayMovements(acc.movements, sorted);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

let currentAccount;

// Event handler
btnLogin.addEventListener('click', function(e) {
  // Prevent form from submitting (refreshing)
  e.preventDefault();

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  // Check if pin matches, and if it exists at all
  if(currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    // Split  = Separate first and last name
    // [0]    = Get first name
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = ``;
    // Remove focus
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function(e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  inputTransferAmount.value = inputTransferTo.value = ``;

  if (amount > 0 && receiverAcc && currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username) {
      currentAccount.movements.push(-amount);
      receiverAcc.movements.push(amount);
      updateUI(currentAccount);
  }
});

btnClose.addEventListener('click', function(e) {
  e.preventDefault();

  if (inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    // Delete account
    accounts.splice(index, 1);
    
    // Hide UI
    containerApp.style.opacity = 0;
    
  }
  inputCloseUsername.value = inputClosePin.value = ``;

});

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = `${acc.balance}€`;
};
// calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (acc) {
  // Calculating incomes
  const incomes = acc.movements
  // Filtering balance to only positive values within the array
    .filter(mov => mov > 0)
  // Adding all positive values
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
  // Filtering all negative values
    .filter(mov => mov < 0)
  // Accumulating negative values to get total outcome
    .reduce((acc, mov) => acc - mov, 0);
  labelSumOut.textContent = `${out}€`;

  const interest = movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
  // Added another filter where there would only be interest on deposits that are at least 1€
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

let sorted = false;
btnSort.addEventListener('click', function(e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});




























/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;

/////////////////////////////////////////////////
// flat and flatMap methods

// const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// console.log(arr.flat());

// flat
// You can also "flatten" a nested map
// Just enter the corresponding "depth", which is "2" in this case
// The nested map will be outputted as one array
// const arrDeep = [[[1, 2 ], 3], [4, [5, 6]], 7, 8];
// console.log(arrDeep.flat(2));

// Comparison
// flat
// const overallBalance = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(overallBalance);

// flatMap
// This method could only go one level deeper
// So if you want to flatten a nested array, you still have to use flat()
// const overallBalance2 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(overallBalance2);

// EQUALITY
// Returns true if the array contains the value
// console.log(movements.includes(-130));

// SOME: CONDITION
// Returns true if there is ANY value that matches the condition
// const anyDeposits = console.log(movements.some(mov => mov > 0));
// console.log(anyDeposits);

// EVERY
// Returns true if ALL elements in the array satisfies the condition
// console.log(movements.every(mov => mov > 0));
// console.log(account4.movements.every(mov => mov > 0));

/////////////////////////////////////////////////
// Reduce Method

// acc          = accumulator
// accumulator  = accumulates value that we want to return 
// In this case, the acc will be the sum of all values
// 0            = the initial value of the accumulator

// console.log(movements);
// calcDisplaySummary(account1.movements);


/////////////////////////////////////////////////
// Chaining Method

// PIPELINE
// const totalDepositsUSD = movements
//   .filter(mov => mov < 0)
//   // Checking values of the below operation
//   // .map((mov, i, arr) => {
//   //   console.log(arr);
//   //   return mov * eurToUsd;
//   // }) 
//   .map(mov => mov * eurToUsd)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(totalDepositsUSD);

/////////////////////////////////////////////////
// Find Method

// const firstWithdrawal = movements.find(mov => mov < 0);
// console.log(movements);
// console.log(firstWithdrawal);

/////////////////////////////////////////////////
// The filter Method

// const deposits = movements.filter(function(mov) {
//   return mov > 0;
// });
// console.log("Movements: ",movements);
// console.log("Deposits: ",deposits);

// const depositsFor = [];
// for (const mov of movements) if (mov > 0) depositsFor.push(mov);
// console.log("Deposits: ", depositsFor);

// const withdrawals = movements.filter(mov => mov < 0);

// console.log("Withdrawals: ", withdrawals);

/////////////////////////////////////////////////
// Map Method

// // const movementsUSD = movements.map(function(mov) {
// //   return mov * eurToUsd;
// // });
// // console.log(movements);
// // console.log(movementsUSD);

// // The same function as above, but converted in arrow functions
// const movementsUSD1 = movements.map(mov => mov * eurToUsd);
// console.log(movements);
// console.log(movementsUSD1);

// const movementsUSDfor = [];
// for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
// console.log(movementsUSDfor);

// const movementsDescriptions = movements.map((mov, i) => `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)}`);
// console.log(movementsDescriptions);

/////////////////////////////////////////////////
// Looping Arrays

// for (const movement of movements) {
//   if (movement > 0) {
//     console.log(`You deposited ${movement}`);
//   } else {
//     console.log(`You withdrew ${Math.abs(movement)}`);
//   }
// }

// console.log('---- ForEach ----');
// // Parameters must always be in this order:
// // currentElement, index, arrayName
// movements.forEach(function(mov, i, arr) {
//   if (mov > 0) {
//     console.log(`Movement ${i+1}: You deposited ${mov}`);
//   } else {
//     console.log(`Movement ${i+1}: You deposited ${Math.abs(mov)}`);
//   }
// })

// Maximum value
// Compares current element vs acc
// const max = movements.reduce((acc, mov) => acc > mov ? acc : mov);
// console.log("Maximum value: ", max);

/////////////////////////////////////////////////
// Sort Method

// Strings
// The sort() method sorts the string values in an alphabetical order
// const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
// console.log(owners);
// console.log(owners.sort());
// console.log(owners);
// This will also change the order that the array was originally in

// Numbers
// The sort method does not work for numbers
// It will convert the numbers to string first, and then sort them alphabetically
// console.log(movements);
// Output: [200, 450, -400, 3000, -650, -130, 70, 1300]

// Logic:
// return < 0, A, B (keep order)
// return > 0, B, A (switch order)
// a = first element, b = second
// Ascending
// movements.sort((a, b) => a - b);
// console.log(movements);

// // Descending
// movements.sort((a, b) => b - a);
// console.log(movements);


/////////////////////////////////////////////////
// Arrays

// const arr = [1, 2, 3, 4, 5, 6, 7];
// Creates an empty array with 7 elements
// const x = new Array(7);
// console.log(x);
// console.log(x.map(() => 5));

// Fill method
// This will fill all elements with the value "1"
// x.fill(1);
// 1 = value to be inserted
// 3 = starting index that will be inserted
// 5 = index that will be excluded from insertion
// x.fill(1, 3, 5);
// console.log(x);

// arr.fill(23, 2, 6);
// console.log(arr);

// Create array programatically
// Array.from
// const y = Array.from({ length: 7 }, () => 1);
// console.log(y);

// Insert an underscore if there will be a parameter that will not be used
// const z = Array.from({length: 7}, (_, i) => i + 1);
// console.log(z);

// Converting labels into an array
// labelBalance.addEventListener('click', function() {
//   the from() method will create an array from the values that the querySelector extracted
//   const movementsUI = Array.from(
//     document.querySelectorAll('.movements__value'),
//   converting the element into numbers
//     el => Number(el.textContent.replace('€',''))
//   );
//   console.log(movementsUI);
// });

/////////////////////////////////////////////////
// Array Methods Practice

// Exercise 1
// const bankDepositSum = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov =>  mov > 0)
//   .reduce((sum, cur) => sum + cur, 0);
// console.log(bankDepositSum);

// // Exercise 2
// // const numDeposits1000 = accounts
// //   .flatMap(acc => acc.movements)
// //   .filter(mov => mov >= 1000).length;
// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   // Using "++count" so it will increment the value first before returning
//   // If we used postfix (count++), it will return first before incrementing, which will bring our counter back to 0
//   .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);

// console.log(numDeposits1000);

// // Exercise 3
// const { deposits, withdrawals } = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((sums, cur) => {
//     //cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
    
//     // Shorter way of doing above process:
//     sums[cur > 0 ? `deposits` : `withdrawals`] += cur;
//     return sums;
//   },
//   { deposits: 0, withdrawals: 0 }
// );

// console.log(deposits, withdrawals);

// // Exercise 4
// // Output: this is a nice title → This Is a Nice Title
// const convertTitleCase = function (title) {
//   // Capitalize first letter of the whole title
//   // slice() will create a copy of the next characters and append it to the first character
//   const capitalize = str => str[0].toUpperCase() + str.slice(1);

//   // Words that are not necessary to capitalize:
//   const exceptions = [ `a`, `an`, `and`, `the`, `but`, `or`, `on`, `in`, `with`];

//   const titleCase = title
//   // Convert all characters to lowercase
//     .toLowerCase()
//   // Create an array of the words, separated by space
//     .split(' ')
//   // Creates a new array, going through every element of the current one
//   // It will search if the current word is an exception, and if it is, it will be left as is
//   // Otherwise it will call the capitalize() function and capitalize the word
//     .map(word => (exceptions.includes(word) ? word : capitalize(word)))
//   // Join the newly created array into one, which will be passed to the constant titleCase
//     .join(' ');

//   return capitalize(titleCase);
// };

// console.log(convertTitleCase(`this is a nice title`));
// console.log(convertTitleCase(`this is a LONG title but not too long`));
// console.log(convertTitleCase(`and here is another title with an EXAMPLe`));