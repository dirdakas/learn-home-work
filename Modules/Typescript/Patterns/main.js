System.register(["./controller", "./dataService"], function (exports_1, context_1) {
    "use strict";
    var controller_1, dataService_1, app;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (controller_1_1) {
                controller_1 = controller_1_1;
            },
            function (dataService_1_1) {
                dataService_1 = dataService_1_1;
            }
        ],
        execute: function () {
            dataService_1.publishData();
            app = new controller_1.Controller();
        }
    };
});
