import { AirEastShipper } from './airEastShipper';
import { PacificParcel } from './pacificParcel';
import { ChicagoSprint } from './chicagoSprint';

export class Shipper {
  
  weight: number;
  zip: string;

  constructor(weight: number, zip?: string) {
    this.weight = weight;
    this.zip = zip || '';
  }

  getCosts(): number {
    let shipper = new AirEastShipper(this.weight);

    if (this.zip) {
      let tempShipper = new ChicagoSprint(this.weight);
      if (tempShipper.isCarrier(this.zip)) {
        shipper = tempShipper;
      } else {
        tempShipper = new PacificParcel(this.weight);
        if (tempShipper.isCarrier(this.zip)) {
          shipper = tempShipper;
        }
      }
    }

    return shipper.getPriceForPackageType() * this.weight;
  }
}