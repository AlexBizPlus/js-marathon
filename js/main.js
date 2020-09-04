import {
  DELAY,
  $container,
  log
} from "./const.js";
import {
  getRandomElement,
  showTimer,
  getPlayerOne,
  showHeaderMessage,
  getPlayerTwo,
  clearLog,
  resetColorProgressBar,
}
from "./utils.js";
import {
  renderContainer,
  renderHeaderMessage,
  renderStartButton,
  renderPlayerTwo,
  renderPlayerOne,
  renderTotalKillS
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
    kills: Object.create(log)
  });
};

const getEnemy = () => {
  const pokemonsWithoutPukachu = getPlayerTwo('Pikachu', pokemons);
  const randomChar = getRandomElement(pokemonsWithoutPukachu);
  renderPlayerTwo(randomChar);
  return new Pokemon({
    ...randomChar,
    selector: 'player2',
    kills: Object.create(log)
  });
};

export let hero;
export let enemy;

const initGame = () => {
  renderContainer();
  renderHeaderMessage();
  renderStartButton();
  resetColorProgressBar();
};

export const startGame = () => {
  $container.innerText = '';
  showTimer();
  let lastTimeout;
  clearTimeout(lastTimeout);
  lastTimeout = window.setTimeout(function () {
    hero = reloadPlayerOne();
    enemy = getEnemy();
    hero.getButtons();
    clearLog();
    renderTotalKillS(hero.kills.kills.total);
    clearTimeout(lastTimeout);
    return;
  }, DELAY * 3);
};

export const stopGame = () => {
  let message;
  switch (true) {
    case hero.currentHealth > 0:
      message = `Winner is ${hero.name}`;
      startGame();
      break;
    case enemy.currentHealth > 0:
      message = `Winner is ${enemy.name}`;
      renderStartButton();
      log.kills.total = 0;
      break;
    case ((hero.currentHealth === 0) && (enemy.currentHealth === 0)):
      message = `No winner`;
      renderStartButton();
      log.kills.total = 0;
      break;
  }
  showHeaderMessage(message);
  resetColorProgressBar();
  return;
};

initGame();
