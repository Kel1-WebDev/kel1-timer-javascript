const stopwatchListTemplate = document.createElement('template');

stopwatchListTemplate.innerHTML = `
    <style>
        @import url("styles/main.css");
        @import url("styles/form.css");
    </style>
    <div>
        <div class="center-content">
            <h1 id="title">cronômetro</h1>
        </div>
        <div class="row">
            <div class="fixed-list">
                <div id="container"></div>
            </div>
            <div>
                <div id="form">
                    <form>
                        <h2>CREATE NEW STOPWATCH</h2>
                        <label for="stopwatch-name">Insert a new stopwatch's label</label>
                        <input type="text" id="stopwatch-name" name="stopwatch-name" placeholder="Enter the label">
                        <input id="submit" type="button" value="Create Stopwatch">
                    </form>
                </div>
            </div>
        </div>
    </div>
`
class StopwatchList extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(stopwatchListTemplate.content.cloneNode(true));

        this.createStopwatch = this.createStopwatch.bind(this);
        this.enableCreateButton = this.enableCreateButton.bind(this);

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

        if (timer.length >= 10) {
            this.submitButton.setAttribute("disabled", "disabled");
            this.submitButton.setAttribute("style", "background-color:#CCCCCC; border-color:transparent");
        }
    }

    connectedCallback() {
        this.submitButton.addEventListener('click', this.createStopwatch);
    }

    createStopwatch() {
        var stopwatchName = this.stopwatchName.value;
        const stopwatch = document.createElement('stopwatch-custom');

        stopwatch.setAttribute('id', "stopwatch-" + this.lastTimerId);
        stopwatch.setAttribute('name', stopwatchName);
        stopwatch.setAttribute('state', 'stop');
        stopwatch.enableCreateButton = this.enableCreateButton;

        this.container.appendChild(stopwatch);

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

        if (timer.length >= 10) {
            this.submitButton.setAttribute("disabled", "disabled");
            this.submitButton.setAttribute("style", "background-color:#CCCCCC; border-color:transparent");
        }
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
            stopwatch.enableCreateButton = this.enableCreateButton;
            this.container.appendChild(stopwatch);
        }
    }

    enableCreateButton() {
        this.submitButton.removeAttribute("disabled");
        this.submitButton.setAttribute("style", "background-color:#191BA9; border-color:#191BA9;")
    }
}

window.customElements.define('stopwatch-list', StopwatchList);
