import { Page } from './page';
import { Pages } from './pages';
import { Item } from './item';

export class Book extends Item {
  _title: string;
  // set title(newTitle) {
  //   this._title = newTitle;
  // }
  // get title(): string {
  //   return this._title;
  // }

  _author: string;
  // set author(newAuthor) {
  //   this.author = newAuthor;
  // }
  // get author(): string {
  //   return this.author;
  // }

  pages: Page[];

  constructor(title: string, auth: string, pages: Pages) {
    super(pages.list);
    this._author = auth;
    this._title = title;
    this.pages = pages.list;
  }

  toString(): string {
    return `Book: ${this._title} by ${this._author} with number of pages: ${this.pages.length}`;
  }

  [Symbol.iterator]() { 
    let index = 0;
    let data  = this.pages;

    return {
      next: () => {
        index++;

        return {
          value: index === this.pages.length ? null : `Book: ${this._title} by ${this._author} with number of pages: ${data.length}, here is page ${data[index].pageType} #${index} and it's material is ${data[index].pageMaterial}`,
          done: index === this.pages.length
        }
      }
    }
  }
}