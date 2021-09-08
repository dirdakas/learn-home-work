interface IQueueElement {
  element: any,
  priority: number
}

export function PriorityQueueFactory() {
  const items: IQueueElement[] = [];

  return {
    enqueue,
    dequeue,
    front,
    isEmpty,
    size,
    print,
  };

  function createQueueElement(element: any, priority: number): IQueueElement {
    return {
      element,
      priority,
    };
  }

  function enqueue(element: any, priority: number): void {
    const newElement: IQueueElement = createQueueElement(element, priority);
    let added: boolean = false;

    for (let index = 0; index < items.length; index++) {
      const currentElement: IQueueElement = items[index];

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

  function dequeue(): IQueueElement | undefined{
    return items.shift();
  }

  function front(): IQueueElement {
    return items[0];
  }

  function isEmpty(): boolean {
    return items.length === 0;
  }

  function size(): number {
    return items.length;
  }

  function print(): void {
    const startTime: Date = new Date();
    for(const item of items) {
      console.log(`Element: ${item.element} - Priority: ${item.priority}`)
    }
    const endTime: Date = new Date();

    console.log('---- start ----')
    console.log(startTime.toISOString())
    console.log('---- end ----')
    console.log(endTime.toISOString())
    console.log('---- diff ----')
    // @ts-ignore
    console.log(Math.abs(endTime - startTime), 'milliseconds')
  }
}