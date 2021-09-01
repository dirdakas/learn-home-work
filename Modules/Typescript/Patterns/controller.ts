import { EventEnum, canvasId } from './utils';
import { TextInputsView } from './text-inputs-view';
import { SingleEuroModel } from './single-euro-model';
import { SlidersView } from './sliders-view';
import * as simpleData from './data.json';

export class Controller {
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