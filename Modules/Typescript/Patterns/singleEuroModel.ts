import { PubSub } from './pubsub';
import { EventEnum, InputInterface, resId, resValId, resValIdOther, valueId } from './utils';

export class SingleEuroModel {
  private dataList: InputInterface[] = [];
  private isListening: boolean = false;


  constructor(list: InputInterface[]) {
    this.dataList = list;

    this.init();
  }

  init(): void {
    if (!this.isListening) {
      PubSub.sub(`${EventEnum.SingleEuro}-update`, (val) => this.updateValuesOnTemplate(val));
    }
  }

  private updateValuesOnTemplate(val: string): void {
    const value: number = Number(val);

    this.dataList.map((item, index) => {
      item.value = value;

      this.findAndUpdate(`${valueId}${index}`, val)
      this.findAndUpdate(`${resId}${index}`, (value * item.oneOnOne).toFixed(2))
      document.getElementById(`${resValId}${index}`).innerText = val;
      
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