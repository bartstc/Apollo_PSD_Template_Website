// === SLIDER ===

const next = document.querySelector('.btn-next');
const prev = document.querySelector('.btn-prev');
const slider = document.querySelector('.slider-window');

let elementsCount = 5;
let current = 1;
let slideWidth = 100 / elementsCount;
let shift = 0;

next.addEventListener('click', () => {
  if (current < elementsCount) {
    shift += slideWidth;
    slider.style.transform = `translateX(-${shift}%)`;
    current++;
  } else {
    shift = 0;
    current = 1;
    slider.style.transform = `translateX(${shift}%)`;
  };
});

prev.addEventListener('click', () => {
  if (current > 1) {
    shift -= slideWidth;
    current--;
    slider.style.transform = `translateX(-${shift}%)`;
  } else if (current === 1) {
    shift = elementsCount * slideWidth - slideWidth;
    slider.classList.toggle('move');
    slider.style.transform = `translateX(-${shift}%)`;
    current = elementsCount;
  };
});

// === CAROUSEL ===

(function () {
  const options = ['far-left', 'left', 'center', 'right', 'far-right'];
  const cards = document.querySelectorAll('.carousel__card');

  function addCardListeners() {
    cards.forEach(card => {
      card.addEventListener('click', cardEventListener);
    });
  };
  addCardListeners();

  function cardEventListener(e) {
    let parent = getParents(e.target, '.carousel__card')[0];
    let parentIndex = options.indexOf(parent.id);

    cards.forEach(function (card) {
      let index = options.indexOf(card.id);
      if (parentIndex > 2) {
        let previousIndex = index - 1 < 0 ? cards.length - 1 : index - 1;
        card.id = options[previousIndex];
      } else if (parentIndex < 2) {
        let nextIndex = index + 1 > cards.length - 1 ? 0 : index + 1;
        card.id = options[nextIndex];
      }
    });
  }

  function getParents(elem, selector) {
    if (!Element.prototype.matches) {
      Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function (s) {
          const matches = (this.document || this.ownerDocument).querySelectorAll(s),
            i = matches.length;
          while (--i >= 0 && matches.item(i) !== this) {}
          return i > -1;
        };
    }

    // Setup parents array
    let parents = [];

    // Get matching parent elements
    for (; elem && elem !== document; elem = elem.parentNode) {

      // Add matching parents to array
      if (selector) {
        if (elem.matches(selector)) {
          parents.push(elem);
        }
      } else {
        parents.push(elem);
      }
    }

    return parents;
  };
})();

// === NAVIGATION ===

const nav = document.querySelector('.navigation');
const openBtn = document.querySelector('.open');
const closeBtn = document.querySelector('.close');
const links = document.querySelectorAll('.link');
const sliderSection = document.querySelector('.slider');

openBtn.addEventListener('click', () => {
  nav.classList.add('active');
  nav.style.animation = 'navIn .3s forwards';
  document.body.style.overflowY = 'hidden';
});

const navRemoveFeatures = () => {
  nav.classList.remove('active');
  nav.removeEventListener('animationend', navRemoveFeatures);
  document.body.style.overflowY = 'scroll';
};

const navClose = () => {
  nav.style.animation = 'navOut .3s forwards';
  nav.addEventListener('animationend', navRemoveFeatures);
};

closeBtn.addEventListener('click', navClose);

links.forEach(link => {
  link.addEventListener('click', navClose);
});

// CHANGE COLOR OF OPENBTN

window.onscroll = () => {
  const sliderPosTop = sliderSection.offsetTop;
  const sliderPosBottom = sliderPosTop + sliderSection.getBoundingClientRect().height;
  const actuallPos = window.pageYOffset;
  const correction = 25;

  (sliderPosTop < (actuallPos + correction) && sliderPosBottom > (actuallPos + correction)) ? openBtn.style.color = '#fff': openBtn.style.color = '#000';
};