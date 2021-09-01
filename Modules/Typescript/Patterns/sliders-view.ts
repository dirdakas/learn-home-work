import { InputInterface, canvasId } from './utils';

export class SlidersView {
  singleInput: boolean = true;
  readonly defaultMultipleVal: number = 100;

  constructor(singleInput: boolean) {
    this.singleInput = singleInput;
  }

  paint = (inputs: InputInterface[]) => {
    console.log('SlidersView');
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
    canvas.append(wrapper);
  }

  private getFirstLine(input: InputInterface): HTMLDivElement {
    const firstLine = document.createElement('div');
    const firstLineSpan = document.createElement('span');
    firstLineSpan.innerText = `1 Euro is ${input.oneOnOne} ${input.currency}`;

    firstLine.append(firstLineSpan);

    return firstLine;
  }

  private getSecondLine(input: InputInterface) {
    const secondLine = document.createElement('div');

    const firstHalf = document.createElement('div');
    const firstHalfSpan = document.createElement('span');
    firstHalfSpan.innerText = `Euro: 1`;
    firstHalfSpan.setAttribute('style', 'display: block');
    
    const firstHalfInput = document.createElement('input');
    firstHalfInput.setAttribute('value', this.defaultMultipleVal.toString());
    firstHalfInput.setAttribute('id', `E-${input.currency}`);
    firstHalfInput.setAttribute('type', 'range');
    firstHalfInput.setAttribute('min', '0');
    firstHalfInput.setAttribute('max', '50');
    firstHalfInput.setAttribute('value', `1`);

    const secondHalf = document.createElement('div');
    const secondHalfSpan = document.createElement('span');
    secondHalfSpan.innerText = `${input.currency}: ${input.oneOnOne}`;
    secondHalfSpan.setAttribute('style', 'display: block');
    
    const secondHalfInput = document.createElement('input');
    secondHalfInput.setAttribute('value', (this.defaultMultipleVal * input.oneOnOne).toFixed(2));
    secondHalfInput.setAttribute('id', `C-${input.currency}`);
    secondHalfInput.setAttribute('type', 'range');
    secondHalfInput.setAttribute('min', '0');
    secondHalfInput.setAttribute('max', '100');
    secondHalfInput.setAttribute('value', input.oneOnOne.toString());
    
    this.setChangeEvent(
      firstHalfInput,
      firstHalfSpan,
      secondHalfSpan,
      input
    );
    this.setChangeEvent(
      secondHalfInput,
      firstHalfSpan,
      secondHalfSpan,
      input
    );

    firstHalf.append(firstHalfSpan);
    firstHalf.append(firstHalfInput);
    firstHalf.setAttribute('style', 'display: inline-block');

    secondHalf.append(secondHalfSpan);
    secondHalf.append(secondHalfInput);
    secondHalf.setAttribute('style', 'display: inline-block');

    secondLine.append(firstHalf);
    secondLine.append(secondHalf);

    return secondLine;
  }

  // something is off if toggle first and then second (or vice versa) inputs (stops changing)
  private setChangeEvent(
    element: HTMLInputElement,
    firstSpan: HTMLElement,
    secondSpan: HTMLElement,
    input: InputInterface
  ): void {
    element.onchange = (event) => {
      const target: any = event.target;
      let id: string = target.id;
      id = id.includes('E-') ? id.replace('E-', 'C-') : id.replace('C-', 'E-');

      let newVal: string = '';

      if (id.includes('E-')) {
        newVal = (Number(target.value) / input.oneOnOne).toString();
        
        firstSpan.innerText = `Euro: ${newVal}`
        secondSpan.innerText = `${input.currency}: ${target.value}`
      } else {
        newVal = (Number(target.value) * input.oneOnOne).toString();
        
        firstSpan.innerText = `Euro: ${target.value}`
        secondSpan.innerText = `${input.currency}: ${newVal}`
      }

      document.getElementById(id).setAttribute('value', newVal);
    }
  }
}