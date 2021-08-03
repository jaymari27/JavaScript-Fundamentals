'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
              <h3 class="country__name">${data.name}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${(
                +data.population / 1000000
              ).toFixed(1)} people</p>
              <p class="country__row"><span>🗣️</span>${
                data.languages[0].name
              }</p>
              <p class="country__row"><span>💰</span>${
                data.currencies[0].name
              }</p>
            </div>
          </article>
      `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

///////////////////////////////////////
/*
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  // Sending AJAX call request. "GET" is the type of request, and then for the second argument, is a string containing the URL to which the AJAX call should be made. You can search "Github public APIs" which will show you a list of APIs you can call. The APIs you use must have CORS set to "Yes" or "Unknown". CORS stands for Cross Origin Resource Sharing, and without it, we cannot access a third party API from our own code.
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  // This request will be sent off while the rest of the code is running.
  request.send();

  // Using this event listener, we will wait for the request to load, and as soon as the data arrives, this function will execute
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `
      <article class="country">
              <img class="country__img" src="${data.flag}" />
              <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(
                  +data.population / 1000000
                ).toFixed(1)} people</p>
                <p class="country__row"><span>🗣️</span>${
                  data.languages[0].name
                }</p>
                <p class="country__row"><span>💰</span>${
                  data.currencies[0].name
                }</p>
              </div>
            </article>
        `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData('philippines');
getCountryData('japan');
*/

/*
const getCountryDataAndNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    // Render country 1
    renderCountry(data);

    // Get neighbor country 2
    const [neighbour] = data.borders;

    // In case of countries that do not have neighbours, we don't get errors
    if (!neighbour) return;

    // AJAX Call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      renderCountry(data2, 'neighbour');
    });
  });
};

getCountryDataAndNeighbour('italy');
*/

/*
/// An example of 「Flat Chain of Promises」
const request = fetch('https://restcountries.eu/rest/v2/name/philippines');
console.log(request); // This will output a Promise
/// Promise ⇒ an object that is used as a placeholder for a future value. For example, an AJAX call. It will handle the future value of an AJAX call when it arrives.
/// Promise Lifecycle: Pending ⇒ Settled (Fulfilled/Rejected)
*/

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status}!)`);
    return response.json();
  });
};

/*
const getCountryData = function (country) {
  /// Country 1
  // This fetch function will return a promise
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    // the then() method will handle the promise. The first parameter is for SUCCESSFUL PROMISE, and the second is for REJECTED PROMISE
    .then(response => {
      // ".ok" is a property of the response. This is set to either True or False depending on the result of your request. In this case, we will use it to check if the entered country exists or not.
      if (!response.ok)
        throw new Error(`Country not found (${response.status}!)`);

      response.json();
    })
    // To read the data of the response, we need to call the json method on that response object. This will also return a promise, and if we return that promise from this method, then all of this becomes a new promise itself.)
    // Calling a then() method again since the code above is a new promise
    // The parameter "data" is the result of the promise
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!response.ok) return;

      /// Country 2
      // If there is a neighbouring country, this will be returned as a result of the then method.
      return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    })
    // The response will be the result of the previous then() method
    .then(response => {
      return response.json();
    })
    .then(data => renderCountry(data, 'neighbour'))
    // This catch() method will catch any error that occurs at any point of the chain
    .catch(err => renderError(`Someting went wrong ${err.message}. Try again.`))
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
*/

/*
const getCountryData = function (country) {
  /// Country 1
  getJSON(
    `https://restcountries.eu/rest/v2/name/${country}`,
    'Country not found'
  )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) throw new Error('No neighbour found!');

      /// Country 2
      return getJSON(
        `https://restcountries.eu/rest/v2/alpha/${neighbour}`,
        `Country not found!)`
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// To avoid callback hell, do not chain callback methods inside another callback method. Always return the result and handle that outside the current callback method. So in our case, we returned each response at the end of the callback methods, and then chained a then() method outside of that previous callback method.
// then()     => executes only after successful promises
// catch()    => executes only after rejected promises
// finally()  => executes every time regardless

btn.addEventListener('click', function () {
  getCountryData('italy');
});
*/

///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

/*
const whereAmI = function (lat, lng) {
  // Reverse Geocoding 3rd party
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);

      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message} 💥`));
};
whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);
*/

/*
///////////////////////////////////////////////////////////
/// How asynchronous javascript works behind the scenes ///
///////////////////////////////////////////////////////////
Img src is asynchronous and loads in the web API and not in javascript. If we attach an event listener after the image loads, it will be put in the Callback Queue after it is loaded. The callback queue is a list of all the callback functions that are in line to be executed.

If the Call Stack is empty, an item from the callback queue will be executed. This is called the Event Loop - this decides when each callback is executed.

Microtasks Queue - This is a list of all callbacks of promises. It has priority over callback queue.

At the event of an event loop tick, the event loop will check if there are items in the microtasks queue, and if there are, it will run those first before the items inside the callback queue.
*/

/*
///////////////////////////////////////
/// Building a Simple Promise
// Promise constructor accepts one argument: the executor function. It will immediately execute that function, and the executor function accepts two arguments: resolved and rejected promise.
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening 🔮');
  // Adding a timer to simulate loading time
  setTimeout(function () {
    // There's 50/50 chance we win or lose
    if (Math.random() >= 0.5) {
      resolve('You WIN 💰'); // Fulfilled/Resolved promise
    } else {
      reject(new Error('You lost your money 💩')); // Rejected promise
    }
    // The string in resolve() and the error message in reject() will be returned
  }, 2000);
});

// then() method will use the returned value from lotteryPromise
lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

/// Promisifying setTimeout
const wait = seconds =>
  // Using only "resolve" argument because timers never really fail
  // this will call the resolve function
  new Promise(resolve => setTimeout(resolve, seconds * 1000));

// calling wait() function with a timeout of 1 second
wait(1)
  .then(() => {
    console.log('1 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 second passed');
    return wait(1);
  })
  .then(() => console.log('4 second passed'));

// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 second passed');
//       setTimeout(() => {
//         console.log('4 second passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// using resolve()/reject() this way will immediately execute it
// This will be executed first since it is a promise, and it does not have a timer unlike the promise in above code
Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('Problem!')).catch(x => console.error(x));
*/

/*
///////////////////////////////////////
// Promisifying the Geolocation API
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    // This code below is exactly the same as the code above
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
getPosition().then(pos => console.log(pos));

// No need to input coordinates (lat, lng) since we can use getPosition to find our coordinates
const whereAmI = function () {
  getPosition()
    // Retrieving our coordinates
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;

      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);

      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message} 💥`));
};

btn.addEventListener('click', whereAmI);
*/

///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

/*
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    // Display img after loading
    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    // Display error message after load failure
    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

// declaring currentImg so that the img will be available globally, not just in one method
let currentImg;

createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    console.log('Image 1 loaded');
    return wait(2); // calling wait() method so it will wait 2 seconds before displaying the next image
  })
  .then(() => {
    // hiding the image
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  // displaying second image
  .then(img => {
    currentImg = img;
    console.log('Image 2 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => console.error(err));
*/

///////////////////////////////////////
// Consuming Promises with Async/Await
// Error Handling With try...catch
/*
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(res => console.log(res))

// Setting "async" will turn a function into an asynchronous function, which will keep running in the background while executing its processes, then return a promise.
const whereAmI = async function () {
  try {
    /// Geolocation
    // In an async function, we can use the "await" keyword to wait for the result of the promise. This works the same way as a then() method, the different is, we can just use "await" keyword, store its possible data into a variable, and retrieve that data later on when we need it. We don't need to do chaining.
    // This line does not need an error message since this will be caught in the catch() method
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error('Problem getting location data');

    const dataGeo = await resGeo.json();
    console.log(dataGeo);

    // Country data
    const res = await fetch(
      `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
    );

    // FIX:
    if (!res.ok) throw new Error('Problem getting country');

    const data = await res.json();
    console.log(data);
    renderCountry(data[0]);
    // this catch() method is the same as the previous catch()
  } catch (err) {
    console.error(`${err} 💥`);
    renderError(`💥 ${err.message}`);
  }
};
whereAmI();

// try {
//   let y = 1;
//   const x = 2;
//   y = 3;
// } catch (err) {
//   alert(err.message);
// }
*/

///////////////////////////////////////
// Returning Values from Async Functions
/*
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error('Problem getting location data');
    const dataGeo = await resGeo.json();

    // Country data
    const res = await fetch(
      `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
    );
    if (!resGeo.ok) throw new Error('Problem getting country');
    const data = await res.json();
    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(`${err} 💥`);
    renderError(`💥 ${err.message}`);

    /// Reject promise returned from async function
    // Because otherwise the function will still be "Fulfilled", when it still kept running anyway
    throw err;
  }
};

console.log('1: Will get location');
// const city = whereAmI(); // This will output a Promise, since the function is still running in the background
// console.log(city);

// getting the value that we want, and not just a Promise
// This will return line 538: `You are in ${dataGeo.city}, ${dataGeo.country}` and the function will stop running in the background
// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message} 💥`))
//   .finally(() => console.log('3: Finished getting location'));

// Creating an async IIFE
(async function () {
  try {
    const city = await whereAmI();
    console.log(`2: ${city}`);
  } catch (err) {
    console.error(`2: ${err.message} 💥`);
  }
  console.log('3: Finished getting location');
})();
*/

///////////////////////////////////////
// Running Promises in Parallel
/*
const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c1}`
    // );
    // const [data2] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c2}`
    // );
    // const [data3] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c3}`
    // );
    // console.log([data1.capital, data2.capital, data3.capital]);

    // A Combinator - this is a Promise that runs three Promises at the same time. This is more efficient than the above code which loads in sequence since they are not really dependent on each other. Each data is independent, so they don't have to wait for the others to load before they load themselves.
    const data = await Promise.all([
      getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c3}`),
    ]);
    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.error(err);
  }
};
get3Countries('philippines', 'canada', 'tanzania');
*/

///////////////////////////////////////
// Other Promise Combinators: race, allSettled and any
/*
// Promise.race - receives an array of promises, and returns a promise. The first promise that receives an output - whether it is fulfilled or rejected - will be the returned promise.
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.eu/rest/v2/name/italy`),
    getJSON(`https://restcountries.eu/rest/v2/name/egypt`),
    getJSON(`https://restcountries.eu/rest/v2/name/mexico`),
  ]);
  console.log(res[0]);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long!'));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.eu/rest/v2/name/tanzania`),
  // getJSON and timeout() will race against each other
  timeout(5),
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

/// Promise.allSettled
// This will let all its promises settle without regards if they are fulfilled or not
Promise.allSettled([
  Promise.resolve('allSettled: Success'),
  Promise.reject('allSettled: ERROR'),
  Promise.resolve('allSettled: Another success'),
]).then(res => console.log(res));

/// Promise.all
// This will let all its promises settle, but will short circuit as soon as one promise is rejected.
Promise.all([
  Promise.resolve('all: Success'),
  Promise.reject('all: ERROR'),
  Promise.resolve('all: Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

/// Promise.any [ES2021]
// Will return the first promise that is fulfilled, and ignores the rejected promises.
Promise.any([
  Promise.resolve('any: Success'),
  Promise.reject('any: ERROR'),
  Promise.resolve('any: Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));
*/
///////////////////////////////////////
// Coding Challenge #3
/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

let currentImg;

// PART 1
const loadNPause = async function () {
  try {
    // Load image 1
    let img = await createImage('img/img-1.jpg');
    console.log('Image 1 loaded');
    await wait(2);
    img.style.display = 'none';

    // Load image 2
    img = await createImage('img/img-2.jpg');
    console.log('Image 2 loaded');
    await wait(2);
    img.style.display = 'none';

    // Load image 3
    img = await createImage('img/img-3.jpg');
    console.log('Image 3 loaded');
    await wait(2);
  } catch (err) {
    console.error(err);
  }
  console.log('Thanks!');
};
loadNPause();

// PART 2
const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));
    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl);
    imgsEl.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err);
  }
};
// loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
