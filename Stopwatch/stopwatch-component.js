const stopwatchTemplate = document.createElement('template');
stopwatchTemplate.innerHTML = `
        <p>
            <span id="hour">00</span> : 
            <span id="minute">00</span> : 
            <span id="second">00</span> : 
            <span id="tens">00</span>
        </p>
        <button id="start">Start</button>
        <button id="stop">Stop</button>
        <button id="reset">Reset</button>
        <script src="stopwatch.js"></script>
`

class Stopwatch extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(stopwatchTemplate.content)
    }
}

customElements.define('stopwatch-custom', Stopwatch)
