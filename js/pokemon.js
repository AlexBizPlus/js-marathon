import {
  getRandomInteger,
  firstLetterToUpperCase,
  decreaseClicks
} from "./utils.js";
import {
  createLogMessage
} from "./log.js";
import {
  renderLogMessage,
  renderButtonClicks
} from "./render.js";
import {
  hero,
  enemy,
  stopGame
} from "./main.js";
import {
  $container,
  log,
} from "./const.js";
class Selectors {
  constructor(name) {
    this.progressbar = document.getElementById(`progressbar-${name}`);
    this.state = document.getElementById(`health-${name}`);
  }
};
class Pokemon extends Selectors {
  constructor(props) {
    super(props.selector);
    this.name = props.name;
    this.health = props.hp;
    this.currentHealth = props.hp;
    this.type = props.type;
    this.attacks = props.attacks;
    this.kills = props.kills;
  };

  renderHealthState() {
    this.progressbar.style.width = `${this.currentHealth / this.health * 100}%`;
    this.state.textContent = `${this.currentHealth} / ${this.health}`;
  };

  damageFighter(minDamage = 0, maxDamage = 0) {
    const damage = this === enemy ?
      getRandomInteger(minDamage, maxDamage) :
      getRandomInteger(enemy.attacks[0].minDamage, enemy.attacks[0].maxDamage);

    this.currentHealth -= damage;

    if (this.currentHealth < 0) {
      hero.kills.kills.total++;
      this.currentHealth = 0;
    }

    this === enemy ?
      createLogMessage(enemy, hero, damage) :
      createLogMessage(hero, enemy, damage);

    renderLogMessage();

    this.renderHealthState();

    if (hero.currentHealth === 0 || enemy.currentHealth === 0) {
      stopGame();
      return;
    }
  };

  renderButton(name, maxCount, minDamage, maxDamage) {
    $container.style.alignContent = '';
    const $button = document.createElement('button');
    $button.classList.add('button');
    $button.innerText = `${firstLetterToUpperCase(name)} []`;
    renderButtonClicks($button, maxCount);
    const buttonCount = decreaseClicks(maxCount);
    $button.addEventListener('click', () => {
      enemy.damageFighter(minDamage, maxDamage);
      const countLeft = buttonCount();
      renderButtonClicks($button, countLeft);

      countLeft === 0 ?
        $button.disabled = true :
        null;
      hero.damageFighter();
    });
    $container.append($button);
  }

  getButtons() {
    $container.innerText = '';
    this.attacks.forEach(element => {
      this.renderButton(element.name, element.maxCount, element.minDamage, element.maxDamage);
    });
  };
};

export default Pokemon;
