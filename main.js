// ------------------ const.js -----------------------------
const MIN_DAMAGE_REGULAR = 5;
const MAX_DAMAGE_REGULAR = 15;
const MIN_DAMAGE_SUPER = 15;
const MAX_DAMAGE_SUPER = 25;
const MAX_LOG_ELEMENTS = 4;
const MAX_CLICK_PER_BUTTON = 6;
const BUTTONS_COUNT = 3;

const $buttonThiderJolt = document.getElementById('btn-kick');
const $buttonSuperStrike = document.getElementById('btn-kick-super');
const $buttonRandom = document.getElementById('btn-kick-random');
const $playground = document.querySelector('.playground');

const hero = {
  name: 'Pikachu',
  health: 100,
  currentHealth: 100,
  progressbar: document.getElementById('progressbar-character'),
  state: document.getElementById('health-character'),
  damageFighter: damageFighter,
  renderHealthState: renderHealthState
};

const enemy = {
  name: 'Charmander',
  health: 100,
  currentHealth: 100,
  progressbar: document.getElementById('progressbar-enemy'),
  state: document.getElementById('health-enemy'),
  damageFighter: damageFighter,
  renderHealthState: renderHealthState
};

const clicks = {
  maxClicks: MAX_CLICK_PER_BUTTON,
  total: {
    clickCount: 0,
  },
};

const createButtons = (name) => {
  const elem = Object.create(clicks);
  elem.count = 0;
  elem.name = name;
  return elem;
};

const clickThiderJolt = createButtons('ThiderJolt');
const clickSuperStrike = createButtons('SuperStrike');
const clickRandom = createButtons('Random');

const {
  name: nameHero,
} = hero;

const {
  name: nameEmemy,
} = enemy;

// ------------------ utils.js ----------------------------

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomElement = (someArray) => {
  const randomElement = getRandomInteger(0, someArray.length - 1);
  return someArray[randomElement];
};

// ------------------ log.js ----------------------------

let logList = new Array();

const createLogMessage = (firstChar, secondChar, damage) => {
  const {
    name,
    currentHealth,
    health
  } = firstChar;

  const {
    name: otherName
  } = secondChar;

  const logs = [
    `${name} вспомнил что-то важное, но неожиданно ${otherName}, не помня себя от испуга, ударил в предплечье врага.`,
    `${name} поперхнулся, и за это ${otherName} с испугу приложил прямой удар коленом в лоб врага.`,
    `${name} забылся, но в это время наглый ${otherName}, приняв волевое решение, неслышно подойдя сзади, ударил.`,
    `${name} пришел в себя, но неожиданно ${otherName} случайно нанес мощнейший удар.`,
    `${name} поперхнулся, но в это время ${otherName} нехотя раздробил кулаком \<вырезанно цензурой\> противника.`,
    `${name} удивился, а ${otherName} пошатнувшись влепил подлый удар.`,
    `${name} высморкался, но неожиданно ${otherName} провел дробящий удар.`,
    `${name} пошатнулся, и внезапно наглый ${otherName} беспричинно ударил в ногу противника`,
    `${name} расстроился, как вдруг, неожиданно ${otherName} случайно влепил стопой в живот соперника.`,
    `${name} пытался что-то сказать, но вдруг, неожиданно ${otherName} со скуки, разбил бровь сопернику.`
  ];

  logList.push(`${getRandomElement(logs)} -${damage} [${currentHealth}/${health}]`);
  return;
};

// ------------------ render.js ----------------------------

const caption = 'Fight log:';
const clickCaption = 'Click log:';

const renderContainer = () => {
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
  renderLogContainer(clickCaption, BUTTONS_COUNT + 2);
  logContainer.children[logContainer.children.length - 1].style.marginRight = '0';
  prepareLog();
  prepareClickLog();
};

const prepareLog = () => {
  const logContainer = document.querySelector('#log-container').children[0];
  const logText = logContainer.querySelector('span');
  logText.id = 'log-caption-text';
};

const prepareClickLog = () => {
  const logContainer = document.querySelector('#log-container').children[1];

  const logText = logContainer.querySelector('ul').children[0];
  logText.innerText = `
  Max ${MAX_CLICK_PER_BUTTON} clicks on one button!`;

  const logButtonOne = logContainer.querySelector('ul').children[1];
  logButtonOne.innerText = `
  ${clickThiderJolt.name}:  `;
  logButtonOne.id = clickThiderJolt.name;

  const logButtonTwo = logContainer.querySelector('ul').children[2];
  logButtonTwo.innerText = `
  ${clickSuperStrike.name}:  `;
  logButtonTwo.id = clickSuperStrike.name;

  const logButtonThree = logContainer.querySelector('ul').children[3];
  logButtonThree.innerText = `
  ${clickRandom.name}:  `;
  logButtonThree.id = clickRandom.name;

  renderTotalClicks();
};

const renderButtonClicks = (id, total) => {
  const logContainer = document.querySelector('#log-container').children[1];
  const logButton = logContainer.querySelector(`#${id}`);
  logButton.innerText = `
  ${id}: ${total}`;
}

const renderTotalClicks = (total = 0) => {
  const logContainer = document.querySelector('#log-container').children[1];
  const logTotal = logContainer.querySelector('ul').children[BUTTONS_COUNT + 1];
  logTotal.innerText = `
  Total clicks: ${total}`;
};

const renderLogContainer = (text, index) => {
  const logContainer = document.createElement('div');
  logContainer.style.width = '350px';
  logContainer.classList.add('log-background');
  logContainer.style.marginRight = '20px';

  const logCaption = document.createElement('p');
  const logCaptionText = document.createElement('span');
  logCaptionText.innerText = `${text}`;

  const logList = document.createElement('ul');
  for (i = 0; i < index; i++) {
    const logText = document.createElement('li');
    logList.append(logText);
  }

  logContainer.append(logCaption);
  logCaption.append(logCaptionText);
  logCaption.append(logList);

  const $log = document.querySelector('#log-container');
  $log.append(logContainer);
};

const renderLogMessage = () => {
  const $log = document.querySelector('.log-background ul');

  for (i = 0; i < Math.min(logList.length, MAX_LOG_ELEMENTS); i++) {
    $log.children[i].innerText = `
      ${logList[logList.length - 1 - i]}
    `;
  }
};

function renderHealthState() {
  this.progressbar.style.width = `${this.currentHealth / this.health * 100}%`;
  this.state.textContent = `${this.currentHealth} / ${this.health}`;
};

const renderMessage = (message) => {
  const $logCaption = document.querySelector('#log-caption-text');
  $logCaption.innerText = `${message}`;
  $logCaption.style.backgroundColor = '#000000';
  $logCaption.style.color = '#ffffff';
};

// ------------------ main.js ----------------------------

function damageFighter(mimDamage, maxDamage) {
  const damage = getRandomInteger(mimDamage, maxDamage)
  this.currentHealth -= damage;

  if (this.currentHealth < 0) {
    this.currentHealth = 0;
  }

  const fighter = this === enemy ?
    createLogMessage(this, hero, damage) :
    createLogMessage(this, enemy, damage);
  renderLogMessage();
};

const stopGame = () => {
  $buttonThiderJolt.disabled = true;
  $buttonSuperStrike.disabled = true;
  $buttonRandom.disabled = true;
  let message;

  switch (true) {
    case ((hero.currentHealth === 0) && (enemy.currentHealth === 0)):
      message = `No winner`;
      break;
    case hero.currentHealth > 0:
      message = `Winner is ${nameHero}`;
      break;
    case enemy.currentHealth > 0:
      message = `Winner is ${nameEmemy}`;
      break;
  }

  renderMessage(message);
};

const buttonThiderJoltHandler = () => {
  hero.damageFighter(MIN_DAMAGE_REGULAR, MAX_DAMAGE_REGULAR);
  enemy.damageFighter(MIN_DAMAGE_REGULAR, MAX_DAMAGE_REGULAR);
  hero.renderHealthState();
  enemy.renderHealthState();

  clickThiderJolt.count++;
  clickThiderJolt.total.clickCount++;

  clickThiderJolt.count >= clickThiderJolt.maxClicks ?
    $buttonThiderJolt.disabled = true :
    null;

  renderButtonClicks(clickThiderJolt.name, clickThiderJolt.count);
  renderTotalClicks(clickThiderJolt.total.clickCount);

  if (hero.currentHealth === 0 || enemy.currentHealth === 0) {
    stopGame();
  }
};

const buttonSuperStrikeHandler = () => {
  enemy.damageFighter(MIN_DAMAGE_SUPER, MAX_DAMAGE_SUPER);
  enemy.renderHealthState();

  clickSuperStrike.count++;
  clickSuperStrike.total.clickCount++;

  renderButtonClicks(clickSuperStrike.name, clickSuperStrike.count);
  renderTotalClicks(clickSuperStrike.total.clickCount);

  if (enemy.currentHealth === 0) {
    stopGame();
  }

  $buttonSuperStrike.disabled = true;
};

const buttonRandomHandler = () => {
  const randomChar = getRandomInteger() ?
    hero.damageFighter(MIN_DAMAGE_SUPER, MAX_DAMAGE_SUPER) :
    enemy.damageFighter(MIN_DAMAGE_SUPER, MAX_DAMAGE_SUPER);

  hero.renderHealthState();
  enemy.renderHealthState();

  clickRandom.count++;
  clickRandom.total.clickCount++;

  clickRandom.count >= clickRandom.maxClicks ?
    $buttonRandom.disabled = true :
    null;

  renderButtonClicks(clickRandom.name, clickRandom.count);
  renderTotalClicks(clickRandom.total.clickCount);

  if (hero.currentHealth === 0 || enemy.currentHealth === 0) {
    stopGame();
  }
};

const startGame = () => {
  $buttonThiderJolt.addEventListener('click', buttonThiderJoltHandler);
  $buttonSuperStrike.addEventListener('click', buttonSuperStrikeHandler);
  $buttonRandom.addEventListener('click', buttonRandomHandler);

  renderContainer();
};

startGame();
