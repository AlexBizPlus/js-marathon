import {
  getRandomInteger
} from "./utils.js";
import {
  createLogMessage
} from "./log.js";
import {
  renderLogMessage,
} from "./render.js";
import {
  hero,
  enemy
} from "./main.js";

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
    this.health = props.health;
    this.currentHealth = props.health;
    this.type = props.type;
  };

  renderHealthState() {
    this.progressbar.style.width = `${this.currentHealth / this.health * 100}%`;
    this.state.textContent = `${this.currentHealth} / ${this.health}`;
  };

  damageFighter(mimDamage, maxDamage) {
    const damage = getRandomInteger(mimDamage, maxDamage)
    this.currentHealth -= damage;

    if (this.currentHealth < 0) {
      this.currentHealth = 0;
    }

    const fighter = this === enemy ?
      createLogMessage(this, hero, damage) :
      createLogMessage(this, enemy, damage);
    renderLogMessage();

    this.renderHealthState();
  };
};

export default Pokemon;
