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
  const logs = [
    `${firstChar.name} вспомнил что-то важное, но неожиданно ${secondChar.name}, не помня себя от испуга, ударил в предплечье врага.`,
    `${firstChar.name} поперхнулся, и за это ${secondChar.name} с испугу приложил прямой удар коленом в лоб врага.`,
    `${firstChar.name} забылся, но в это время наглый ${secondChar.name}, приняв волевое решение, неслышно подойдя сзади, ударил.`,
    `${firstChar.name} пришел в себя, но неожиданно ${secondChar.name} случайно нанес мощнейший удар.`,
    `${firstChar.name} поперхнулся, но в это время ${secondChar.name} нехотя раздробил кулаком \<вырезанно цензурой\> противника.`,
    `${firstChar.name} удивился, а ${secondChar.name} пошатнувшись влепил подлый удар.`,
    `${firstChar.name} высморкался, но неожиданно ${secondChar.name} провел дробящий удар.`,
    `${firstChar.name} пошатнулся, и внезапно наглый ${secondChar.name} беспричинно ударил в ногу противника`,
    `${firstChar.name} расстроился, как вдруг, неожиданно ${secondChar.name} случайно влепил стопой в живот соперника.`,
    `${firstChar.name} пытался что-то сказать, но вдруг, неожиданно ${secondChar.name} со скуки, разбил бровь сопернику.`
  ];

  logList.push(`${getRandomElement(logs)} -${damage} [${firstChar.currentHealth}/${firstChar.health}]`);
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
