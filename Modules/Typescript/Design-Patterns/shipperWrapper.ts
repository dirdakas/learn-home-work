export enum ShipmentTypeEnum {
  Letter = 'Letter',
  Package = 'Package',
  Oversized = 'Oversized',
}

const maxWeight = {
  [ShipmentTypeEnum.Letter]: 15,
  [ShipmentTypeEnum.Package]: 160
}

export abstract class ShipperWrapper {
  title: string;
  zipStartsWith: string[];
  prices: { [key: string]: number; };
  type: ShipmentTypeEnum;

  constructor(
    title: string,
    zipStartsWith: string[],
    prices: { [key: string]: number; },
    weight: number
  ) {
    this.title = title;
    this.zipStartsWith = zipStartsWith;
    this.prices = prices;
    this.type = this.getType(weight);
  }

  // should get type
  // loop by maxWeight and check if we will find specific weight defined which would be greater than given
  // if no - default size is Oversized
  getType(weight): ShipmentTypeEnum {
    return ShipmentTypeEnum[Object.keys(maxWeight).find(key => {
      return maxWeight[key] >= weight;
    })] || ShipmentTypeEnum.Oversized;
  }

  getPriceForPackageType(): number {
    return this.prices[this.type];
  }

  isCarrier(zip: string): boolean {
    const firstLetter: string = zip.slice(0, 1);

    return !!this.zipStartsWith.find(letter => letter === firstLetter);
  }
}