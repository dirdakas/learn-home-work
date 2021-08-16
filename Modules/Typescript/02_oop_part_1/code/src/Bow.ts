import { Weapon } from './Weapon';

export class Bow extends Weapon {
  constructor(
    baseDamage: number,
    baseDurability: number,
    value: number,
    weight: number
  ) {
    super('Bow', baseDamage, baseDurability, value, weight);
  }

  public polish(): void {
    const maxD: number = 1;

    if (this.getDurability() < maxD) {
      this.durabilityModifier = this.durabilityModifier + Weapon.MODIFIER_CHANGE_RATE;

      if (this.getDurability() > maxD) {
        this.damageModifier = maxD - this.baseDamage;
      }
    }
  }
}