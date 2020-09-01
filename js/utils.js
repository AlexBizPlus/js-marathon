import {
  MAX_CLICK_PER_BUTTON
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

export const decreaseClicks = () => {
  let clicks = MAX_CLICK_PER_BUTTON;

  return function (n = 1) {
    clicks -= n;
    return clicks;
  }
};
