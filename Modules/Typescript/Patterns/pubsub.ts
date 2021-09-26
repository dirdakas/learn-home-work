const registry: any = {};

export const PubSub = {
  pub: (name: string, ...args: any) => {
    if (!registry[name]) return;
  
    registry[name].forEach((x: any) => {
      x.apply(null, args);
    });
  },
  
  sub: (name: string, fn: any) => {
    if (!registry[name]) {
      registry[name] = [fn];
    } else {
      registry[name].push(fn);
    }
  },
  
  // global unsub
  unsub(name: string) {
    if (registry[name]) {
      delete registry[name];
    }
  }
}