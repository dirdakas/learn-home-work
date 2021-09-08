import { Page } from './page';
import { Item } from './item';
import { Pages } from './pages';

export class Comics extends Item {
  _title: string;
  // set title(newTitle) {
  //   this._title = newTitle;
  // }
  // get title(): string {
  //   return this.title;
  // }

  _author: string;
  // set author(newAuthor) {
  //   this._author = newAuthor;
  // }
  // get author(): string {
  //   return this.author;
  // }

  _artist: string;
  // set artist(newArtist) {
  //   this._artist = newArtist;
  // }
  // get artist(): string {
  //   return this.artist;
  // }

  pages: Page[];

  constructor(title: string, author: string, artist: string, pages: Pages) {
    super(pages.list);

    this._title = title;
    this._author = author;
    this._artist = artist;
    this.pages = pages.list;
  }

  toString(): string {
    return `Comics: ${this._title} by ${this._author}, the artist is ${this._artist}, number of pages: ${this.pages.length}`;
  }

  [Symbol.iterator]() {
    let index = 0;
    let data  = this.pages;
    return {
      next: () => {
        index++;
        return { 
          value: index === this.pages.length ? null : `Comics: ${this._title} by ${this._author}, the artist is ${this._artist}, number of pages: ${data.length}, here is page ${data[index].pageType} #${index} and it's material is ${data[index].pageMaterial}`,
          done: index === this.pages.length
        }
    }}
  }
}