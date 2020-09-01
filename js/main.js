import {
  MIN_DAMAGE_REGULAR,
  MAX_DAMAGE_REGULAR,
  MIN_DAMAGE_SUPER,
  MAX_DAMAGE_SUPER,
  MAX_CLICK_PER_BUTTON,
  $buttonThiderJolt,
  $buttonSuperStrike,
  $buttonRandom,
  log
} from "./const.js";
import {
  getRandomInteger,
  decreaseClicks
}
from "./utils.js";
import {
  renderContainer,
  renderButtonClicks,
  renderTotalClicks,
  renderMessage
} from "./render.js";
import Pokemon from "./pokemon.js";

export const hero = new Pokemon({
  name: 'Pikachu',
  health: 100,
  currentHealth: 100,
  selector: 'character',
});

export const enemy = new Pokemon({
  name: 'Charmander',
  health: 100,
  currentHealth: 100,
  selector: 'enemy',
});

const createButtons = (name) => {
  const elem = Object.create(log);
  elem.count = 0;
  elem.name = name;
  elem.decreaseClicks = decreaseClicks();
  return elem;
};

const buttonThiderJolt = createButtons('ThiderJolt');
const buttonSuperStrike = createButtons('SuperStrike');
const buttonRandom = createButtons('Random');

const {
  name: nameHero,
} = hero;

const {
  name: nameEmemy,
} = enemy;

const startGame = () => {
  renderButtonClicks($buttonThiderJolt);
  renderButtonClicks($buttonSuperStrike, 1);
  renderButtonClicks($buttonRandom);

  $buttonThiderJolt.addEventListener('click', buttonThiderJoltHandler);
  $buttonSuperStrike.addEventListener('click', buttonSuperStrikeHandler);
  $buttonRandom.addEventListener('click', buttonRandomHandler);

  renderContainer();
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

  buttonThiderJolt.total.clickCount++;

  const countLeft = buttonThiderJolt.decreaseClicks();
  renderButtonClicks($buttonThiderJolt, countLeft);

  renderTotalClicks(buttonThiderJolt.total.clickCount);

  countLeft === 0 ?
    $buttonThiderJolt.disabled = true :
    null;

  if (hero.currentHealth === 0 || enemy.currentHealth === 0) {
    stopGame();
  }
};

const buttonSuperStrikeHandler = () => {
  enemy.damageFighter(MIN_DAMAGE_SUPER, MAX_DAMAGE_SUPER);

  buttonSuperStrike.total.clickCount++;

  const countLeft = buttonSuperStrike.decreaseClicks(MAX_CLICK_PER_BUTTON);

  renderButtonClicks($buttonSuperStrike, countLeft);
  renderTotalClicks(buttonSuperStrike.total.clickCount);

  countLeft === 0 ?
    $buttonSuperStrike.disabled = true :
    null;

  if (enemy.currentHealth === 0) {
    stopGame();
  }
};

const buttonRandomHandler = () => {
  const randomChar = getRandomInteger() ?
    hero.damageFighter(MIN_DAMAGE_SUPER, MAX_DAMAGE_SUPER) :
    enemy.damageFighter(MIN_DAMAGE_SUPER, MAX_DAMAGE_SUPER);

  buttonRandom.total.clickCount++;

  const countLeft = buttonRandom.decreaseClicks();

  renderButtonClicks($buttonRandom, countLeft);
  renderTotalClicks(buttonRandom.total.clickCount);

  countLeft === 0 ?
    $buttonRandom.disabled = true :
    null;

  if (hero.currentHealth === 0 || enemy.currentHealth === 0) {
    stopGame();
  }
};

startGame();
