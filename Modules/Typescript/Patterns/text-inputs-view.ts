import { InputInterface, canvasId } from './utils';

export class TextInputsView {
  singleInput: boolean = true;
  readonly defaultMultipleVal: number = 100;

  constructor(singleInput: boolean) {
    this.singleInput = singleInput;
  }

  paint = (inputs: InputInterface[]) => {
    console.log('TextInputs');
    inputs.forEach(item => this.createInput(item));
  }

  private createInput(input: InputInterface): void {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('style', 'border: 4px solid blue; padding: 15px');

    
    const firstLine: HTMLDivElement = this.getFirstLine(input);
    wrapper.append(firstLine);

    if (!this.singleInput) {
      const secondLine = this.getSecondLine(input);
      wrapper.append(secondLine);
    }

    const canvas = document.getElementById(canvasId);
    console.log('canvas', canvas);
    canvas.append(wrapper);
  }

  private getFirstLine(input: InputInterface): HTMLDivElement {
    const firstLine = document.createElement('div');
    const firstLineSpan = document.createElement('span');
    firstLineSpan.innerText = `1 Euro is `;

    const firstLineInput = document.createElement('input');
    firstLineInput.setAttribute('value', input.oneOnOne.toString());
    firstLineInput.disabled = true;

    const secondLineSpan = document.createElement('span');
    secondLineSpan.innerText = ` ${input.currency}`;

    firstLine.append(firstLineSpan);
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

  // something is off if toggle first and then second (or vice versa) inputs (stops changing)
  private setChangeEvent(element: HTMLInputElement, excangeRate: number): void {
    element.onchange = (event) => {
      const target: any = event.target;
      let id: string = target.id;
      id = id.includes('E-') ? id.replace('E-', 'C-') : id.replace('C-', 'E-');
      if (id.includes('E-')) {
        document.getElementById(id).setAttribute('value', (Number(target.value) / excangeRate).toFixed(2));
      } else {
        document.getElementById(id).setAttribute('value', (Number(target.value) * excangeRate).toFixed(2));
      }
    }
  }
}