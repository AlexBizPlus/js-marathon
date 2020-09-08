export const MAX_LOG_ELEMENTS = 4;
export const BUTTONS_COUNT = 3;
export const HEADER_MESSAGES = ['2', '1', 'Fight !'];
export const DELAY = 1000;

export const $playground = document.querySelector('.playground');
export const $container = document.querySelector('.control');

export const log = {
  logList: new Array(),
  kills: {
    total: 0,
    lastVictim: '',
  }
};
