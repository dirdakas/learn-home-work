System.register(["./pubsub", "./utils"], function (exports_1, context_1) {
    "use strict";
    var pubsub_1, utils_1, SlidersView;
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
            SlidersView = class SlidersView {
                constructor(isSingle) {
                    this.singleInput = true;
                    this.defaultMultipleVal = 100;
                    this.paint = (inputs) => {
                        inputs.forEach((item, index) => this.createInput(item, index));
                    };
                    this.singleInput = isSingle;
                    this.currModel = utils_1.singleInputModel;
                }
                createInput(input, index) {
                    const wrapper = document.createElement('div');
                    wrapper.setAttribute('style', 'border: 4px solid blue; padding: 15px');
                    const firstLine = this.getFirstLine(input, index);
                    wrapper.append(firstLine);
                    const secondLine = this.getSecondLine(input, index);
                    wrapper.append(secondLine);
                    const canvas = document.getElementById(utils_1.canvasId);
                    canvas.append(wrapper);
                }
                getFirstLine(input, index) {
                    const value = this.currModel.value.toString();
                    const singleText = document.createElement('div');
                    const singleValSpan = document.createElement('span');
                    const singleTextSpan = document.createElement('span');
                    const singleResultTextSpan = document.createElement('span');
                    singleValSpan.innerText = `${value}`;
                    singleTextSpan.innerText = ` Euro is ${input.currency} `;
                    singleResultTextSpan.innerText = `${input.oneOnOne}`;
                    singleText.append(singleValSpan);
                    singleText.append(singleTextSpan);
                    singleText.append(singleResultTextSpan);
                    return singleText;
                }
                getSecondLine(input, index) {
                    const secondLine = document.createElement('div');
                    const firstHalf = document.createElement('div');
                    firstHalf.setAttribute('style', 'display: block');
                    const firstHalfText = document.createElement('span');
                    firstHalfText.innerText = `Euro: `;
                    const firstHalfSpan = document.createElement('span');
                    firstHalfSpan.innerText = `1`;
                    firstHalfSpan.setAttribute('id', `${utils_1.resValId}${index}`);
                    const firstHalfInput = document.createElement('input');
                    firstHalfInput.setAttribute('value', this.defaultMultipleVal.toString());
                    firstHalfInput.setAttribute('id', `${utils_1.valueId}${index}`);
                    firstHalfInput.setAttribute('type', 'range');
                    firstHalfInput.setAttribute('min', '0');
                    firstHalfInput.setAttribute('max', '50');
                    firstHalfInput.setAttribute('value', `1`);
                    firstHalfInput.setAttribute('style', 'display: block');
                    const secondHalf = document.createElement('div');
                    const secondHalfSpan = document.createElement('span');
                    secondHalfSpan.innerText = `${input.currency}: `;
                    const secondHalfSpan2 = document.createElement('span');
                    secondHalfSpan2.innerText = `${input.oneOnOne}`;
                    secondHalfSpan2.setAttribute('id', `${utils_1.resValIdOther}${index}`);
                    const secondHalfInput = document.createElement('input');
                    secondHalfInput.setAttribute('value', (this.defaultMultipleVal * input.oneOnOne).toFixed(2));
                    secondHalfInput.setAttribute('id', `${utils_1.resId}${index}`);
                    secondHalfInput.setAttribute('type', 'range');
                    secondHalfInput.setAttribute('min', '0');
                    secondHalfInput.setAttribute('max', '100');
                    secondHalfInput.disabled = true;
                    secondHalfInput.setAttribute('value', input.oneOnOne.toString());
                    secondHalfInput.setAttribute('style', 'display: block;');
                    this.setChangeEvent(firstHalfInput, input.oneOnOne);
                    this.setChangeEvent(secondHalfInput, input.oneOnOne);
                    firstHalf.append(firstHalfText);
                    firstHalf.append(firstHalfSpan);
                    firstHalf.append(firstHalfInput);
                    firstHalf.setAttribute('style', 'display: inline-block');
                    secondHalf.append(secondHalfSpan);
                    secondHalf.append(secondHalfSpan2);
                    secondHalf.append(secondHalfInput);
                    secondHalf.setAttribute('style', 'display: inline-block');
                    secondLine.append(firstHalf);
                    secondLine.append(secondHalf);
                    return secondLine;
                }
                // something is off if toggle first and then second (or vice versa) inputs (stops changing)
                setChangeEvent(element, excangeRate) {
                    element.onchange = (event) => {
                        const target = event.target;
                        let id = target.id;
                        if (this.singleInput) {
                            pubsub_1.PubSub.pub(`${utils_1.EventEnum.SingleEuro}-update`, target.value);
                        }
                        else {
                            pubsub_1.PubSub.pub(`${utils_1.EventEnum.MultipleEuro}-update`, {
                                value: target.value,
                                id: id
                            });
                        }
                    };
                }
            };
            exports_1("SlidersView", SlidersView);
        }
    };
});
