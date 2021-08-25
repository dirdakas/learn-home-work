import { ShipperWrapper, ShipmentTypeEnum } from './shipperWrapper';

export class ChicagoSprint extends ShipperWrapper {

  constructor(weight: number) {
    super(
      'Chicago Sprint',
      ['4', '5', '6'],
      {
        [ShipmentTypeEnum.Letter]: 0.42,
        [ShipmentTypeEnum.Package]: 0.20,
        [ShipmentTypeEnum.Oversized]: 0,
      },
      weight
    )
  }
}