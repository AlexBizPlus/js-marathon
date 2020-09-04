import {
  HEADER_MESSAGES,
  MAX_LOG_ELEMENTS,
  DELAY,
  log,
} from "./const.js";

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomElement = (someArray) => {
  const randomElement = getRandomInteger(0, someArray.length - 1);
  return someArray[randomElement];
};

export const decreaseClicks = (maxClicks) => {
  let clicks = maxClicks;

  return function (n = 1) {
    clicks -= n;
    return clicks;
  }
};

export const showTimer = () => {
  const $textCaption = document.querySelector('#header-message');
  let intervalCount;
  let i = 0;

  clearTimeout(intervalCount);
  intervalCount = window.setInterval(countTimer, DELAY);

  function countTimer() {
    if (i === HEADER_MESSAGES.length) {
      clearTimeout(intervalCount);
      $textCaption.innerText = ``;
      return;
    }
    $textCaption.innerText = `${HEADER_MESSAGES[i]}`;
    i++;
  }
};

export const firstLetterToUpperCase = (name) => {
  const pattern = /^\w$/;

  return name.split(' ').map(elem => {
    return elem.split('').map((el, index) => {
      return (pattern.test(el) && index === 0) ?
        el = el.toUpperCase() :
        el;
    }).join('');
  }).join(' ');
};

export const getPlayerOne = (name, someArray) => {
  return someArray.find(item => item.name === name)
};

export const getPlayerTwo = (name, someArray) => {
  return someArray.filter(item => item.name !== name)
};

export const showHeaderMessage = (text) => {
  const $textCaption = document.querySelector('#header-message');
  $textCaption.innerText = `${text}`;
};

export const clearLog = () => {
  log.logList = [''];
  const $log = document.querySelector('.log-background ul');

  for (let i = 0; i < MAX_LOG_ELEMENTS; i++) {
    $log.children[i].innerText = '';
  }
};

export const resetColorProgressBar = () => {
  const $progressBars = document.querySelectorAll('.health');
  Array.from($progressBars).forEach(item => {
    item.classList.contains('critical') ?
      item.classList.remove('critical') :
      null;
    item.classList.contains('low') ?
      item.classList.remove('low') :
      null;
  });
}
