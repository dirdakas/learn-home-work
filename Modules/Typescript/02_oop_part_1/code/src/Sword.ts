import { Weapon } from './Weapon';

export class Sword extends Weapon {
  constructor(
    baseDamage: number,
    baseDurability: number,
    value: number,
    weight: number
  ) {
    super('Sword', baseDamage, baseDurability, value, weight);
  }

  public polish(): void {
    const maxP: number = 25;

    if (this.damageModifier < maxP) {
      this.damageModifier = this.damageModifier + Weapon.MODIFIER_CHANGE_RATE;

      if (this.damageModifier > maxP) {
        this.damageModifier = maxP;
      }
    }
  }
}