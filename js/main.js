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
  resetButtonContainer
}
from "./utils.js";
import {
  renderContainer,
  renderHeaderMessage,
  renderStartButton,
  renderPlayer,
  renderTotalKillS
} from "./render.js";
import Pokemon from "./pokemon.js";
import {
  getPokemons
} from "./backend.js";

let pokemons;
export let hero;
export let enemy;

const reloadPlayerOne = () => {
  const pikachu = getPlayerOne('Pikachu', pokemons);
  renderPlayer('player1', pikachu);
  return new Pokemon({
    ...pikachu,
    selector: 'player1',
    kills: Object.create(log)
  });
};

const getEnemy = () => {
  const pokemonsWithoutPukachu = getPlayerTwo('Pikachu', pokemons);
  const randomChar = getRandomElement(pokemonsWithoutPukachu);
  renderPlayer('player2', randomChar);
  return new Pokemon({
    ...randomChar,
    selector: 'player2',
    kills: Object.create(log)
  });
};


const initGame = async () => {
  pokemons = await getPokemons();
  renderContainer();
  renderHeaderMessage();
  renderStartButton();
  resetColorProgressBar();
};

export const startGame = () => {

  resetButtonContainer();
  showTimer();
  let lastTimeout;
  clearTimeout(lastTimeout);
  lastTimeout = window.setTimeout(function () {
    hero = reloadPlayerOne();
    enemy = getEnemy();
    hero.getButtons();
    clearLog();
    renderTotalKillS(hero.kills.kills.total, hero.kills.kills.lastVictim);
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
