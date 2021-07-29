'use strict';

///////////////////////////////////////
// Selections

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('section');
const imgTargets = document.querySelectorAll('img[data-src]');


///////////////////////////////////////
// Modal window

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


///////////////////////////////////////
// Button scrolling

btnScrollTo.addEventListener('click', function(e) {
  // retrieving coordinates of where we want to scroll to
  const s1coords = section1.getBoundingClientRect();
  
  // Displays DOMRect properties
  // console.log(s1coords);

  // Getting rectangle for "e"
  // x = distance from the border
  // y = distance from the top
  // The DOMRect values are relative to where you are
  // So when you navigate through the page, these values may change
  // console.log(e.target.getBoundingClientRect());

  // Scrolling
  // Moves us to the top of section 1
  // without page[Y/X]Offset, the left and top values will only be relative to the viewport, or the whole webpage itself. But we want it to be relative to where  you are CURRENTLY, so the offset is necessary.
  // window.scrollTo(
  //   s1coords.left + window.pageYOffset,
  //   s1coords.top + window.pageYOffset
  // );

  /// ALternate:
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  // adding the behavior up there will make the scrolling smoother looking instead of instantly jumping to the sections

  /// Modern solution which works in most modern browsers
  section1.scrollIntoView({ behavior: `smooth` });
  // Does the exact same thing as above, but without the computations

});

///////////////////////////////////////
// Page navigation

/// Not optimal!!
// document.querySelectorAll('.nav__link').forEach(function(e) {
//   e.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({
//       behavior: `smooth`
//     });
//   });
// });

/// Optimal solution
// 1. Add event listener to common parent element
// 2. Determine what element originated the 

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // Matching strategy
  // Since nav links contain a whole block that also includes white space between the links, we need to select only the links. We can achieve this by doing the matching strategy

  // Checking if the element that was clicked has the class "nav link", which is the class we set for the three links
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      behavior: `smooth`
    });
  }
});

///////////////////////////////////////
// Tabbed component

// Since all elements have the tab-container as a common element, we can attach the event listener there
tabsContainer.addEventListener('click', function(e) {
  // adding the closest() method so as to select the whole tab and not just the span text, regardless if we click on the button or the number
  const clicked = e.target.closest('.operations__tab');

  /// Guard Clause
  // When we click on tab-container, since it is not close to 'operations tab', it will return null in the initialization of clicked. To avoid this, we need to ignore all occurrences of this with an if clause that will immediately terminate the function upon detecting it
  if (!clicked) return;

  // When the above condition returns as true, it will stop execution of this event and the next line of code/s will not run

  /// Active tab
  // 1. Clear tabs of active class
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));

  // 2. Add active class to the button that was clicked
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

///////////////////////////////////////
// Menu fade animation

const handleHover = function(e) {
  // Change opacity on mouse hover
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    // within the parent element ".nav", we will search a "nav__link"
    const siblings = link.closest('.nav')
      .querySelectorAll('.nav__link');
    // within the parent element ".nav", we will search an "img"
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
}

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////
// Sticky Navigation: Intersection Observer API

// this will be called each time the observed element is intersecting the root element at the threshold we specified
// const obsCallback = function(entries, observer) {
//   entries.forEach(entry => {
    
//   })
// };

// const obsOptions = {
//   // root = the element that the target is intersecting
//   root: null,
//   // threshold = the percentage of intersection of which the observer callback will be called
//   // 0% = the callback will trigger each time the target element is out of view, and as soon as it is into view
//   // 20% = percentage of intersection 
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);


const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function(entries) {
  const [entry] = entries;
  // console.log(entry);

  // adding or removing class according to scroll movement
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}

const headerObserver = new IntersectionObserver
  (stickyNav, {
    root: null,
    // when 0% of this header is visible, we want something to happen
    threshold: 0,
    rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

//// Reveal Sections
const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  
  // Since the target is already revealed, there's no need to observe it anymore
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//// Lazy loading images
const loadImg = function(entries, observer) {
  const [entry] = entries;

  if(!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function() {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  // loads images sooner so its not obvious to the users that we're lazy-loading them
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

//// Slider
const slider = function() {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  ///////////////////////////////////////
  // Functions
  const createDots = function() {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        `beforeend`,
        `<button class = "dots__dot" data-slide = ${i}></button>`
      );
    });
  };

  const activateDot = function(slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };


  const goToSlide = function(slide) {
    // Each slide will be assigned any of the values depending on their position: [-100%, 0%, 100%, 200%]. The current slide must have 0%, and the one on its left must have the negative values.
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  }

  // Next slide
  const nextSlide = function() {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
      // return to the beginning of the slide
    } else {
      curSlide++;
      // continue slide function
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  }

  const prevSlide = function() {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    
    goToSlide(curSlide);
    activateDot(curSlide);
  }

  const init = function() {
    // Setting slide display to 0 upon webpage load
    goToSlide(0);
    createDots();
    // Activate dot upon webpage load
    activateDot(curSlide);
  };
  init();

  ///////////////////////////////////////
  // Event handlers

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  // Move slides according to arrow keys
  document.addEventListener('keydown', function(e) {
    e.key === `ArrowLeft` && prevSlide();
    e.key === `ArrowRight` && nextSlide();
  });

  dotContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('dots__dot')) {
      const {slide} = e.target.dataset.slide;
      goToSlide(slide);
      activateDot(curSlide);
    }
  });
};
slider();

























///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
// LECTURES
// const header = document.querySelector('.header');

//// Creating and inserting elements
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.innerHTML = `We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>`;

/// prepend()   = adds object as the first child of the element
// header.prepend(message);
/// append()    = adds objects as the last child of the element
// header.append(message);
/// cloneNode() = clones the object if it already exists somewhere else
//header.append(message.cloneNode(true));

//// Delete elements
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function() {
//     message.remove();
//   });

//// Styles
// Styles are inline, or styles that we set manually ourselves
// e.g. we can't just retrieve styles that are in our css files
// We can only freely retrieve styles that we set inside our js file
// message.style.backgroundColor = `#37383d`;
// message.style.width = `120%`;
// But we can retrieve them via getComputedStyle

// message.style.height = 
//   Number.parseFloat(getComputedStyle(message).height, 10) 
//   + 30 + `px`;
// Convert to number since it will return as string

// document.documentElement.style.setProperty('--color-primary', `orangered`);

//// Attributes
// By querySelecting nav__logo, we gain access to its child properties. However we can only have access on properties that the parent object usually has. For example, nav__logo is a photo, so it is expected that it has an alt text and a src, but if for example we add a property in the html that is "designer", then it will return as undefined in javascript.
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);

// logo.alt = `Beautiful minimalist logo`;

// But if we really want to get an unusual property, we can just use the getAttribute(`attribute-name`) method

// const link = document.querySelector('.nav__link--btn');
// Output:  http://127.0.0.1:5500/advanced-dom/index.html#
// console.log(link.href);
// Output:  #
// console.log(link.getAttribute('href'));

//// Classes
// Do not use this way below. It will overwrite all classes that was already there
// link.className = `jonas`;



//// Random color
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

//// 
// document.querySelector('.nav__link').addEventListener('click', function(e) {
  // target = where the event originated, or where it first happened
  // console.log(`LINK`, e.target);
  // this.style.backgroundColor = randomColor();

  /// Stop propagation
  // This will ensure that events will not reach its parent elements
  // e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColor();
//   console.log(`CONTAINER`, e.target);

// });

// document.querySelector('.nav').addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColor();
//   console.log(`NAV`, e.target);
// });

