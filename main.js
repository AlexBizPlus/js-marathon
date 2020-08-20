// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generatePhoneNumber = () => {
  let phoneNumber = new Array();

  phoneNumber.push('+');
  for (let i = 0; i < 15; i++) {
    phoneNumber.push(getRandomInteger(0, 9));
  }
  phoneNumber.splice(2, 1, ' (');
  phoneNumber.splice(6, 1, ') ');
  phoneNumber.splice(10, 1, '-');
  phoneNumber.splice(13, 1, '-');

  return phoneNumber.join('');
};

const ridSpaces = (string) => {
  return string.split(' ').join('');
};

const getRow = (firstString, secondString) => {
  const newFirstString = ridSpaces(firstString);
  const newSecondString = ridSpaces(secondString);

  const result = newFirstString.length >= newSecondString.length
    ? newFirstString.length === newSecondString.length
      ? 'Lenghts of strings are equals'
      : `First string is longer than second one: ${newFirstString}`
    : `Second string is longer than first one: ${newSecondString}`;

  return result;
};

const chooseTask = () => {
  const numberTask = prompt('Type 1 or 2:');
  switch (numberTask) {
    case '1':
      const userFirstString = prompt('Type sting 1:');
      const userSecondString = prompt('Type sting 2:');
      alert(getRow(userFirstString, userSecondString));
      break;

    case '2':
      alert('Your fake phone number: ' + generatePhoneNumber());
      break;

    default:
      alert('Press F5 and try again');
      break;
  }

};

chooseTask();
