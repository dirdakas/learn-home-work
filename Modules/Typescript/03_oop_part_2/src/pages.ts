import { Page } from './page';

export class Pages {
  list: Page[];

  constructor(pages: Page[]) {
    this.list = pages;
  }

  addPage(page: Page): void {
    this.list.push(page);
  }

  removePage(index: number): void {
    this.list.splice(index, 1);
  }

  toString(): string {
    return this.list.join(', ');
  }

  // [Symbol.iterator]() { 
  //   let index = -1;
  //   let data  = this.list;

  //   return {
  //     next: () => {
  //       index++;

  //       return {
  //         value: index === this.list.length ? null : data[index],
  //         done: index === this.list.length
  //       }
  //     }
  //   }
  // }
}