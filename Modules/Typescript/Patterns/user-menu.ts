import { PubSub } from './pubsub';
import { EventEnum } from './utils';

export function createEuroSelectionType() {
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

export function createViewSelectionType() {
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

export function createSelectionType(name: string, val: string, text: string) {
  const input = document.createElement('input');
  input.setAttribute('type', 'radio')
  input.setAttribute('name', name)
  input.setAttribute('id', val);
  input.setAttribute('value', val);

  // setting as default
  if (val === EventEnum.SingleEuro || val === EventEnum.TextInputs) {
    input.checked = true;
    PubSub.pub(val);
  }

  const label = document.createElement('label');
  label.setAttribute('for', name);
  label.innerText = text;

  input.onclick = function() {
    PubSub.pub(val);
  };

  document.body.append(input);
  document.body.append(label);
}