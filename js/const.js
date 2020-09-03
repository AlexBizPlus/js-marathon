export const MIN_DAMAGE_REGULAR = 5;
export const MAX_DAMAGE_REGULAR = 15;
export const MIN_DAMAGE_SUPER = 15;
export const MAX_DAMAGE_SUPER = 25;
export const MAX_LOG_ELEMENTS = 4;
export const MAX_CLICK_PER_BUTTON = 6;
export const BUTTONS_COUNT = 3;

export const $buttonThiderJolt = document.getElementById('btn-kick');
export const $buttonSuperStrike = document.getElementById('btn-kick-super');
export const $buttonRandom = document.getElementById('btn-kick-random');
export const $playground = document.querySelector('.playground');

export const log = {
  logList: new Array(),
  total: {
    clickCount: 0,
  },
};
