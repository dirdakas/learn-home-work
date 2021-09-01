export enum EventEnum {
  SingleEuro = 'SingleEuro',
  MultipleEuro = 'MultipleEuro',
  Sliders= 'Sliders',
  TextInputs = 'TextInputs'
}

export interface InputInterface {
  currency: string;
  oneOnOne: number;
}

export const canvasId = 'canvas';