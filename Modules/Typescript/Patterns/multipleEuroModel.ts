import { PubSub } from './pubsub';
import { EventEnum, InputInterface, resId, resValId, resValIdOther, valueId } from './utils';


interface IMultiVal {
  value: number;
  id: string;
}

export class MultipleEuroModel {
  private dataList: InputInterface[] = [];
  private isListening: boolean = false;

  constructor(list: InputInterface[]) {
    this.dataList = list;

    this.init();
  }

  init(): void {
    if (!this.isListening) {
      PubSub.sub(`${EventEnum.MultipleEuro}-update`, (val) => this.updateValuesOnTemplate(val));
    }
  }

  private updateValuesOnTemplate(data: IMultiVal): void {
    const value: number = Number(data.value);
    const index: string = data.id.split('-')[1];

    this.dataList.map(item => {
      item.value = value;

      this.findAndUpdate(`${valueId}${index}`, value)
      this.findAndUpdate(`${resId}${index}`, (value * item.oneOnOne).toFixed(2))
      document.getElementById(`${resValId}${index}`).innerText = value.toString();
      
      const sliderResText = document.getElementById(`${resValIdOther}${index}`);
      if (sliderResText) {
        sliderResText.innerText = (value * item.oneOnOne).toFixed(2);
      }

      return item;
    });
  }

  stop(): void {
    PubSub.unsub(`${EventEnum.SingleEuro}-update`);
    this.isListening = false;
  }

  private findAndUpdate(id: string, val: number | string): void {
    (document.getElementById(id) as HTMLInputElement)?.setAttribute('value', val.toString());
  }
}