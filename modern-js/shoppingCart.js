// Exporting module
console.log('Exporting module');
// This is executed first
// These variables are top-level variables, which are scoped to its self-module. All top-level variables are private to the module

const shippingCost = 10;
export const cart = [];

// export - global variable
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity };

// We use "default" exports when we only want to export one thing per module. This way we can give it any name we want.
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}
