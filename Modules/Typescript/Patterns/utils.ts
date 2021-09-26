export enum EventEnum {
  SingleEuro = 'SingleEuro',
  MultipleEuro = 'MultipleEuro',
  Sliders= 'Sliders',
  TextInputs = 'TextInputs'
}

export interface InputInterface {
  currency: string;
  oneOnOne: number;
  value?: number;
}

export const singleInputModel: InputInterface = {
  currency: 'Eur',
  oneOnOne: 1,
  value: 1
}

export const valueId = 'valIndex-';
export const resId = 'resIndex-';
export const resValId = 'resValIndex-';
export const resValIdOther = 'resValIndexOther-';

export const canvasId = 'canvas';
