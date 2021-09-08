import { Item } from './Item';

export abstract class Weapon extends Item {
  baseDamage: number;
  damageModifier: number;
  static MODIFIER_CHANGE_RATE: number = 0.05;
  // sum of those === broken
  baseDurability: number; // where to set it?
  durabilityModifier: number // where to set it?

  constructor(
    name: string,
    baseDamage: number,
    baseDurability: number,
    value: number,
    weight: number
  ) {
    super(name, value, weight);
    this.baseDamage = baseDamage;
    this.baseDurability = baseDurability;
  }

  public getDamage(): number {
    return this.baseDamage + this.damageModifier;
  }

  public getDurability(): number {
    return this.baseDurability + this.durabilityModifier;
  }

  public toString(): string {
    return `${this.getName()} - Value: ${this.getValue()}, Weight: ${this.getWeight().toFixed(2)}, Damage: ${this.getDamage()}, Durability: ${this.getDurability()}%`;
  }

  public use(): string {
    let result: string = '';
    if (this.getDurability() > 0) {
      result = `”You use the ${this.getName()} , dealing ${this.getDamage().toFixed(2)} points of damage.”`;
  
      this.durabilityModifier - Weapon.MODIFIER_CHANGE_RATE;
      // check if broken
      if (this.getDurability() - Weapon.MODIFIER_CHANGE_RATE <= 0) {
        result += ` The ${this.getName()} breaks.`;
      }
    } else {
      // it's broken
      result += `”You can't use the ${this.getName()} , it is broken.”`
    }

    return result;
  }
} 