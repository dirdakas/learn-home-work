import { Pages } from './pages';
import { Page } from './page';
import { Item } from './item';

export class Magazine extends Item {
  _title: string;
  // set title(newTitle) {
  //   this._title = newTitle;
  // }
  // get title(): string {
  //   return this.title;
  // }

  pages: Page[];

  constructor(title: string, pages: Pages) {
    super(pages.list);
    this._title = title;
    this.pages = pages.list;
  }

  toString(): string {
    return `Magazine: ${this._title} with number of pages: ${this.pages.length}`
  }

  [Symbol.iterator]() {
    let index = 0;
    let data  = this.pages;
    return {
      next: () => {
        index++;
        return { 
          value: index === this.pages.length ? null : `Magazine: ${this._title} with number of pages: ${data.length}, here is page ${data[index].pageType} #${index} and it\'s material is ${data[index].pageMaterial}`,
          done: index === this.pages.length
        }
    }}
  }
}