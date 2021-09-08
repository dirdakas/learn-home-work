import { ShipperWrapper, ShipmentTypeEnum } from './shipperWrapper';

export class PacificParcel extends ShipperWrapper {

  constructor(weight: number) {
    super(
      'Pacific Parcel',
      ['7', '8', '9'],
      {
        [ShipmentTypeEnum.Letter]: 0.51,
        [ShipmentTypeEnum.Package]: 0.19,
        [ShipmentTypeEnum.Oversized]: 0.2,
      },
      weight
    )
  }
}