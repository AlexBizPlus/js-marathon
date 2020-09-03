import {
  log
} from "./const.js";

import {
  getRandomElement
} from "./utils.js";

export const createLogMessage = (firstChar, secondChar, damage) => {
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

  log.logList.push(`${getRandomElement(logs)} -${damage} [${currentHealth}/${health}]`);
  return;
};
