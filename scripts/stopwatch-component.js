const template = document.createElement('template');

template.innerHTML = `
    <div>
		<p name>0<p>
		<p time>0<p>
		<button start>Start</button>
		<button stop>Stop</button>
        <div>
            <p history>History</p>
        </div>
    </div>
  `;

class Stopwatch extends HTMLElement {
    constructor() {
        super();

        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.incrementTime = this.incrementTime.bind(this);

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.startBtn = this.shadowRoot.querySelector('[start]');
        this.stopBtn = this.shadowRoot.querySelector('[stop]');

        this.timeDisplay = this.shadowRoot.querySelector('[time]');
        this.nameDisplay = this.shadowRoot.querySelector('[name]');
    }

    connectedCallback() {
        this.startBtn.addEventListener('click', this.start);
        this.stopBtn.addEventListener('click', this.stop);

        if (!this.hasAttribute('state')) {
            this.setAttribute('state', 'stop');
        }

        if (!this.hasAttribute('time')) {
            this.setAttribute('time', 0);
        }
    }

    insertZero(time) {
        if (time < 10)
            return "0" + time;

        return time;
    }

    formatTime(second) {
        let divisor = 60 * 60;

        const hour = Math.floor(second / divisor);
        second = second % divisor;
        divisor = divisor / 60;

        const minute = Math.floor(second / divisor);
        second = second % divisor;

        return this.insertZero(hour) + ":" + this.insertZero(minute) + ":" + this.insertZero(second);
    }

    incrementTime() {
        this.setAttribute('time', parseInt(this.getAttribute('time')) + 1);
    }

    start() {
        const state = this.getAttribute('state');

        if ((state === 'pause') || (state === 'stop')) {
            this.setAttribute('state', 'start');
            this.interval = setInterval(this.incrementTime, 1000);

            this.startBtn.innerText = 'Pause';
        } else if (state === 'start') {
            this.setAttribute('state', 'pause');
            clearInterval(this.interval);

            this.startBtn.innerText = 'Resume';
        }
    }

    stop() {
        this.setAttribute('state', 'stop');
        clearInterval(this.interval);

        console.log(this.getAttribute('time'));
        localStorage.setItem('history', this.getAttribute('time'));

        console.log(localStorage.getItem('timer'));
        
        let timer = JSON.parse(localStorage.getItem('timer'));
        for (let i = 0; i<timer.length; i++) {
            if (timer[i].name === this.getAttribute('name')) {
               timer[i].history.push(this.getAttribute('time'));
                //console.log(timer[i].history);
            }
        }
        localStorage.setItem('timer', JSON.stringify(timer));

        this.setAttribute('time', 0);
        
        this.startBtn.innerText = 'Start';
    }

    static get observedAttributes() {
        return ['time'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.nameDisplay.innerText = this.getAttribute('name');
        this.timeDisplay.innerText = this.formatTime(this.getAttribute('time'));
    }

    disconnectedCallback() {
        this.startBtn.removeEventListener('click', this.start);
        this.stopBtn.removeEventListener('click', this.stop);
    }
}

window.customElements.define('stopwatch-custom', Stopwatch);
