import * as rxjs from 'rxjs';

class CounterReader extends HTMLElement {
    value = '0';

    constructor() {
        super();

        console.log('created custom element <counter-reader>');
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        const styleText = require('!raw-loader!./styles.css');

        this.shadowRoot.innerHTML = `
            <style>${ styleText.default }</style>
            <div class="container">
                <h2>Counter Reader</h2>
                <p>The current counter value is: <span id="valueField">${this.value}</p>
            </div>
        `
        const valueField = this.shadowRoot.getElementById('valueField');

        rxjs.fromEvent(window, 'counter-update').subscribe((event: CustomEvent) => {
            console.log('Received counter-update event', event.detail);
            this.value = event.detail.value;
            valueField.textContent = '' + this.value;
        });
    }
}

const elementName = 'counter-reader';
customElements.define(elementName, CounterReader);

export { elementName };