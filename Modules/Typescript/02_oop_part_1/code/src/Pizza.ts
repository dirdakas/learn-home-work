import { Consumable } from './Consumable';

export class Pizza extends Consumable {
  numberOfSlices: number;
  slicesEaten: number;

  constructor(numberOfSlices: number, spoiled: boolean) {
    super('Pizza', numberOfSlices, 0);
    this.numberOfSlices = numberOfSlices;
    this.spoiled = spoiled;
  }

  eat(): string {
    if (this.numberOfSlices > this.slicesEaten) {
      this.slicesEaten++;

      return `You eat a slice of the ${this.getName()}. ${this.spoiled ? ' And you feel sick.' : ''}`;
    }

    return `There is nothing left of the ${this.getName()} to consume.`;
  }
}