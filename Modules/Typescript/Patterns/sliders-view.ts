import { PubSub } from './pubsub';
import { canvasId, EventEnum, InputInterface, resId, resValId, resValIdOther, singleInputModel, valueId } from './utils';

export class SlidersView {
  singleInput: boolean = true;
  readonly defaultMultipleVal: number = 100;
  
  private currModel: InputInterface;

  constructor(isSingle: boolean) {
    this.singleInput = isSingle;
    this.currModel = singleInputModel;
  }

  paint = (inputs: InputInterface[]) => {
    inputs.forEach((item, index) => this.createInput(item, index));
  }

  private createInput(input: InputInterface, index: number): void {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('style', 'border: 4px solid blue; padding: 15px');

    
    const firstLine: HTMLDivElement = this.getFirstLine(input, index);
    wrapper.append(firstLine);

    const secondLine = this.getSecondLine(input, index);
    wrapper.append(secondLine);

    const canvas = document.getElementById(canvasId);
    canvas.append(wrapper);
  }

  private getFirstLine(input: InputInterface, index: number): HTMLDivElement {
    const value = this.currModel.value.toString();
    const singleText = document.createElement('div');
    const singleValSpan = document.createElement('span');
    const singleTextSpan = document.createElement('span');
    const singleResultTextSpan = document.createElement('span');
    singleValSpan.innerText = `${value}`;
    singleTextSpan.innerText = ` Euro is ${input.currency} `;
    singleResultTextSpan.innerText = `${input.oneOnOne}`
    

    singleText.append(singleValSpan);
    singleText.append(singleTextSpan);
    singleText.append(singleResultTextSpan);

    return singleText;
  }

  private getSecondLine(input: InputInterface, index: number) {
    const secondLine = document.createElement('div');

    const firstHalf = document.createElement('div');
    firstHalf.setAttribute('style', 'display: block');

    const firstHalfText = document.createElement('span');
    firstHalfText.innerText = `Euro: `;

    const firstHalfSpan = document.createElement('span');
    firstHalfSpan.innerText = `1`;
    firstHalfSpan.setAttribute('id', `${resValId}${index}`);
    
    const firstHalfInput = document.createElement('input');
    firstHalfInput.setAttribute('value', this.defaultMultipleVal.toString());
    firstHalfInput.setAttribute('id', `${valueId}${index}`);
    firstHalfInput.setAttribute('type', 'range');
    firstHalfInput.setAttribute('min', '0');
    firstHalfInput.setAttribute('max', '50');
    firstHalfInput.setAttribute('value', `1`);
    firstHalfInput.setAttribute('style', 'display: block');

    const secondHalf = document.createElement('div');
    const secondHalfSpan = document.createElement('span');
    secondHalfSpan.innerText = `${input.currency}: `;
    
    const secondHalfSpan2 = document.createElement('span');
    secondHalfSpan2.innerText = `${input.oneOnOne}`;
    secondHalfSpan2.setAttribute('id', `${resValIdOther}${index}`);
    
    const secondHalfInput = document.createElement('input');
    secondHalfInput.setAttribute('value', (this.defaultMultipleVal * input.oneOnOne).toFixed(2));
    secondHalfInput.setAttribute('id', `${resId}${index}`);
    secondHalfInput.setAttribute('type', 'range');
    secondHalfInput.setAttribute('min', '0');
    secondHalfInput.setAttribute('max', '100');
    secondHalfInput.disabled = true;
    secondHalfInput.setAttribute('value', input.oneOnOne.toString());
    secondHalfInput.setAttribute('style', 'display: block;');
    
    this.setChangeEvent(firstHalfInput, input.oneOnOne);
    this.setChangeEvent(secondHalfInput, input.oneOnOne);

    firstHalf.append(firstHalfText);
    firstHalf.append(firstHalfSpan);
    firstHalf.append(firstHalfInput);
    firstHalf.setAttribute('style', 'display: inline-block');

    secondHalf.append(secondHalfSpan);
    secondHalf.append(secondHalfSpan2);
    secondHalf.append(secondHalfInput);
    secondHalf.setAttribute('style', 'display: inline-block');

    secondLine.append(firstHalf);
    secondLine.append(secondHalf);

    return secondLine;
  }

  // something is off if toggle first and then second (or vice versa) inputs (stops changing)
  private setChangeEvent(element: HTMLInputElement, excangeRate: number): void {
    element.onchange = (event) => {
      const target: any = event.target;
      let id: string = target.id;

      if (this.singleInput) {
        PubSub.pub(`${EventEnum.SingleEuro}-update`, target.value);
      } else {
        PubSub.pub(`${EventEnum.MultipleEuro}-update`, {
          value: target.value,
          id: id
        });
      }
    }
  }
}