System.register([], function (exports_1, context_1) {
    "use strict";
    var EventEnum, singleInputModel, valueId, resId, resValId, resValIdOther, canvasId;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            (function (EventEnum) {
                EventEnum["SingleEuro"] = "SingleEuro";
                EventEnum["MultipleEuro"] = "MultipleEuro";
                EventEnum["Sliders"] = "Sliders";
                EventEnum["TextInputs"] = "TextInputs";
            })(EventEnum || (EventEnum = {}));
            exports_1("EventEnum", EventEnum);
            exports_1("singleInputModel", singleInputModel = {
                currency: 'Eur',
                oneOnOne: 1,
                value: 1
            });
            exports_1("valueId", valueId = 'valIndex-');
            exports_1("resId", resId = 'resIndex-');
            exports_1("resValId", resValId = 'resValIndex-');
            exports_1("resValIdOther", resValIdOther = 'resValIndexOther-');
            exports_1("canvasId", canvasId = 'canvas');
        }
    };
});
