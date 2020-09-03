import {
  DELAY,
  $container,
} from "./const.js";
import {
  getRandomInteger,
  getRandomElement,
  decreaseClicks,
  showTimer,
  getPlayerOne,
  showHeaderMessage,
}
from "./utils.js";
import {
  renderContainer,
  renderButtonClicks,
  renderTotalClicks,
  renderMessage,
  renderHeaderMessage,
  renderStartButton,
  renderPlayerTwo,
  renderPlayerOne
} from "./render.js";
import Pokemon from "./pokemon.js";
import {
  pokemons
} from "./pokemons.js";

const reloadPlayerOne = () => {
  const pikachu = getPlayerOne('Pikachu', pokemons);
  renderPlayerOne(pikachu);
  return new Pokemon({
    ...pikachu,
    selector: 'player1',
  });
};

const getEnemy = () => {
  const char = getPlayerOne(getRandomElement(pokemons).name, pokemons);
  renderPlayerTwo(char);
  return new Pokemon({
    ...char,
    selector: 'player2',
  });
}
export let hero;
export let enemy;

const initGame = () => {
  renderContainer();
  renderHeaderMessage();
  renderStartButton();
};

export const startGame = () => {
  $container.innerText = '';
  showTimer();
  let lastTimeout;
  lastTimeout = window.setTimeout(function () {
    hero = reloadPlayerOne();
    enemy = getEnemy();
    hero.getButtons();
  }, DELAY * 3);
};

export const stopGame = () => {
  let message;
  switch (true) {
    case ((hero.currentHealth === 0) && (enemy.currentHealth === 0)):
      message = `No winner`;
      renderStartButton();
      break;
    case hero.currentHealth > 0:
      message = `Winner is ${hero.name}`;
      startGame();
      break;
    case enemy.currentHealth > 0:
      message = `Winner is ${enemy.name}`;
      renderStartButton();
      break;
  }
  showHeaderMessage(message);
};

initGame();
