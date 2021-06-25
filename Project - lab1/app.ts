class StatApp {
    stats: Statystyka;
    inputs: Array<number> = [];
    amountOfInputs: number = 0;

    constructor () {
        const inputsAmount: HTMLElement = document.getElementById('amount-of-inputs');
        inputsAmount.addEventListener('input', (event: Event) => {
            const target = event.target as HTMLInputElement;
            this.amountOfInputs = Number(target.value);
            this.startApp();
        });
        
        this.startApp();
    }

    startApp(): void {
        new UI(this.amountOfInputs, this.inputs);
    }
}

class UI {
    statsSection = document.getElementById('UI');

    constructor(inputCount: number, values: Array<number>) {
        this.statsSection.innerHTML = null;
        this.generateUI(inputCount, values);        
    }    

    generateStat(name: string, calculator: Function, values: Array<number>): HTMLDivElement {
        const statName = document.createElement('h6');
        const value = document.createElement('p');
        statName.innerText = name;
        value.innerText = calculator(values);

        const wrapper = document.createElement('div');
        wrapper.appendChild(statName);
        wrapper.appendChild(value);

        return wrapper;
    }
    generateInputs(count: number, values: Array<number>): void{
        const inputsSection = document.getElementById('inputs');
        inputsSection.innerHTML = null;

        for (let i = 0; i < count; i++) {
            const input = new InputField(i, count, values).render();
            inputsSection.appendChild(input);
        }
    }
    generateUI(inputCount: number, values: Array<number>): void {
        const stats = new Statystyka;
        const info: Array<HTMLDivElement> = [];

        this.generateInputs(inputCount, values);
        const valuesToCount = values.slice(0, inputCount);

        info.push(this.generateStat('Suma:', stats.sum, valuesToCount));
        info.push(this.generateStat('Średnia:', stats.average, valuesToCount));
        info.push(this.generateStat('Min:', stats.min, valuesToCount));
        info.push(this.generateStat('Max:', stats.max, valuesToCount));

        info.forEach((el: HTMLDivElement) => {
            this.statsSection.appendChild(el);
        })
    }
}

class Statystyka {
    sum(values: Array<number>): number {
        const sum: number = values.reduce((a, b) => a + b, 0);
        return sum;
    }
    average(values: Array<number>): number {
        const sum: number = values.reduce((a, b) => a + b, 0);
        return Number((sum / values.length).toFixed(2));
    }
    min(values: Array<number>): number {
        return Math.min(...values);
    }
    max(values: Array<number>): number {
        return Math.max(...values);
    }
}

class InputField {
    input: HTMLInputElement;
    button: HTMLButtonElement;

    constructor(id, count, values: Array<number>) {
        this.input = document.createElement('input');
        this.input.type = "number";
        this.input.value = values[id] ? String(values[id]) : '0';
        this.input.id = `input-${id}`;
        values[id] = Number(this.input.value);

        this.input.addEventListener('input', (event: Event) => {
            const target = event.target as HTMLInputElement;
            values[id] = Number(target.value);
            new UI(count, values);
        });


        this.button = document.createElement('button');
        this.button.innerText = "Delete";
        
        this.button.addEventListener('click', (event: Event) => {
            const countInput: HTMLInputElement = document.getElementById('amount-of-inputs') as HTMLInputElement;
            values[id] = 0;
            values.splice(id,1);
            count -= 1;
            countInput.value = count;

            new UI(count, values);
        });
    }

    render() : HTMLDivElement {
        const wrapper = document.createElement('div');
        wrapper.className = "flex";

        wrapper.appendChild(this.input);
        wrapper.appendChild(this.button);

        return wrapper;
    }
}

const statApp = new StatApp();