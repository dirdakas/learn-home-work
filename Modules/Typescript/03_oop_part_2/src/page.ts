import { Item } from './item';

export class Page { //extends Item {
  pageNumber: number;
  pageType: string;
  pageMaterial: string;

  constructor(pageNumber: number, type: string, material: string) {
    // super()
    this.pageNumber = pageNumber;
    this.pageType = type;
    this.pageMaterial = material;
  }

  toString(): string {
    return `here is page ${this.pageType} #${this.pageNumber} and it's material is ${this.pageMaterial}`;
  }
}