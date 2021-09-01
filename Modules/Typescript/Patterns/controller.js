var EventEnum;
(function (EventEnum) {
    EventEnum["SingleEuro"] = "SingleEuro";
    EventEnum["MultipleEuro"] = "MultipleEuro";
    EventEnum["Sliders"] = "Sliders";
    EventEnum["TextInputs"] = "TextInputs";
})(EventEnum || (EventEnum = {}));
var simpleData = [
    {
        currency: 'DM',
        oneOnOne: 1.23
    },
    {
        currency: 'Belg. Franc',
        oneOnOne: 40.34
    },
    {
        currency: 'Franz. Franc',
        oneOnOne: 6.56
    },
    {
        currency: 'Ir. Pfund',
        oneOnOne: 0.79
    }
];
var canvasId = 'canvas';
var Controller = /** @class */ (function () {
    function Controller() {
        var _this = this;
        this.init = function () {
            _this.createEuroSelectionType();
            _this.createViewSelectionType();
        };
        this.createEuroSelectionType = function () {
            var p = document.createElement('p');
            p.innerText = 'Select EURO mode:';
            document.body.append(p);
            _this.createSelectionType('euroSelectionType', EventEnum.SingleEuro, 'Same');
            _this.createSelectionType('euroSelectionType', EventEnum.MultipleEuro, 'Different');
        };
        this.createViewSelectionType = function () {
            var p = document.createElement('p');
            p.innerText = 'Select VIEW mode:';
            document.body.append(p);
            _this.createSelectionType('viewSelectionType', EventEnum.TextInputs, 'text');
            _this.createSelectionType('viewSelectionType', EventEnum.Sliders, 'slidders');
        };
        this.createSelectionType = function (name, val, text) {
            var input = document.createElement('input');
            input.setAttribute('type', 'radio');
            input.setAttribute('name', name);
            input.setAttribute('id', val);
            input.setAttribute('value', val);
            // setting as default
            if (val === EventEnum.SingleEuro) {
                input.checked = true;
            }
            var label = document.createElement('label');
            label.setAttribute('for', name);
            label.innerText = text;
            input.onclick = function (type) {
                var textInputView = document.getElementById(EventEnum.TextInputs);
                var slidersView = document.getElementById(EventEnum.Sliders);
                var createCanvas = function () {
                    // check if view is selected
                    if (textInputView.checked || slidersView.checked) {
                        var currentCanvas = document.getElementById(canvasId);
                        // if we already have canvas - remove it, since we are going to repaint it
                        if (currentCanvas) {
                            currentCanvas.remove();
                        }
                        var paint = document.createElement('div');
                        paint.setAttribute('id', canvasId);
                        paint.setAttribute('style', 'border: 4px dotted blue; padding: 15px');
                        document.body.append(paint);
                    }
                };
                createCanvas();
                // determine what to init and do
                var t = type.currentTarget.value;
                var isSame = document.getElementById('SingleEuro').checked;
                var isText = document.getElementById('TextInputs').checked;
                switch (t) {
                    case EventEnum.TextInputs: {
                        if (isSame) {
                            var ev = new TextInputsView(true);
                            var em = new SingleEuroModel(simpleData);
                            ev.paint(em.getData());
                        }
                        else {
                            var ev = new TextInputsView(false);
                            var em = new SingleEuroModel(simpleData);
                            ev.paint(em.getData());
                        }
                        break;
                    }
                    case EventEnum.Sliders: {
                        if (isSame) {
                            var ev = new SlidersView(true);
                            // change data model?
                            var em = new SingleEuroModel(simpleData);
                            ev.paint(em.getData());
                        }
                        else {
                            var ev = new SlidersView(false);
                            // change data model?
                            var em = new SingleEuroModel(simpleData);
                            ev.paint(em.getData());
                        }
                        break;
                    }
                    case EventEnum.SingleEuro: {
                        if (isText) {
                            var ev = new TextInputsView(true);
                            var em = new SingleEuroModel(simpleData);
                            ev.paint(em.getData());
                        }
                        else {
                            var ev = new SlidersView(true);
                            // change data model?
                            var em = new SingleEuroModel(simpleData);
                            ev.paint(em.getData());
                        }
                        break;
                    }
                    case EventEnum.MultipleEuro: {
                        if (isText) {
                            var ev = new TextInputsView(false);
                            var em = new SingleEuroModel(simpleData);
                            ev.paint(em.getData());
                        }
                        else {
                            var ev = new SlidersView(false);
                            // change data model?
                            var em = new SingleEuroModel(simpleData);
                            ev.paint(em.getData());
                        }
                        break;
                    }
                }
            };
            document.body.append(input);
            document.body.append(label);
        };
    }
    return Controller;
}());
var controller = new Controller();
controller.init();
console.log(document.body);
var SingleEuroModel = /** @class */ (function () {
    function SingleEuroModel(data) {
        this.data = data || [];
    }
    SingleEuroModel.prototype.getData = function () {
        return this.data;
    };
    return SingleEuroModel;
}());
var TextInputsView = /** @class */ (function () {
    function TextInputsView(singleInput) {
        var _this = this;
        this.singleInput = true;
        this.defaultMultipleVal = 100;
        this.paint = function (inputs) {
            console.log('TextInputs');
            inputs.forEach(function (item) { return _this.createInput(item); });
        };
        this.singleInput = singleInput;
    }
    TextInputsView.prototype.createInput = function (input) {
        var wrapper = document.createElement('div');
        wrapper.setAttribute('style', 'border: 4px solid blue; padding: 15px');
        var firstLine = this.getFirstLine(input);
        wrapper.append(firstLine);
        if (!this.singleInput) {
            var secondLine = this.getSecondLine(input);
            wrapper.append(secondLine);
        }
        var canvas = document.getElementById(canvasId);
        console.log('canvas', canvas);
        canvas.append(wrapper);
    };
    TextInputsView.prototype.getFirstLine = function (input) {
        var firstLine = document.createElement('div');
        var firstLineSpan = document.createElement('span');
        firstLineSpan.innerText = "1 Euro is ";
        var firstLineInput = document.createElement('input');
        firstLineInput.setAttribute('value', input.oneOnOne.toString());
        firstLineInput.disabled = true;
        var secondLineSpan = document.createElement('span');
        secondLineSpan.innerText = " " + input.currency;
        firstLine.append(firstLineSpan);
        firstLine.append(firstLineInput);
        firstLine.append(secondLineSpan);
        return firstLine;
    };
    TextInputsView.prototype.getSecondLine = function (input) {
        var secondLine = document.createElement('div');
        var firstHalf = document.createElement('div');
        var firstHalfSpan = document.createElement('span');
        firstHalfSpan.innerText = "Euro";
        firstHalfSpan.setAttribute('style', 'display: block');
        var firstHalfInput = document.createElement('input');
        firstHalfInput.setAttribute('value', this.defaultMultipleVal.toString());
        firstHalfInput.setAttribute('id', "E-" + input.currency);
        firstHalfInput.setAttribute('type', "number");
        this.setChangeEvent(firstHalfInput, input.oneOnOne);
        firstHalf.append(firstHalfSpan);
        firstHalf.append(firstHalfInput);
        firstHalf.setAttribute('style', 'display: inline-block');
        var secondHalf = document.createElement('div');
        var secondHalfSpan = document.createElement('span');
        secondHalfSpan.innerText = input.currency;
        secondHalfSpan.setAttribute('style', 'display: block');
        var secondHalfInput = document.createElement('input');
        secondHalfInput.setAttribute('value', (this.defaultMultipleVal * input.oneOnOne).toFixed(2));
        secondHalfInput.setAttribute('id', "C-" + input.currency);
        secondHalfInput.setAttribute('type', "number");
        this.setChangeEvent(secondHalfInput, input.oneOnOne);
        secondHalf.append(secondHalfSpan);
        secondHalf.append(secondHalfInput);
        secondHalf.setAttribute('style', 'display: inline-block');
        secondLine.append(firstHalf);
        secondLine.append(secondHalf);
        return secondLine;
    };
    // something is off if toggle first and then second (or vice versa) inputs (stops changing)
    TextInputsView.prototype.setChangeEvent = function (element, excangeRate) {
        element.onchange = function (event) {
            var target = event.target;
            var id = target.id;
            id = id.includes('E-') ? id.replace('E-', 'C-') : id.replace('C-', 'E-');
            if (id.includes('E-')) {
                document.getElementById(id).setAttribute('value', (Number(target.value) / excangeRate).toFixed(2));
            }
            else {
                document.getElementById(id).setAttribute('value', (Number(target.value) * excangeRate).toFixed(2));
            }
        };
    };
    return TextInputsView;
}());
var SlidersView = /** @class */ (function () {
    function SlidersView(singleInput) {
        var _this = this;
        this.singleInput = true;
        this.defaultMultipleVal = 100;
        this.paint = function (inputs) {
            console.log('SlidersView');
            inputs.forEach(function (item) { return _this.createInput(item); });
        };
        this.singleInput = singleInput;
    }
    SlidersView.prototype.createInput = function (input) {
        var wrapper = document.createElement('div');
        wrapper.setAttribute('style', 'border: 4px solid blue; padding: 15px');
        var firstLine = this.getFirstLine(input);
        wrapper.append(firstLine);
        if (!this.singleInput) {
            var secondLine = this.getSecondLine(input);
            wrapper.append(secondLine);
        }
        var canvas = document.getElementById(canvasId);
        canvas.append(wrapper);
    };
    SlidersView.prototype.getFirstLine = function (input) {
        var firstLine = document.createElement('div');
        var firstLineSpan = document.createElement('span');
        firstLineSpan.innerText = "1 Euro is " + input.oneOnOne + " " + input.currency;
        firstLine.append(firstLineSpan);
        return firstLine;
    };
    SlidersView.prototype.getSecondLine = function (input) {
        var secondLine = document.createElement('div');
        var firstHalf = document.createElement('div');
        var firstHalfSpan = document.createElement('span');
        firstHalfSpan.innerText = "Euro: 1";
        firstHalfSpan.setAttribute('style', 'display: block');
        var firstHalfInput = document.createElement('input');
        firstHalfInput.setAttribute('value', this.defaultMultipleVal.toString());
        firstHalfInput.setAttribute('id', "E-" + input.currency);
        firstHalfInput.setAttribute('type', 'range');
        firstHalfInput.setAttribute('min', '0');
        firstHalfInput.setAttribute('max', '50');
        firstHalfInput.setAttribute('value', "1");
        var secondHalf = document.createElement('div');
        var secondHalfSpan = document.createElement('span');
        secondHalfSpan.innerText = input.currency + ": " + input.oneOnOne;
        secondHalfSpan.setAttribute('style', 'display: block');
        var secondHalfInput = document.createElement('input');
        secondHalfInput.setAttribute('value', (this.defaultMultipleVal * input.oneOnOne).toFixed(2));
        secondHalfInput.setAttribute('id', "C-" + input.currency);
        secondHalfInput.setAttribute('type', 'range');
        secondHalfInput.setAttribute('min', '0');
        secondHalfInput.setAttribute('max', '100');
        secondHalfInput.setAttribute('value', input.oneOnOne.toString());
        this.setChangeEvent(firstHalfInput, firstHalfSpan, secondHalfSpan, input);
        this.setChangeEvent(secondHalfInput, firstHalfSpan, secondHalfSpan, input);
        firstHalf.append(firstHalfSpan);
        firstHalf.append(firstHalfInput);
        firstHalf.setAttribute('style', 'display: inline-block');
        secondHalf.append(secondHalfSpan);
        secondHalf.append(secondHalfInput);
        secondHalf.setAttribute('style', 'display: inline-block');
        secondLine.append(firstHalf);
        secondLine.append(secondHalf);
        return secondLine;
    };
    // something is off if toggle first and then second (or vice versa) inputs (stops changing)
    SlidersView.prototype.setChangeEvent = function (element, firstSpan, secondSpan, input) {
        element.onchange = function (event) {
            var target = event.target;
            var id = target.id;
            id = id.includes('E-') ? id.replace('E-', 'C-') : id.replace('C-', 'E-');
            var newVal = '';
            if (id.includes('E-')) {
                newVal = (Number(target.value) / input.oneOnOne).toString();
                firstSpan.innerText = "Euro: " + newVal;
                secondSpan.innerText = input.currency + ": " + target.value;
            }
            else {
                newVal = (Number(target.value) * input.oneOnOne).toString();
                firstSpan.innerText = "Euro: " + target.value;
                secondSpan.innerText = input.currency + ": " + newVal;
            }
            document.getElementById(id).setAttribute('value', newVal);
        };
    };
    return SlidersView;
}());
