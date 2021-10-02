class CountRead extends HTMLElement {
    value = 0;

    constructor() {
        super();

        console.log('created custom element <count-read>');

        this.attachShadow({ mode: 'open' });
    
        // Create container div
        const div = document.createElement('div');
        div.setAttribute('class', 'wc-cont');
        div.setAttribute('style', 'background-color: #545454; border: 2px dashed yellow; padding: 1em; color: #fff;');

        // Add h2 title
        const h2 = document.createElement('h2');
        h2.textContent = 'Count Read';
        div.appendChild(h2);

        // Add a parapgrah
        const p = document.createElement('p');
        p.textContent = 'The current value is: '
        div.appendChild(p);

        const span = document.createElement('span');
        span.setAttribute('id', 'valueField');
        span.textContent = this.value;
        p.appendChild(span);

        this.shadowRoot.append(div);
    }

    connectedCallback() {
        console.log('Start listening to events...');
        window.addEventListener('value-update', (e) => {
            console.log('Read event "value-update"');
            this.value = e.detail.value;
            this.shadowRoot.querySelector('#valueField').textContent = this.value;
        });
    }
}

(function() {
    customElements.define('count-read', CountRead);
}(this));