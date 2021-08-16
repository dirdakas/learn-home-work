import { Item } from './Item';

export abstract class Consumable extends Item {
  consumed: boolean = false;
  spoiled: boolean = false;

  constructor(name: string, value: number, weight: number) {
    super(name, value, weight);
  }

  use(): string {
    if (!this.consumed && !this.spoiled) {
      return this.eat();
    }
  }

  eat(): string {
    if (this.consumed) {
      return `There is nothing left of the ${this.getName()} to consume.`
    } else {
      return `You eat the ${this.getName()}. ${this.spoiled ? 'You feel sick.' : ''}`
    }
  }
} 