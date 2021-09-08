import { PriorityQueueFactory } from './priorQueueFactory';

const q = PriorityQueueFactory();

for (let i = 0; i < 10000; i++) {
  // random number 1-9
  const randomNumber: number = getRandomNumberBetween(1, 1000);
  q.enqueue(`E-${i}`, randomNumber);
}


function getRandomNumberBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

q.print();