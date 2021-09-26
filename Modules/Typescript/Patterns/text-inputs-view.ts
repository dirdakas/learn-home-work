import { PubSub } from './pubsub';
import { canvasId, EventEnum, InputInterface, resId, resValId, singleInputModel, valueId } from './utils';

export class TextInputsView {
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

    const canvas = document.getElementById(canvasId);
    canvas.append(wrapper);
  }

  private getFirstLine(input: InputInterface, index: number): HTMLDivElement {
    const firstLine = document.createElement('div');
    const firstLineDiv = document.createElement('div');
    const single = document.createElement('input');
    const value = this.currModel.value.toString();
    single.setAttribute('value', value);
    single.setAttribute('type', `number`);
    single.setAttribute('id', `${valueId}${index}`);
    this.setChangeEvent(single, input.oneOnOne);

    const singleText = document.createElement('div');
    const singleValSpan = document.createElement('span');
    const singleTextSpan = document.createElement('span');
    singleValSpan.innerText = `${value}`;
    singleValSpan.setAttribute('id', `${resValId}${index}`);
    singleTextSpan.innerText = ` Euro is `;

    singleText.append(singleValSpan);
    singleText.append(singleTextSpan);

    firstLineDiv.append(single);
    firstLineDiv.append(singleText);

    const firstLineInput = document.createElement('input');
    firstLineInput.setAttribute('value', input.oneOnOne.toString());
    firstLineInput.setAttribute('id', `${resId}${index}`);
    firstLineInput.disabled = true;

    const secondLineSpan = document.createElement('span');
    secondLineSpan.innerText = ` ${input.currency}`;

    firstLine.append(firstLineDiv);
    firstLine.append(firstLineInput);
    firstLine.append(secondLineSpan);

    return firstLine;
  }

  private getSecondLine(input: InputInterface) {
    const secondLine = document.createElement('div');

    const firstHalf = document.createElement('div');
    const firstHalfSpan = document.createElement('span');
    firstHalfSpan.innerText = `Euro`;
    firstHalfSpan.setAttribute('style', 'display: block');
    
    const firstHalfInput = document.createElement('input');
    firstHalfInput.setAttribute('value', this.defaultMultipleVal.toString());
    firstHalfInput.setAttribute('id', `E-${input.currency}`);
    firstHalfInput.setAttribute('type', `number`);
    this.setChangeEvent(firstHalfInput, input.oneOnOne);

    firstHalf.append(firstHalfSpan);
    firstHalf.append(firstHalfInput);
    firstHalf.setAttribute('style', 'display: inline-block');

    const secondHalf = document.createElement('div');
    const secondHalfSpan = document.createElement('span');
    secondHalfSpan.innerText = input.currency;
    secondHalfSpan.setAttribute('style', 'display: block');
    
    const secondHalfInput = document.createElement('input');
    secondHalfInput.setAttribute('value', (this.defaultMultipleVal * input.oneOnOne).toFixed(2));
    secondHalfInput.setAttribute('id', `C-${input.currency}`);
    secondHalfInput.setAttribute('type', `number`);
    this.setChangeEvent(secondHalfInput, input.oneOnOne);
    
    secondHalf.append(secondHalfSpan);
    secondHalf.append(secondHalfInput);
    secondHalf.setAttribute('style', 'display: inline-block');

    secondLine.append(firstHalf);
    secondLine.append(secondHalf);

    return secondLine;
  }

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