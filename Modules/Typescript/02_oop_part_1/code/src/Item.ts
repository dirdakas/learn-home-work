import { Comparable } from './Comparable';

let numberOfItems: number = 0;

export abstract class Item implements Comparable<Item> {
    private id: number;
    private value: number;
    private name: string;
    private weight: number;
 
    constructor(name: string, value: number, weight: number) {
        this.id = numberOfItems;
        numberOfItems++;

        this.name = name;
        this.value = value;
        this.weight = weight;
    }

    public compareTo(other: Item): number {
        if (this.value == other.getValue()) {
            return this.name.toLowerCase()
                .localeCompare(
                    other.getName().toLowerCase()
                );
        }
        return this.value > other.getValue() ? 1 : -1;
    }

    public abstract use(): void;

    public toString(): string {
        return `${this.getName()} - Value: ${this.getValue()}, Weight: ${this.getWeight().toFixed(2)}`;
    }

    public getId(): number {
        return this.id;
    }

    public getValue(): number {
        return this.value;
    }

    public getName(): string {
        return this.name;
    }

    public getWeight(): number{
        return this.weight;
    }

    public setValue(val: number): void {
        this.value = val;
    }
    
    public setName(name: string): void {
        this.name = name;
    }
    
    public setWeight(weight: number): void {
        this.weight = weight;
    }

    public reset(): void {
        numberOfItems = 0;
    }
}
