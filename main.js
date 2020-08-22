const MIN_DAMAGE_REGULAR = 5;
const MAX_DAMAGE_REGULAR = 15;
const MIN_DAMAGE_SUPER = 15;
const MAX_DAMAGE_SUPER = 25;

const $buttonThiderJolt = document.getElementById('btn-kick');
const $buttonSuperStrike = document.getElementById('btn-kick-super');

const hero = {
  name: 'Pikachu',
  health: 100,
  currentHealth: 100,
  progressbar: document.getElementById('progressbar-character'),
  state: document.getElementById('health-character')
};

const enemy = {
  name: 'Charmander',
  health: 100,
  currentHealth: 100,
  progressbar: document.getElementById('progressbar-enemy'),
  state: document.getElementById('health-enemy')
};

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
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
  // alert(message);
  // console.log(message);
}

const damageFighter = (person, mimDamage, maxDamage) => {
  person.currentHealth -= getRandomInteger(mimDamage, maxDamage);

  if (person.currentHealth <= 0) {
    person.currentHealth = 0;
  }
};

const renderHealthState = (person) => {
  person.progressbar.style.width = person.currentHealth / person.health * 100 + '%';
  person.state.textContent = `${person.currentHealth} / ${person.health}`;
};

const renderMessage = (message) => {
  const $header = document.querySelector('header');
  const $div = document.createElement('div');
  $div.innerHTML = `<p>${message}</p>`;
  $header.append($div);
};

const buttonThiderJoltHandler = () => {
  damageFighter(hero, MIN_DAMAGE_REGULAR, MAX_DAMAGE_REGULAR);
  damageFighter(enemy, MIN_DAMAGE_REGULAR, MAX_DAMAGE_REGULAR);
  renderHealthState(hero);
  renderHealthState(enemy);
  if (hero.currentHealth === 0 || enemy.currentHealth === 0) {
    stopGame();
  }
};

const buttonSuperStrikeHandler = () => {
  damageFighter(enemy, MIN_DAMAGE_SUPER, MAX_DAMAGE_SUPER);
  renderHealthState(enemy);

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
