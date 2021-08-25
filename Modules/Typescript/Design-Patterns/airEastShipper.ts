import { ShipperWrapper, ShipmentTypeEnum } from './shipperWrapper';

export class AirEastShipper extends ShipperWrapper {

  constructor(weight: number) {
    super(
      'Air East',
      ['1', '2', '3'],
      {
        [ShipmentTypeEnum.Letter]: 0.39,
        [ShipmentTypeEnum.Package]: 0.25,
        [ShipmentTypeEnum.Oversized]: 10,
      },
      weight
    )
  }
}