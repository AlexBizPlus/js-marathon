import {
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
import {
  getDamages
} from "./backend.js";
class Selectors {
  constructor(name) {
    this.progressbar = document.getElementById(`progressbar-${name}`);
    this.state = document.getElementById(`health-${name}`);
    this.img = document.getElementById(`img-${name}`);
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
    this.id = props.id;
  };

  renderHealthState() {
    this.progressbar.style.width = `${this.currentHealth / this.health * 100}%`;
    this.state.textContent = `${this.currentHealth} / ${this.health}`;

    (this.currentHealth / this.health) < 0.2 ?
      this.progressbar.classList.add('critical') :
      (this.currentHealth / this.health) < 0.6 ?
      this.progressbar.classList.add('low') :
      null;
  };

  damageFighter(damage) {
    this.currentHealth -= damage;

    if (this.currentHealth < 0) {
      hero.kills.kills.lastVictim = enemy.name;
      hero.kills.kills.total++;
      this.currentHealth = 0;
    }

    this === enemy ?
      createLogMessage(enemy, hero, damage) :
      createLogMessage(hero, enemy, damage);

    renderLogMessage();

    this.renderHealthState();
  };

  renderButton(name, maxCount, id) {
    $container.style.alignContent = '';
    const $button = document.createElement('button');
    $button.classList.add('button');
    $button.innerText = `${firstLetterToUpperCase(name)} []`;
    renderButtonClicks($button, maxCount);
    const buttonCount = decreaseClicks(maxCount);
    $button.addEventListener('click', async () => {

      const damages = await getDamages(hero.id, enemy.id, id);
      enemy.damageFighter(damages.kick.player2);
      hero.damageFighter(damages.kick.player1);

      const countLeft = buttonCount();
      renderButtonClicks($button, countLeft);

      countLeft === 0 ?
        $button.disabled = true :
        null;

      if (hero.currentHealth === 0 || enemy.currentHealth === 0) {
        stopGame();
        return;
      }
    });
    $container.append($button);
  }

  getButtons() {
    $container.innerText = '';
    this.attacks.forEach(element => {
      this.renderButton(element.name, element.maxCount, element.id);
    });
  };
};

export default Pokemon;
