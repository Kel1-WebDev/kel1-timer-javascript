const stopwatchTemplate = document.createElement('template');
stopwatchTemplate.innerHTML = `
        <div id="stopwatch">
            <p>
                <span id="hour">00</span> : 
                <span id="minute">00</span> : 
                <span id="second">00</span> : 
                <span id="tens">00</span>
            </p>
            <button id="start">Start</button>
            <button id="stop">Stop</button>
            <button id="reset">Reset</button>
        </div>
`

class Stopwatch extends HTMLElement {
    constructor() {
        super();
        // this.startTimer = this.startTimer.bind(this)

        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild(stopwatchTemplate.content.cloneNode(true));
        
        this.startBtn = this.shadowRoot.querySelector('#start');
        this.stopBtn = this.shadowRoot.querySelector('#stop');
        this.resetBtn = this.shadowRoot.querySelector('#reset');

        this.tens = this.shadowRoot.querySelector('#tens');
        this.minute = this.shadowRoot.querySelector('#minute');
        this.second = this.shadowRoot.querySelector('#second');
        this.hour = this.shadowRoot.querySelector('#hour');
    }

    connectedCallback(){
        this.startBtn.addEventListener('click', this.startTimer);
    }

    attributeChangedCallback(){

    }    

    static get observedAttributes(){
        return ['tens', 'second', 'minute', 'hour'];
    }

    // set tens(){}
    // get tens(){}

    // set second(){}
    // get second(){}

    // set minute(){}
    // get minute(){}

    // set hour(){}
    // get hour(){}

    // startTimer() {
    // }
}

customElements.define('stopwatch-custom', Stopwatch)
