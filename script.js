'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

//nav---
const nav = document.querySelector('.nav');
const navLinks = document.querySelector('.nav__links');
const navItem = document.querySelectorAll('.nav_item');

//tab Component__
const tabContainer = document.querySelector('.operations__tab-container');
const tab = document.querySelectorAll('.operations__tab');
const tabContent = document.querySelectorAll('.operations__content');

//modal window
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

//implementing smooth scrolling

btnScrollTo.addEventListener('click', function (e) {
  const s1Coords = section1.getBoundingClientRect();

  // window.scrollTo({
  //   left: s1Coords.left + window.pageXOffset,
  //   top: s1Coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // morder approach
  section1.scrollIntoView({ behavior: 'smooth' });
});

//implementing the navigation scrolling__________using the event deligation
navLinks.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//the tab component_________
tabContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  //guard clause
  if (!clicked) return;

  //removing the acitve class_____
  tab.forEach(e => {
    e.classList.remove('operations__tab--active');
  });
  tabContent.forEach(e => {
    e.classList.remove('operations__content--active');
  });
  //adding the active class to the content___
  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//adding the fade-out in the nav bar
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

function handleHover(e) {
  const link = e.target;

  if (link.classList.contains('nav__link')) {
    const sibling = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    sibling.forEach(e => {
      if (e !== link) {
        e.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
}

//adding the stickey nav

//the scroll event fires evert time the scrolling is done___
// window.addEventListener('scroll', function () {
//   console.log(window.scrollY);
// });

// usig the intersection observer api
const header = document.querySelector('.header');
const obsCallBack = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};
const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin:'-90px',
};
const observer = new IntersectionObserver(obsCallBack, obsOptions);
observer.observe(header);
