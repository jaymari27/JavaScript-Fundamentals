// No "strict mode" since ES6 is in strict mode by default

///////////////////////////////////////
// Exporting and Importing in ES6 Modules
/// Importing module

// Specify the global variable/function you want to reference from the other part module
//import { addToCart, totalPrice, totalQuantity } from './shoppingCart.js';
console.log('Importing module');

// import * as ShoppingCart from './shoppingCart.js';
// addToCart('bread', 5);
// console.log(totalPrice, totalQuantity);

// ShoppingCart.addToCart('sandwich', 10);

import add, { cart } from './shoppingCart.js';
add('pizza', 2);
add('apple', 8);
add('bread', 4);
add('burger', 5);
add('onions', 12);

// The cart variable was updated
console.log(cart);

/*
const shoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

// This works due to closure - since the shoppingCart2 is an IIFE, it has long since finished execution. But executing the below method will result in the "cart" const of shoppingCart2 being mutated. This is because the "cart" const is declared inside shoppingCart2, and since a variable is tied to its birthplace, it will always have access to its internal processes.
shoppingCart2.addToCart('apple', 3);
shoppingCart2.addToCart('pizza', 1);
*/

///////////////////////////////////////
// Introduction to NPM
/// There's no need to specify the entire path. Parcel can search it for us.
//import cloneDeep from '../node_modules/lodash-es/cloneDeep.js';
import cloneDeep from 'lodash-es';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};
const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);

state.user.loggedIn = false;
console.log(stateClone);

console.log(stateDeepClone);

// For Parcel: Whenever we reload the browser, this will trigger a rebuild and all changes will be injected to the browser without triggering a page reload
if (module.hot) {
  module.hot.accept();
}

class Person {
  greeting = 'Hey';
  constructor(name) {
    this.name = name;
    console.log(`${this.greeting}, ${this.name}`);
  }
}

const jonas = new Person('Jonas');
