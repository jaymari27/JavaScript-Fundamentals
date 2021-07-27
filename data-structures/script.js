'use strict';

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Sample Output:
// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

// taking the first 3 letters and converting them to uppercase
// then remove the rest of the characters
// Syntax: array.slice(start, end)
const getCode = str => str.slice(0, 3).toUpperCase();

for (const flight of flights.split('+')) {
  // Separating values by ';' character, then creating const variables from them
  const [type, from, to, time] = flight.split(';');
  // replacing the underscore with blank space, and adding an emoji beforehand
  const output = `${type.startsWith('_Delayed') ? '🔴' : ''}${type.replaceAll(
    '_',
    ' '
  )} ${getCode(from)} ${getCode(to)} (${time.replace(':', 'h')})`.padStart(36);
  // send "from" and "to" data to getCode to format both values
  console.log(output);
}

///////////////////////////////////////////////////
// CODING CHALLENGE # 4
/*
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

// 1
// Conversion function on button click
document.querySelector('button').addEventListener('click', function () {
  // Extracting values
  const text = document.querySelector('textarea').value;
  // new line to separate per rows
  const rows = text.split('\n');

  // Text conversion
  for (const [i, row] of rows.entries()) {
    // toLowerCase  =   change all characters to lowercase
    // trim         =   remove spaces
    // split        =   separate characters by "_"
    const [first, second] = row.toLowerCase().trim().split('_');

    // Capitalizing the first letter of the second word
    // Syntax: replace(originalWord, wordYouWant)
    // so basically we want to replace second[0] with an uppercase second[0]
    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;
    // padEnd = adds padding at the end of string
    // placing the emoji after the padding ensures that they all start at the same time
    // repeat will repeat it according to the current index
    console.log(`${output.padEnd(20)}${'✅'.repeat(i + 1)}`);
  }
});


// THIS TEST DATA (pasted to textarea)
// underscore_case
//  first_name
// Some_Variable 
//   calculate_AGE
// delayed_departure

// SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
// underscoreCase      ✅
// firstName           ✅✅
// someVariable        ✅✅✅
// calculateAge        ✅✅✅✅
// delayedDeparture    ✅✅✅✅✅



const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';



///////////////////////////////////////////////////
// CODING CHALLENGE # 3
/*
// Test Data
const gameEvents = new Map([
    [17, '⚽️ GOAL'],
    [36, '🔁 Substitution'],
    [47, '⚽️ GOAL'],
    [61, '🔁 Substitution'],
    [64, '🔶 Yellow card'],
    [69, '🔴 Red card'],
    [70, '🔁 Substitution'],
    [72, '🔁 Substitution'],
    [76, '⚽️ GOAL'],
    [80, '⚽️ GOAL'],
    [92, '🔶 Yellow card'],
]);

// 1
const events = [...new Set(gameEvents.values())];
console.log(events);

// 2
gameEvents.delete(64);
console.log(gameEvents.entries());

// 3
console.log(
    `An event happened, on average, every ${90 / gameEvents.size} minutes`
);

// 4
for ( const [ time, event ] of gameEvents ) {
    const half = time <= 45 ? 'FIRST' : 'SECOND';
    console.log(`[${half}] HALF ${time}: ${event}`);
}

///////////////////////////////////////////////////
// CODING CHALLENGE #2

Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀


const game = {
    team1: 'Bayern Munich',
    team2: 'Borrussia Dortmund',
    players: [
      [
        'Neuer',
        'Pavard',
        'Martinez',
        'Alaba',
        'Davies',
        'Kimmich',
        'Goretzka',
        'Coman',
        'Muller',
        'Gnarby',
        'Lewandowski',
      ],
      [
        'Burki',
        'Schulz',
        'Hummels',
        'Akanji',
        'Hakimi',
        'Weigl',
        'Witsel',
        'Hazard',
        'Brandt',
        'Sancho',
        'Gotze',
      ],
    ],
    score: '4:0',
    scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
    date: 'Nov 9th, 2037',
    odds: {
      team1: 1.33,
      x: 3.25,
      team2: 6.5,
    },
};

// 1
const playerScore = game.scored;
for (const [i, player] of playerScore.entries()) {
    console.log(`Goal ${i+1}: ${player}`);
}

// 2
const allOdds = Object.values(game.odds);
let val = 0;
let ave = 0;
for (const el of allOdds) {
    val += el;
}
ave = val/allOdds.length;
console.log(`Average of odds: ${ave}`);

/*
Odd of victory Bayern Munich: 1.33
Odd of draw: 3.25
Odd of victory Borrussia Dortmund: 6.5


// 3
for (const [team, odd] of Object.entries(game.odds)) {
    // It will print "Victory" message when it returns as FALSE on "x" - which is the property name for our draw value
    const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`;
    console.log(`Odd of ${teamStr} ${odd}`);
}



/*
const openingHours = {
    thu: {
        open: 12,
        close: 22,
    },
    fri: {
        open: 11,
        close: 23,
    },
    sat: {
        open: 0, // open 24 hours
        close: 24,
    },
};

const restaurant = {
    name: `Classico Italiano`,
    location: `Via Angelo Tavanti 23, Firenze, Italy`,
    categories: [`Italian`,`Pizzeria`,`Vegetarian`,`Organic`],
    starterMenu: [`Focaccia`,`Bruschetta`,`Garlic Bread`,`Caprese Salad`],
    mainMenu: [`Pizza`,`Pasta`,`Risotto`],
    openingHours,

    // Function will return an array
    order: function (starterIndex, mainIndex) {
        return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
    },

    orderDelivery: function ({
        starterIndex = 1,
        mainIndex = 0,
        time = '20:00',
        address,
    }) {
        console.log(
            `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
        );
    },

    orderPasta: function ( ing1, ing2, ing3 ) {
        console.log(`Here is your delicious pasta with ${ing1}, ${ing2}, and ${ing3}.`);
    },

    //mainIng = first input
    //otherIng = other inputs
    orderPizza: function ( mainIng, ...otherIng ) {
        console.log(mainIng);
        console.log(otherIng);
    }
};

//////////////////////////////////////////////////
// Object Keys

const properties = Object.keys(openingHours);
console.log(properties);
// Output: (3) ["thu", "fri", "sat"]
// These are the three key properties inside openingHours

let openStr = `We are open on ${properties.length} days: `;
for (const day of Object.keys(openingHours)) {
    openStr += `${day}, `;
}
console.log(openStr);

const entries = Object.entries(openingHours);
// key          =   key property of openingHours
// open, close  =   sub-property of key property of openingHours
for (const [key, { open, close}] of entries) {
    console.log(`On ${key}, we open at ${open} and close at ${close}.`);
}

/*
//////////////////////////////////////////////////
// Optional chaining
console.log(restaurant.openingHours.mon?.open);
// This will return as "undefined" rather than a straight-up error

const days = [ 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun' ];

for (const day of days) {
    // We will use nullish operator since saturday opens at "0". Otherwise it will be outputted as "closed" even if it is supposed to be open
    const open = restaurant.openingHours[day]?.open ?? 'closed';
    console.log(`On ${day}, we open at ${open}`);
}


// For-Of Loop
const menu = [ ...restaurant.starterMenu, ...restaurant.mainMenu ];
for (const item of menu) console.log(item);
// This for loop will automatically loop over the entire array
// "item" stands for the current array element per iteration

// To get the index per element, we need to use the "entries()" method
for ( const [i, el] of menu.entries()) {
    console.log(`${i+1}: ${el}`);
}

// CODING CHALLENGE #1

////////////////////////////////////////////////////////////
// Coding Challenge #1

// 1. Create one player array for each team (variables 'players1' and 'players2')
const [ players1, players2 ] = game.players;
console.log(`Team 1 consists of: ${players1}.`);
console.log(`Team 2 consists of: ${players2}.`);

// 2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1), create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players.
const [ gk1, ...fieldPlayers1 ] = players1;
const [ gk2, ...fieldPlayers2 ] = players2;
console.log(
    `Goalkeeper of team 1: ${gk1}.
Team players are: ${fieldPlayers1}.

Goalkeeper of team 1: ${gk2}.
Team players are: ${fieldPlayers2}.
`);

//3. All players array (22 players)
const allPlayers = [ ...players1, ...players2 ];
console.log(allPlayers);

// 4. Team 1 used 3 sub players. Create new array
const players1Final = [ ...players1, `Thiago`, `Coutinho`, `Perisic` ];
console.log(`Updated team 1: ${players1Final}`);

// 5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
const {
    odds: {
        team1, x: draw, team2
    }
} = game;
console.log(team1, draw, team2);

// 6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)

const printGoals = function (...playerName) { 
    console.log(`${playerName} has scored.`);
    console.log(`Total: ${playerName.length}`);
};

printGoals(...game.scored);

// 7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.
team1 < team2 && console.log('Team 1 is more likely to win');
team1 > team2 && console.log('Team 2 is more likely to win');




restaurant.orderDelivery({
    time: '22:30',
    address: `Via del Sole, 21`,
    mainIndex: 2,
    starterIndex: 2,
});

restaurant.orderDelivery({
    address: 'Via del Sole, 21',
    starterIndex: 1,
});

// OR Operator: Use ANY data type, return ANY data type
// If it detects ONE true, no matter how many variables are being compared, it will stop evaluating the other variables after the first true
console.log('' || 'Jonas');
// Output: Jonas
// Since the first value is a false value, it will output 'Jonas' since it is a true value
console.log(0 && 'Jonas');
// Output: 0
// It will output the first false value
console.log(1 && 'Jonas');
// Output: Jonas
// It will output the last true value

// Logic: If numGuests is not initialized, its value should be 10
restaurant.numGuests = 0;
const guests = restaurant.numGuests || 10;
console.log(guests);

// But in this portion, we want to output 0
// Since it is a falsy value, it will always be false, and numGuests will always be 10
// To output 10, we will use the Nullish Coalescing Operator "??"
// What it does is it only accepts null and undefined as false, NOT 0 or ''
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);

Sample arrays
let arr = [2,3,4];

// This is how we normally declare elements using array values:
//const a = arr[0];
//const b = arr[1];
//const c = arr[2];

// But you can do this via destructuring
const [x,y,z] = arr;
// These elements will have the corresponding array value:
//x = arr[0]
//y = arr[1]
//z = arr[2]
console.log(x,y,z);

let [first, second] = restaurant.categories;
// This will get the first two values from categories and assign them to the variables first and second
console.log(first, second);
// To get the first and the third, leave a blank between
[first, , second] = restaurant.categories;
console.log(first, second);

// Switching values between two variables using destructuring
// Initial values
let [main, ,secondary] = restaurant.categories;
console.log(main, secondary);
// Switching
[main, secondary] = [secondary, main];
console.log(main, secondary);

// Creating variables from return values of a function
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

// Destructuring nested arrays
const nested = [2, 4, [5, 6]];
// i = 2, j = [5, 6]
//const [i, , j] = nested;
//console.log(i, j);
// Extracting all values from the nested array:
const [i, , [j, k]] = nested;
console.log(i, j, k);

// Setting default values to variables when extracting them
// Default values
//const [p, q, r] = [8, 9];
//console.log(p, q, r);
// Output: 8 9 undefined

// Setting default value to 1
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);
// Output: 8 9 1

// creating variables from properties of object `restaurant`
const {name, openingHours, categories} = restaurant;
console.log(name, openingHours, categories);

// Assigning variable names
const {
    name: restaurantName,
    openingHours: hours,
    categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

// Assigning a default value to menu and starters
const { menu = [], starterMenu: starters = [] } = restaurant;

// Mutating variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };
// Assigning value of a and b to obj's a and b
// To do this, we must mutate the variables
// Enclose them in parenthesis because otherwise it will result in an error
({a, b} = obj);
console.log(a, b);

// Nested objects
const {
    fri: { open, close },
} = openingHours;
console.log(open, close);

1) Destructuring
Spread Operator
This will unpack arrays
const arr = [7, 8, 9];
// Adding values 1 and 2 to the beginning of the values of "arr"
// We can use spread operator here
const newArr = [1, 2, ...arr];
console.log(newArr);
// An important thing to note about the Spread Operator is it cannot overwrite existing arrays
// It can only append. Additionally, it can only be used in places where values are separated by commas.

// Copy array
const mainMenuCopy = [...restaurant.mainMenu];

// Join 2 arrays
const joinedMenu = [ ...restaurant.starterMenu, ...restaurant.mainMenu ];
console.log(joinedMenu);

// Iterables: arrays, strings, maps, sets, but not objects
const str = 'Jonas';
const letters = [...str, ' ', 'S.'];
console.log(letters);
console.log(...str);

// Real-world example
//const ingredients = [prompt("Let's make pasta! Ingredient 1?"), prompt("Ingredient 2?"), prompt("Ingredient 3?")];
//console.log(ingredients);
//restaurant.orderPasta(...ingredients);

// Objects
// Spread Operator enables us to create actual copies of objects
// From the previous lessons, we learned that creating copies of objects using references variables means
// that when we change a property from one object, the other one will reflect this changes since they
// reference the same address from the heap
// With Spread Operator, we are able to actually create copies. We are able to modify their properties without
// affecting the other.

// Creating a new object with the properties of restaurant
const newRestaurant = {
    foundedIn: 1998,
    ...restaurant,
    founder: 'Guiseppe'
};

const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
// Their names are not the same
console.log(restaurantCopy.name);
console.log(restaurant.name);

// Rest Operator
// This can pack arrays together i.e. creating arrays from input values
const sampleArr = [ 1, 2, ...[3, 4]];
// sampA = 1
// sampB = 2
// "...others" will be assigned the value of the REST of unused variables in the destructuring assignment
const [sampA, sampB, ...others] = [1, 2, 3, 4, 5];
console.log(sampA, sampB, others);

const [pizza, , risotto, ...otherFood] = [
    ...restaurant.mainMenu,
    ...restaurant.starterMenu,
];
console.log(pizza,risotto, otherFood);

// Objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

// 2) Functions
// When there is an undefined/unknown number of parameters, we can use Rest Parameters

const add = function (...numbers) {
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) sum += numbers[i];
    console.log(sum);
};

add(2, 3);
add(5, 3, 7, 2,);
add(8, 2, 5, 3, 2, 1, 4);

const x = [ 23, 5, 7];
add(...x);

restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
restaurant.orderPizza('mushroom');
*/