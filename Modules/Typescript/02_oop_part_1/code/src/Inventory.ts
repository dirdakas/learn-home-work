import { Item } from './Item';
import { ItemComparator } from './ItemComparator';

export class Inventory {
  private items: Item[] = [];

  sort(): void;
  sort(comparator: ItemComparator): void;
  sort(comparator?: ItemComparator): void {
    if (comparator) {
      // this.items.sort((a, b) => a.compareTo(b));
      this.items.sort((a, b) => comparator.compare(a, b));
    } else {
      this.items.sort((a, b) => a.getValue() - b.getValue());
    }
  }

  toString(): string {
    return this.items.join(', ');
  }

  addItem(item: Item): void {
    this.items.push(item);
  }
}