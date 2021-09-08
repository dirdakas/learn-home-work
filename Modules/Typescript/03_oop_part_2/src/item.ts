import { Pages } from './pages';
import { Page } from './page';
import { PagesIterable } from './pagesIterable';

export abstract class Item extends Pages {
  abstract toString(): string;

  constructor(pages: Page[]) {
    super(pages);
  }
}