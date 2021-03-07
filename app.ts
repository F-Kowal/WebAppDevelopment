class StatApp {
    containerDOMElement: Element;
    ui: UI;
    stats: Statystyka;

    constructor (containerDOMElement: Element) {
        if(!containerDOMElement) {
            throw new Error('Musisz podać pojemnik dla programu StatApp');            
        }

        this.containerDOMElement = containerDOMElement;
        this.startApp();
    }

    startApp(): void {
        this.ui = new UI(this.containerDOMElement);
        this.stats = new Statystyka();
    }
}

class UI {
    constructor(container: Element) {
        console.log('działa');
    }
}

class Statystyka {

}

const statApp = new StatApp(document.body);