System.register(["./pubsub", "./utils"], function (exports_1, context_1) {
    "use strict";
    var pubsub_1, utils_1, TextInputsView;
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
            TextInputsView = class TextInputsView {
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
                    const canvas = document.getElementById(utils_1.canvasId);
                    canvas.append(wrapper);
                }
                getFirstLine(input, index) {
                    const firstLine = document.createElement('div');
                    const firstLineDiv = document.createElement('div');
                    const single = document.createElement('input');
                    const value = this.currModel.value.toString();
                    single.setAttribute('value', value);
                    single.setAttribute('type', `number`);
                    single.setAttribute('id', `${utils_1.valueId}${index}`);
                    this.setChangeEvent(single, input.oneOnOne);
                    const singleText = document.createElement('div');
                    const singleValSpan = document.createElement('span');
                    const singleTextSpan = document.createElement('span');
                    singleValSpan.innerText = `${value}`;
                    singleValSpan.setAttribute('id', `${utils_1.resValId}${index}`);
                    singleTextSpan.innerText = ` Euro is `;
                    singleText.append(singleValSpan);
                    singleText.append(singleTextSpan);
                    firstLineDiv.append(single);
                    firstLineDiv.append(singleText);
                    const firstLineInput = document.createElement('input');
                    firstLineInput.setAttribute('value', input.oneOnOne.toString());
                    firstLineInput.setAttribute('id', `${utils_1.resId}${index}`);
                    firstLineInput.disabled = true;
                    const secondLineSpan = document.createElement('span');
                    secondLineSpan.innerText = ` ${input.currency}`;
                    firstLine.append(firstLineDiv);
                    firstLine.append(firstLineInput);
                    firstLine.append(secondLineSpan);
                    return firstLine;
                }
                getSecondLine(input) {
                    const secondLine = document.createElement('div');
                    const firstHalf = document.createElement('div');
                    const firstHalfSpan = document.createElement('span');
                    firstHalfSpan.innerText = `Euro`;
                    firstHalfSpan.setAttribute('style', 'display: block');
                    const firstHalfInput = document.createElement('input');
                    firstHalfInput.setAttribute('value', this.defaultMultipleVal.toString());
                    firstHalfInput.setAttribute('id', `E-${input.currency}`);
                    firstHalfInput.setAttribute('type', `number`);
                    this.setChangeEvent(firstHalfInput, input.oneOnOne);
                    firstHalf.append(firstHalfSpan);
                    firstHalf.append(firstHalfInput);
                    firstHalf.setAttribute('style', 'display: inline-block');
                    const secondHalf = document.createElement('div');
                    const secondHalfSpan = document.createElement('span');
                    secondHalfSpan.innerText = input.currency;
                    secondHalfSpan.setAttribute('style', 'display: block');
                    const secondHalfInput = document.createElement('input');
                    secondHalfInput.setAttribute('value', (this.defaultMultipleVal * input.oneOnOne).toFixed(2));
                    secondHalfInput.setAttribute('id', `C-${input.currency}`);
                    secondHalfInput.setAttribute('type', `number`);
                    this.setChangeEvent(secondHalfInput, input.oneOnOne);
                    secondHalf.append(secondHalfSpan);
                    secondHalf.append(secondHalfInput);
                    secondHalf.setAttribute('style', 'display: inline-block');
                    secondLine.append(firstHalf);
                    secondLine.append(secondHalf);
                    return secondLine;
                }
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
            exports_1("TextInputsView", TextInputsView);
        }
    };
});
