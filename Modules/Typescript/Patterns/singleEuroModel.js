System.register(["./pubsub", "./utils"], function (exports_1, context_1) {
    "use strict";
    var pubsub_1, utils_1, SingleEuroModel;
    var __moduleName = context_1 && context_1.id;
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
            SingleEuroModel = class SingleEuroModel {
                constructor(list) {
                    this.dataList = [];
                    this.isListening = false;
                    this.dataList = list;
                    this.init();
                }
                init() {
                    if (!this.isListening) {
                        pubsub_1.PubSub.sub(`${utils_1.EventEnum.SingleEuro}-update`, (val) => this.updateValuesOnTemplate(val));
                    }
                }
                updateValuesOnTemplate(val) {
                    const value = Number(val);
                    this.dataList.map((item, index) => {
                        item.value = value;
                        this.findAndUpdate(`${utils_1.valueId}${index}`, val);
                        this.findAndUpdate(`${utils_1.resId}${index}`, (value * item.oneOnOne).toFixed(2));
                        document.getElementById(`${utils_1.resValId}${index}`).innerText = val;
                        const sliderResText = document.getElementById(`${utils_1.resValIdOther}${index}`);
                        if (sliderResText) {
                            sliderResText.innerText = (value * item.oneOnOne).toFixed(2);
                        }
                        return item;
                    });
                }
                stop() {
                    pubsub_1.PubSub.unsub(`${utils_1.EventEnum.SingleEuro}-update`);
                    this.isListening = false;
                }
                findAndUpdate(id, val) {
                    var _a;
                    (_a = document.getElementById(id)) === null || _a === void 0 ? void 0 : _a.setAttribute('value', val.toString());
                }
            };
            exports_1("SingleEuroModel", SingleEuroModel);
        }
    };
});
