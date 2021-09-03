"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriorityQueueFactory = void 0;
function PriorityQueueFactory() {
    var items = [];
    return {
        enqueue: enqueue,
        dequeue: dequeue,
        front: front,
        isEmpty: isEmpty,
        size: size,
        print: print,
    };
    function createQueueElement(element, priority) {
        return {
            element: element,
            priority: priority,
        };
    }
    function enqueue(element, priority) {
        var newElement = createQueueElement(element, priority);
        var added = false;
        for (var index = 0; index < items.length; index++) {
            var currentElement = items[index];
            if (newElement.priority < currentElement.priority) {
                items.splice(index, 0, newElement);
                added = true;
                break;
            }
        }
        if (!added) {
            items.push(newElement);
        }
    }
    function dequeue() {
        return items.shift();
    }
    function front() {
        return items[0];
    }
    function isEmpty() {
        return items.length === 0;
    }
    function size() {
        return items.length;
    }
    function print() {
        var startTime = new Date();
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            console.log("Element: " + item.element + " - Priority: " + item.priority);
        }
        var endTime = new Date();
        console.log('---- start ----');
        console.log(startTime.toISOString());
        console.log('---- end ----');
        console.log(endTime.toISOString());
        console.log('---- diff ----');
        // @ts-ignore
        console.log(Math.abs(endTime - startTime), 'milliseconds');
    }
}
exports.PriorityQueueFactory = PriorityQueueFactory;
