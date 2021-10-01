const stopwatchListTemplate = document.createElement('template');

stopwatchListTemplate.innerHTML = `
    <style>
        @import url("styles/form.css");
    </style>
    <div>
        <h3>Press the + button for create new stopwatch!</h3>
        <div id="container"></div>
        <button add>+</button>
        <div id="form" style="display:none">
            <form>
                <h2>CREATE NEW STOPWATCH</h2>
                <label for="stopwatch-name">Insert a new stopwatch's label</label>
                <input type="text" id="stopwatch-name" name="stopwatch-name" placeholder="Enter the label">
                <input id="submit" type="button" value="Create Stopwatch">
            </form>
        </div>
    </div>
`
class StopwatchList extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(stopwatchListTemplate.content.cloneNode(true));

        this.add = this.add.bind(this);
        this.createStopwatch = this.createStopwatch.bind(this);

        this.addBtn = this.shadowRoot.querySelector('[add]');
        this.form = this.shadowRoot.querySelector('#form');
        this.stopwatchName = this.shadowRoot.querySelector('#stopwatch-name');

        this.submitButton = this.shadowRoot.querySelector('#submit');
        this.container = this.shadowRoot.querySelector('#container');

        let timer = JSON.parse(localStorage.getItem('timer'));

        if (timer) {
            this.loadStopwatch(timer);
        } else {
            localStorage.setItem('timer', JSON.stringify([]));
            this.lastTimerId = 0;
        }
    }

    connectedCallback() {
        this.addBtn.addEventListener('click', this.add);
        this.submitButton.addEventListener('click', this.createStopwatch);
    }

    add() {
        this.form.setAttribute('style', "display:initial");
    }

    createStopwatch() {
        var stopwatchName = this.stopwatchName.value;
        const stopwatch = document.createElement('stopwatch-custom');

        stopwatch.setAttribute('id', "stopwatch-" + this.lastTimerId);
        stopwatch.setAttribute('name', stopwatchName);
        stopwatch.setAttribute('state', 'stop');

        this.container.appendChild(stopwatch);

        this.form.setAttribute('style', "display:none");
        this.stopwatchName.value = "";

        let timer = JSON.parse(localStorage.getItem('timer'));

        timer.push({
            id: this.lastTimerId,
            name: stopwatchName,
            state: 'stop',
            time: '0',
        })

        localStorage.setItem('timer', JSON.stringify(timer));
        this.lastTimerId++;
    }

    //untuk memanggil stopwatch dari local storage ketika tab dibuka
    loadStopwatch(timer) {
        if (timer.length > 0) {
            this.lastTimerId = timer[timer.length - 1].id + 1;
        } else {
            this.lastTimerId = 0;
        }

        for (let i = 0; i < timer.length; i++) {
            const stopwatch = document.createElement('stopwatch-custom');

            stopwatch.setAttribute('id', "stopwatch-" + timer[i].id);
            stopwatch.setAttribute('name', timer[i].name);
            stopwatch.setAttribute('state', timer[i].state);
            stopwatch.setAttribute('time', timer[i].time);

            this.container.appendChild(stopwatch);
        }
    }
}

window.customElements.define('stopwatch-list', StopwatchList);
