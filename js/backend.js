import {
  SERVER
} from "./const.js";

export const getDamages = async (playerOneId, playerTwoId, buttonId) => {
  const response = await fetch(`${SERVER}/fight?player1id=${playerOneId}&attackId=${buttonId}&player2id=${playerTwoId}`);
  return await response.json();
};

// export const getPokemons = async () => {
//   const response = await fetch(`${SERVER}/pokemons`);
//   return await response.json();
// };

export const getPokemonPlayer = async (name) => {
  const response = await fetch(`${SERVER}/pokemons?name=${name}`);
  return await response.json();
};

export const getRandomPokemonWithoutOne = async (id) => {
  const response = await fetch(`${SERVER}/pokemons?random=true&exceptId=${id}`);
  return await response.json();
};
