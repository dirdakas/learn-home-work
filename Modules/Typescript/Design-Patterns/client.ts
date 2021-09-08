import { Shipment, ShipmentCare } from './shipment';

export class Client extends Shipment{
  constructor(weight: number) {
    super(weight);
  }

  onShip(): string {
    const shiping = this.ship();

    return `Shipment with the ID ${shiping.shipmentId} will be picked up from ${shiping.fromZipCode} ${shiping.fromAddress} and shipped to ${shiping.toZipCode} ${shiping.toAddress}.
    Cost = ${shiping.cost}
    ${shiping.careOptions ? shiping.careOptions.reduce((res, key) => {
      res += `${ShipmentCare[key]} \n`
      return res;
    }, '') : ''}
    `;
  }
}