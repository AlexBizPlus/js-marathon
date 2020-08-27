// ------------------ const.js ----------------------------
const MIN_DAMAGE_REGULAR = 5;
const MAX_DAMAGE_REGULAR = 15;
const MIN_DAMAGE_SUPER = 15;
const MAX_DAMAGE_SUPER = 25;

const $buttonThiderJolt = document.getElementById('btn-kick');
const $buttonSuperStrike = document.getElementById('btn-kick-super');
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

const caption = 'Fight log:'

const renderLogContainer = () => {
  const logContainer = document.createElement('div');
  logContainer.style.width = '250px';
  logContainer.classList.add('log-background');
  logContainer.style.marginRight = '20px';
  logContainer.style.marginLeft = '0';
  logContainer.style.marginTop = '20px';
  logContainer.style.marginBottom = '20px';

  const logCaption = document.createElement('p');
  logCaption.innerText = `${caption}`;

  logContainer.append(logCaption);
  $playground.append(logContainer);
};

const renderLogMessage = () => {
  const $log = document.querySelector('.log-background');
  const logText = document.createElement('span');

  logText.innerText = `
  ${logList[logList.length - 1]}
  `;

  $log.prepend(logText);
};

function renderHealthState() {
  this.progressbar.style.width = `${this.currentHealth / this.health * 100}%`;
  this.state.textContent = `${this.currentHealth} / ${this.health}`;
};

const renderMessage = (message) => {
  const $logCaption = document.querySelector('.log-background p');
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
  if (hero.currentHealth === 0 || enemy.currentHealth === 0) {
    stopGame();
  }
};

const buttonSuperStrikeHandler = () => {
  enemy.damageFighter(MIN_DAMAGE_SUPER, MAX_DAMAGE_SUPER);
  enemy.renderHealthState();

  if (enemy.currentHealth === 0) {
    stopGame();
  }

  $buttonSuperStrike.disabled = true;
};

const startGame = () => {
  $buttonThiderJolt.addEventListener('click', buttonThiderJoltHandler);
  $buttonSuperStrike.addEventListener('click', buttonSuperStrikeHandler);

  renderLogContainer();
};

startGame();
