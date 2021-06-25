var StatApp = /** @class */ (function () {
    function StatApp() {
        var _this = this;
        this.inputs = [];
        this.amountOfInputs = 0;
        var inputsAmount = document.getElementById('amount-of-inputs');
        inputsAmount.addEventListener('input', function (event) {
            var target = event.target;
            _this.amountOfInputs = Number(target.value);
            _this.startApp();
        });
        this.startApp();
    }
    StatApp.prototype.startApp = function () {
        new UI(this.amountOfInputs, this.inputs);
    };
    return StatApp;
}());
var UI = /** @class */ (function () {
    function UI(inputCount, values) {
        this.statsSection = document.getElementById('UI');
        this.statsSection.innerHTML = null;
        this.generateUI(inputCount, values);
    }
    UI.prototype.generateStat = function (name, calculator, values) {
        var statName = document.createElement('h6');
        var value = document.createElement('p');
        statName.innerText = name;
        value.innerText = calculator(values);
        var wrapper = document.createElement('div');
        wrapper.appendChild(statName);
        wrapper.appendChild(value);
        return wrapper;
    };
    UI.prototype.generateInputs = function (count, values) {
        var inputsSection = document.getElementById('inputs');
        inputsSection.innerHTML = null;
        for (var i = 0; i < count; i++) {
            var input = new InputField(i, count, values).render();
            inputsSection.appendChild(input);
        }
    };
    UI.prototype.generateUI = function (inputCount, values) {
        var _this = this;
        var stats = new Statystyka;
        var info = [];
        this.generateInputs(inputCount, values);
        var valuesToCount = values.slice(0, inputCount);
        info.push(this.generateStat('Suma:', stats.sum, valuesToCount));
        info.push(this.generateStat('Średnia:', stats.average, valuesToCount));
        info.push(this.generateStat('Min:', stats.min, valuesToCount));
        info.push(this.generateStat('Max:', stats.max, valuesToCount));
        info.forEach(function (el) {
            _this.statsSection.appendChild(el);
        });
    };
    return UI;
}());
var Statystyka = /** @class */ (function () {
    function Statystyka() {
    }
    Statystyka.prototype.sum = function (values) {
        var sum = values.reduce(function (a, b) { return a + b; }, 0);
        return sum;
    };
    Statystyka.prototype.average = function (values) {
        var sum = values.reduce(function (a, b) { return a + b; }, 0);
        return Number((sum / values.length).toFixed(2));
    };
    Statystyka.prototype.min = function (values) {
        return Math.min.apply(Math, values);
    };
    Statystyka.prototype.max = function (values) {
        return Math.max.apply(Math, values);
    };
    return Statystyka;
}());
var InputField = /** @class */ (function () {
    function InputField(id, count, values) {
        this.input = document.createElement('input');
        this.input.type = "number";
        this.input.value = values[id] ? String(values[id]) : '0';
        this.input.id = "input-" + id;
        values[id] = Number(this.input.value);
        this.input.addEventListener('input', function (event) {
            var target = event.target;
            values[id] = Number(target.value);
            new UI(count, values);
        });
        this.button = document.createElement('button');
        this.button.innerText = "Delete";
        this.button.addEventListener('click', function (event) {
            var countInput = document.getElementById('amount-of-inputs');
            values[id] = 0;
            values.splice(id, 1);
            count -= 1;
            countInput.value = count;
            new UI(count, values);
        });
    }
    InputField.prototype.render = function () {
        var wrapper = document.createElement('div');
        wrapper.className = "flex";
        wrapper.appendChild(this.input);
        wrapper.appendChild(this.button);
        return wrapper;
    };
    return InputField;
}());
var statApp = new StatApp();
