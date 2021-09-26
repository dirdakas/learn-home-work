System.register(["./pubsub"], function (exports_1, context_1) {
    "use strict";
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var pubsub_1;
    var __moduleName = context_1 && context_1.id;
    function fetchData() {
        return fetch('http://127.0.0.1:8080/data.json')
            .then(response => {
            return response.json();
        });
    }
    exports_1("fetchData", fetchData);
    function publishData() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield fetchData();
            pubsub_1.PubSub.pub('data', data);
        });
    }
    exports_1("publishData", publishData);
    return {
        setters: [
            function (pubsub_1_1) {
                pubsub_1 = pubsub_1_1;
            }
        ],
        execute: function () {
        }
    };
});
