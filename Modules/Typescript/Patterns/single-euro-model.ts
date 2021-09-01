import { InputInterface } from './utils';

export class SingleEuroModel {
  private data: InputInterface[];

  constructor(data?: InputInterface[]) {
    this.data = data || [];
  }

  getData(): InputInterface[] {
    return this.data;
  }
}