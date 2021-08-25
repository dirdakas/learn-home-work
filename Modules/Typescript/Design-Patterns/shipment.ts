import { Shipper } from './shipper';

let idCounter: number = 0;
const zipCodeLength: number = 5;

export enum ShipmentCare {
  Fragile = 'Fragile',
  DoNotLeave = 'Do Not Leave',
  ReturnReceiptRequested = 'Return Receipt Requested'
}
export class Shipment {
  shipmentId: number;
  // toAddress (a string containing street, city, and state) – should be changeable
  toAddress: string;
  // fromAddress (a string containing street, city, and state) – should be changeable
  fromAddress: string;
  // toZipCode (a string containing exactly 5 characters) – should be changeable
  toZipCode: string;
  // fromZipCode (a string containing exactly 5 characters) – should be changeable
  fromZipCode: string;
  // weight (a number, storing the weight of the item in ounces)
  weight: number; // ounces
  // marks (an optional string array – will represent additional characteristic of shipment) – should be changeable
  marks: string[] = [];

  constructor(
    weight: number,
    toAddress?: string,
    fromAddress?: string,
    toZipCode?: string,
    fromZipCode?: string,
    marks?: string[]
  ) {
    this.assignNewId();
    this.weight = weight;
    this.toAddress = toAddress || '';
    this.toZipCode = toZipCode || '';
    this.fromAddress = fromAddress || '';
    this.fromZipCode = fromZipCode || '';
    this.marks = marks || [];
  }
  
  private assignNewId(): void {
    this.shipmentId = this.getShipmentID();
  }

  private getShipmentID(): number {
    idCounter++;
    return idCounter;
  }

  updateFromAddress(address: string, zip?: string): void {
    if (zip && zip.length !== zipCodeLength) {
      throw `Zip code is incorrect. ${zipCodeLength} should be used`
    } else {
      this.fromAddress = address;
      this.fromZipCode = zip;
    }
  }

  updateToAddress(address: string, zip?: string): void {
    if (zip && zip.length !== zipCodeLength) {
      throw `Zip code is incorrect. ${zipCodeLength} symbols should be used`
    } else {
      this.toAddress = address;
      this.toZipCode = zip;
    }
  }

  ship(): {
    shipmentId: number,
    fromAddress: string,
    fromZipCode: string,
    toAddress: string,
    toZipCode: string,
    cost: number,
    careOptions: string[]
  } {
    if (this.weight > 0) {
      const shipper = new Shipper(this.weight, this.toZipCode);
  
      return {
        shipmentId: this.shipmentId,
        fromAddress: this.fromAddress,
        fromZipCode: this.fromZipCode,
        toAddress: this.toAddress,
        toZipCode: this.toZipCode,
        cost: shipper.getCosts(),
        careOptions: this.marks
      }
    } else {
      throw 'Weight should be more than 0'
    }
  }

  // should return
  // {
  //   'Fragile': 'Fragile',
  //   'DoNotLeave': 'Do Not Leave',
  //   'ReturnReceiptRequested': 'Return Receipt Requested'
  // }
  getAllCareOptions(): { [key: string]: string} {
    return Object.keys(ShipmentCare).reduce((res, key) => {
      res[key] = ShipmentCare[key];
      return res;
    }, {})
  }

  selectCareOptions(keys: string[]): void {
    this.marks = keys;
  }
}