import { Page } from './page';
import { Pages } from './pages';

type Constructor = new (...args: any[]) => {};

export function PagesIterable<TBase extends Constructor>(Base: TBase) {
  return class Scaling extends Pages {
    [Symbol.iterator]() { return this.list.values() }
  };
}
