System.register(["./pubsub", "./utils"], function (exports_1, context_1) {
    "use strict";
    var pubsub_1, utils_1;
    var __moduleName = context_1 && context_1.id;
    function createEuroSelectionType() {
        const p = document.createElement('p');
        p.innerText = 'Select EURO mode:';
        document.body.append(p);
        this.createSelectionType('euroSelectionType', utils_1.EventEnum.SingleEuro, 'Same');
        this.createSelectionType('euroSelectionType', utils_1.EventEnum.MultipleEuro, 'Different');
    }
    exports_1("createEuroSelectionType", createEuroSelectionType);
    function createViewSelectionType() {
        const p = document.createElement('p');
        p.innerText = 'Select VIEW mode:';
        document.body.append(p);
        this.createSelectionType('viewSelectionType', utils_1.EventEnum.TextInputs, 'text');
        this.createSelectionType('viewSelectionType', utils_1.EventEnum.Sliders, 'slidders');
    }
    exports_1("createViewSelectionType", createViewSelectionType);
    function createSelectionType(name, val, text) {
        const input = document.createElement('input');
        input.setAttribute('type', 'radio');
        input.setAttribute('name', name);
        input.setAttribute('id', val);
        input.setAttribute('value', val);
        // setting as default
        if (val === utils_1.EventEnum.SingleEuro || val === utils_1.EventEnum.TextInputs) {
            input.checked = true;
            pubsub_1.PubSub.pub(val);
        }
        const label = document.createElement('label');
        label.setAttribute('for', name);
        label.innerText = text;
        input.onclick = function () {
            pubsub_1.PubSub.pub(val);
        };
        document.body.append(input);
        document.body.append(label);
    }
    exports_1("createSelectionType", createSelectionType);
    return {
        setters: [
            function (pubsub_1_1) {
                pubsub_1 = pubsub_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }
        ],
        execute: function () {
        }
    };
});
