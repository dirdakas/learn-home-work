enum EventEnum {
  SingleEuro = 'SingleEuro',
  MultipleEuro = 'MultipleEuro',
  Sliders= 'Sliders',
  TextInputs = 'TextInputs'
}

interface InputInterface {
  currency: string;
  oneOnOne: number;
}

const simpleData: InputInterface[] = [
  {
    currency: 'DM',
    oneOnOne: 1.23
  },
  {
    currency: 'Belg. Franc',
    oneOnOne: 40.34
  },
  {
    currency: 'Franz. Franc',
    oneOnOne: 6.56
  },
  {
    currency: 'Ir. Pfund',
    oneOnOne: 0.79
  }
]

const canvasId = 'canvas';

class Controller {
  init = () => {
    this.createEuroSelectionType();

    this.createViewSelectionType();
  }

  createEuroSelectionType = () => {
    const p = document.createElement('p');
    p.innerText = 'Select EURO mode:';
    document.body.append(p);

    this.createSelectionType(
      'euroSelectionType',
      EventEnum.SingleEuro,
      'Same'
    );
    this.createSelectionType(
      'euroSelectionType',
      EventEnum.MultipleEuro,
      'Different'
    );
  }

  createViewSelectionType = () => {
    const p = document.createElement('p');
    p.innerText = 'Select VIEW mode:';
    document.body.append(p);

    this.createSelectionType(
      'viewSelectionType',
      EventEnum.TextInputs,
      'text'
    );
    this.createSelectionType(
      'viewSelectionType',
      EventEnum.Sliders,
      'slidders'
    );
  }

  createSelectionType = (name, val, text) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'radio')
    input.setAttribute('name', name)
    input.setAttribute('id', val);
    input.setAttribute('value', val);

    // setting as default
    if (val === EventEnum.SingleEuro) {
      input.checked = true;
    }

    const label = document.createElement('label');
    label.setAttribute('for', name);
    label.innerText = text;

    input.onclick = function(type) {
      const textInputView: HTMLInputElement = document.getElementById(EventEnum.TextInputs) as HTMLInputElement;
      const slidersView: HTMLInputElement = document.getElementById(EventEnum.Sliders) as HTMLInputElement;

      const createCanvas = () => {
        // check if view is selected
        if (textInputView.checked || slidersView.checked) {
          const currentCanvas = document.getElementById(canvasId);
          // if we already have canvas - remove it, since we are going to repaint it
          if (currentCanvas) {
            currentCanvas.remove();
          }

          const paint = document.createElement('div');
          paint.setAttribute('id', canvasId);
          paint.setAttribute('style', 'border: 4px dotted blue; padding: 15px');
          document.body.append(paint);
        }
      }

      createCanvas();

      // determine what to init and do
      const t = (type.currentTarget as HTMLInputElement).value;
      const isSame: boolean = (document.getElementById('SingleEuro') as HTMLInputElement).checked
      const isText: boolean = (document.getElementById('TextInputs') as HTMLInputElement).checked

      switch(t) {
        case EventEnum.TextInputs: {
          if (isSame) {
            const ev = new TextInputsView(true);
            const em = new SingleEuroModel(simpleData);
            ev.paint(em.getData());
          } else {
            const ev = new TextInputsView(false);
            const em = new SingleEuroModel(simpleData);
            ev.paint(em.getData());
          }
          break;
        }
        case EventEnum.Sliders: {
          if (isSame) {
            const ev = new SlidersView(true);
            // change data model?
            const em = new SingleEuroModel(simpleData);
            ev.paint(em.getData());
          } else {
            const ev = new SlidersView(false);
            // change data model?
            const em = new SingleEuroModel(simpleData);
            ev.paint(em.getData());
          }
          break;
        }
        case EventEnum.SingleEuro: {
          if (isText) {
            const ev = new TextInputsView(true);
            const em = new SingleEuroModel(simpleData);
            ev.paint(em.getData());
          } else {
            const ev = new SlidersView(true);
            // change data model?
            const em = new SingleEuroModel(simpleData);
            ev.paint(em.getData());
          }
          break;
        }
        case EventEnum.MultipleEuro: {
          if (isText) {
            const ev = new TextInputsView(false);
            const em = new SingleEuroModel(simpleData);
            ev.paint(em.getData());
          } else {
            const ev = new SlidersView(false);
            // change data model?
            const em = new SingleEuroModel(simpleData);
            ev.paint(em.getData());
          }
          break;
        }
      }
    }

    document.body.append(input);
    document.body.append(label);
  }
}

const controller = new Controller();
controller.init();
console.log(document.body);

class SingleEuroModel {
  private data: InputInterface[];

  constructor(data?: InputInterface[]) {
    this.data = data || [];
  }

  getData(): InputInterface[] {
    return this.data;
  }
}

class TextInputsView {
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

class SlidersView {
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