const MIN_DAMAGE_REGULAR = 5;
const MAX_DAMAGE_REGULAR = 15;
const MIN_DAMAGE_SUPER = 15;
const MAX_DAMAGE_SUPER = 25;

const $buttonThiderJolt = document.getElementById('btn-kick');
const $buttonSuperStrike = document.getElementById('btn-kick-super');

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

function damageFighter(mimDamage, maxDamage) {
  this.currentHealth -= getRandomInteger(mimDamage, maxDamage);

  if (this.currentHealth < 0) {
    this.currentHealth = 0;
  }
};

function renderHealthState() {
  this.progressbar.style.width = this.currentHealth / this.health * 100 + '%';
  this.state.textContent = `${this.currentHealth} / ${this.health}`;
};

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

const stopGame = () => {
  $buttonThiderJolt.disabled = true;
  $buttonSuperStrike.disabled = true;

  switch (true) {
    case (hero.currentHealth === 0 && enemy.currentHealth === 0):
      message = `No winner`;
      break;
    case hero.currentHealth > 0:
      message = `Winner is ${hero.name}`;
      break;
    case enemy.currentHealth > 0:
      message = `Winner is ${enemy.name}`;
      break;
  }

  renderMessage(message);
}

const renderMessage = (message) => {
  const $header = document.querySelector('header');
  const $div = document.createElement('div');
  $div.innerHTML = `<p>${message}</p>`;
  $header.append($div);
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
};

startGame();
