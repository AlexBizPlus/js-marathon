import {
  SERVER
} from "./const.js";

export const getDamages = async (playerOneId, playerTwoId, buttonId) => {
  const response = await fetch(`${SERVER}/fight?player1id=${playerOneId}&attackId=${buttonId}&player2id=${playerTwoId}`);
  return await response.json();
};

export const getPokemons = async () => {
  const response = await fetch(`${SERVER}/pokemons`);
  return await response.json();
};
