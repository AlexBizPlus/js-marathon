import {
  MAX_LOG_ELEMENTS,
  MAX_CLICK_PER_BUTTON,
  $playground
} from "./const.js";
import {
  log
} from "./const.js";

const caption = 'Fight log:';
const clickCaption = 'Click log:';

export const renderContainer = () => {
  const logContainer = document.createElement('div');
  logContainer.id = 'log-container';
  logContainer.style.maxWidth = '1024px';
  logContainer.style.display = 'flex';
  logContainer.style.flexDirection = 'row';
  logContainer.style.justifyContent = 'center';
  logContainer.style.alignItems = 'flex-start';
  logContainer.style.marginLeft = 'auto';
  logContainer.style.marginRight = 'auto';

  $playground.after(logContainer);
  renderLogContainer(caption, MAX_LOG_ELEMENTS);
  renderLogContainer(clickCaption, 1);
  logContainer.children[logContainer.children.length - 1].style.marginRight = '0';
  prepareLog();
  renderTotalClicks();
};

const prepareLog = () => {
  const logContainer = document.querySelector('#log-container').children[0];
  const logText = logContainer.querySelector('span');
  logText.id = 'log-caption-text';
};

export const renderButtonClicks = (button, total = MAX_CLICK_PER_BUTTON) => {
  let buttonText = button.innerText;
  buttonText = buttonText.split('[').map((el, i) => (
    (i === 1) ?
    el = `[${total}]` : el = el
  )).join('');
  button.innerText = buttonText;
};

export const renderTotalClicks = (total = 0) => {
  const logContainer = document.querySelector('#log-container').children[1];
  const logTotal = logContainer.querySelector('ul').children[0];
  logTotal.innerText = `
  Total clicks: ${total}`;
};

export const renderLogContainer = (text, index) => {
  const logContainer = document.createElement('div');
  logContainer.style.width = '350px';
  logContainer.classList.add('log-background');
  logContainer.style.marginRight = '20px';

  const logCaption = document.createElement('p');
  const logCaptionText = document.createElement('span');
  logCaptionText.innerText = `${text}`;

  const logList = document.createElement('ul');
  for (let i = 0; i < index; i++) {
    const logText = document.createElement('li');
    logList.append(logText);
  }

  logContainer.append(logCaption);
  logCaption.append(logCaptionText);
  logCaption.append(logList);

  const $log = document.querySelector('#log-container');
  $log.append(logContainer);
};

export const renderLogMessage = () => {
  const $log = document.querySelector('.log-background ul');

  for (let i = 0; i < Math.min(log.logList.length, MAX_LOG_ELEMENTS); i++) {
    $log.children[i].innerText = `
      ${log.logList[log.logList.length - 1 - i]}
    `;
  }
};

export const renderMessage = (message) => {
  const $logCaption = document.querySelector('#log-caption-text');
  $logCaption.innerText = `${message}`;
  $logCaption.style.backgroundColor = '#000000';
  $logCaption.style.color = '#ffffff';
};
