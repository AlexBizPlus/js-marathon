import {
  MAX_LOG_ELEMENTS,
  MAX_CLICK_PER_BUTTON,
  $playground,
  $container,
  log
} from "./const.js";
import {
  startGame
} from "./main.js";

const caption = 'Fight log:';
const clickCaption = 'Kill board:';

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
  renderTotalKillS();
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

export const renderTotalKillS = (total = 0) => {
  const logContainer = document.querySelector('#log-container').children[1];
  const logTotal = logContainer.querySelector('ul').children[0];
  logTotal.innerText = `
  Total kills: ${total}`;
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

export const renderHeaderMessage = () => {
  const textContainer = document.createElement('div');
  textContainer.style.minWidth = '200px';
  textContainer.style.maxWidth = '400px';
  textContainer.style.position = 'absolute';
  textContainer.style.top = '0';
  textContainer.style.left = '50%';
  textContainer.style.transform = 'translate(-50%, 0)';
  textContainer.style.fontFamily = '"Permanent Marker" , cursive';
  textContainer.style.fontStyle = 'italic';
  textContainer.style.fontSize = '25px';

  const textCaption = document.createElement('p');
  textCaption.style.margin = 'auto';
  textCaption.id = 'header-message';

  textContainer.append(textCaption);
  $playground.append(textContainer);
};

export const renderStartButton = () => {
  $container.innerText = '';
  $container.style.alignContent = 'center';
  const $button = document.createElement('button');
  $button.classList.add('button');
  $button.innerText = `New Game`;
  $button.addEventListener('click', () => {
    startGame();
  });
  $container.append($button);
};

export const renderPlayerTwo = (player) => {
  const $img = document.querySelector(`#img-player2`);
  $img.src = `${player.img}`;
  const $name = document.querySelector(`#name-player2`);
  $name.innerText = `${player.name}`;
  const $health = document.querySelector(`#health-player2`);
  $health.innerText = `${player.hp} / ${player.hp}`;
  const $progressbar = document.querySelector(`#progressbar-player2`);
  $progressbar.style.width = '100%';
}

export const renderPlayerOne = (player) => {
  const $health = document.querySelector(`#health-player1`);
  $health.innerText = `${player.hp} / ${player.hp}`;
  const $progressbar = document.querySelector(`#progressbar-player1`);
  $progressbar.style.width = '100%';
}
