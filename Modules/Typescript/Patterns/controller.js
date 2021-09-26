System.register(["./multipleEuroModel", "./pubsub", "./singleEuroModel", "./sliders-view", "./text-inputs-view", "./user-menu", "./utils"], function (exports_1, context_1) {
    "use strict";
    var multipleEuroModel_1, pubsub_1, singleEuroModel_1, sliders_view_1, text_inputs_view_1, user_menu_1, utils_1, Controller;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (multipleEuroModel_1_1) {
                multipleEuroModel_1 = multipleEuroModel_1_1;
            },
            function (pubsub_1_1) {
                pubsub_1 = pubsub_1_1;
            },
            function (singleEuroModel_1_1) {
                singleEuroModel_1 = singleEuroModel_1_1;
            },
            function (sliders_view_1_1) {
                sliders_view_1 = sliders_view_1_1;
            },
            function (text_inputs_view_1_1) {
                text_inputs_view_1 = text_inputs_view_1_1;
            },
            function (user_menu_1_1) {
                user_menu_1 = user_menu_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }
        ],
        execute: function () {
            Controller = class Controller {
                constructor() {
                    this.dataList = [];
                    this.isSingle = true;
                    this.isTextView = true;
                    this.initAfterDataReceivedFromBE();
                }
                initAfterDataReceivedFromBE() {
                    pubsub_1.PubSub.sub('data', (result) => {
                        this.dataList = result.data;
                        this.listenForUserSettings();
                        this.listenForModelChange();
                        user_menu_1.createEuroSelectionType();
                        user_menu_1.createViewSelectionType();
                        this.prepareCanvas();
                        this.singleEuroModel = new singleEuroModel_1.SingleEuroModel(this.dataList);
                        this.multipleEuroModel = new multipleEuroModel_1.MultipleEuroModel(this.dataList);
                    });
                }
                listenForUserSettings() {
                    pubsub_1.PubSub.sub(utils_1.EventEnum.TextInputs, () => {
                        setTimeout(() => {
                            this.isTextView = true;
                            this.prepareCanvas();
                            const view = new text_inputs_view_1.TextInputsView(this.isSingle);
                            view.paint(this.dataList);
                            this.initModelService();
                        }, 100);
                    });
                    pubsub_1.PubSub.sub(utils_1.EventEnum.Sliders, () => {
                        setTimeout(() => {
                            this.isTextView = false;
                            this.prepareCanvas();
                            const view = new sliders_view_1.SlidersView(this.isSingle);
                            view.paint(this.dataList);
                            this.initModelService();
                        }, 100);
                    });
                }
                prepareCanvas() {
                    const currentCanvas = document.getElementById(utils_1.canvasId);
                    // if we already have canvas - remove it, since we are going to repaint it
                    if (currentCanvas) {
                        currentCanvas.remove();
                    }
                    const paint = document.createElement('div');
                    paint.setAttribute('id', utils_1.canvasId);
                    paint.setAttribute('style', 'border: 4px dotted blue; padding: 15px');
                    document.body.append(paint);
                }
                listenForModelChange() {
                    pubsub_1.PubSub.sub(utils_1.EventEnum.SingleEuro, () => {
                        setTimeout(() => {
                            this.multipleEuroModel.stop();
                            this.isSingle = true;
                            this.reInitView();
                        }, 100);
                    });
                    pubsub_1.PubSub.sub(utils_1.EventEnum.MultipleEuro, () => {
                        setTimeout(() => {
                            this.singleEuroModel.stop();
                            this.isSingle = false;
                            this.reInitView();
                        }, 100);
                    });
                }
                initModelService() {
                    if (this.isSingle) {
                        this.singleEuroModel.init();
                    }
                    else {
                        this.multipleEuroModel.init();
                    }
                }
                reInitView() {
                    if (this.isTextView) {
                        pubsub_1.PubSub.pub(utils_1.EventEnum.TextInputs);
                    }
                    else {
                        pubsub_1.PubSub.pub(utils_1.EventEnum.Sliders);
                    }
                }
            };
            exports_1("Controller", Controller);
        }
    };
});
