import { Client } from './client';

// creates initial shipment with provided weight
const client: Client = new Client(140);
console.log('---- CLIENT ----', client)
console.log('---- CLIENT.onShip() ----', client.onShip())

client.updateFromAddress('4th Ave SE, Bellevue', '12292');
client.updateToAddress('1313 Mockingbird Lane, Tulsa, OK', '67721');

console.log('---- CLIENT ----', client)
console.log('---- CLIENT.onShip() ----', client.onShip())

console.log('---- CLIENT.getAllCareOptions() ----', client.getAllCareOptions())
client.selectCareOptions(['Fragile', 'ReturnReceiptRequested'])

console.log('---- CLIENT ----', client)
console.log('---- CLIENT.onShip() ----', client.onShip())