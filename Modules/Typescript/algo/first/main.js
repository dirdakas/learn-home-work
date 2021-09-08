"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var priorQueueFactory_1 = require("./priorQueueFactory");
var q = priorQueueFactory_1.PriorityQueueFactory();
for (var i = 0; i < 10000; i++) {
    // random number 1-9
    var randomNumber = getRandomNumberBetween(1, 1000);
    q.enqueue("E-" + i, randomNumber);
}
function getRandomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
q.print();
