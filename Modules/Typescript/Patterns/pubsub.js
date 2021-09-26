System.register([], function (exports_1, context_1) {
    "use strict";
    var registry, PubSub;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            registry = {};
            exports_1("PubSub", PubSub = {
                pub: (name, ...args) => {
                    if (!registry[name])
                        return;
                    registry[name].forEach((x) => {
                        x.apply(null, args);
                    });
                },
                sub: (name, fn) => {
                    if (!registry[name]) {
                        registry[name] = [fn];
                    }
                    else {
                        registry[name].push(fn);
                    }
                },
                // global unsub
                unsub(name) {
                    if (registry[name]) {
                        delete registry[name];
                    }
                }
            });
        }
    };
});
