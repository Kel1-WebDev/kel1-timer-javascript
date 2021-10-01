const stopwatchListTemplate = document.createElement('template');

stopwatchListTemplate.innerHTML = `
    <style>
        @import url("styles/form.css");
    </style>
    <div>
        <h3>Press the + button for create new stopwatch!</h3>
        <div id="container"></div>
        <button add>+</button>
        <button id="remove">-</button>
        <div id="form" style="display:none">
            <form>
                <h2>CREATE NEW STOPWATCH</h2>
                <label for="stopwatch-name">Insert a new stopwatch's label</label>
                <input type="text" id="name" name="stopwatch-name" placeholder="Enter the label">
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
        this.remove = this.remove.bind(this);

        this.addBtn = this.shadowRoot.querySelector('[add]');
        this.removeBtn = this.shadowRoot.querySelector('#remove')
        this.form = this.shadowRoot.querySelector('#form');
        this.stopwatchName = this.shadowRoot.querySelector('#stopwatch-name');

        this.submitButton = this.shadowRoot.querySelector('#submit');
        this.container = this.shadowRoot.querySelector('#container');

        let timer = JSON.parse(localStorage.getItem('timer'));

        if (timer) {
            this.loadStopwatch(timer);
        } else {
            localStorage.setItem('timer', JSON.stringify([]));
        }
    }

    connectedCallback() {
        this.addBtn.addEventListener('click', this.add);
        this.submitButton.addEventListener('click', this.createStopwatch);
        this.removeBtn.addEventListener('click', this.remove);
    }

    add() {
        this.form.setAttribute('style', "display:initial");
    }

    createStopwatch() {
        var stopwatchName = this.stopwatchName.value;
        const stopwatch = document.createElement('stopwatch-custom');

        stopwatch.setAttribute('name', stopwatchName);
        stopwatch.setAttribute('state', 'stop');
        this.container.appendChild(stopwatch);

        this.form.setAttribute('style', "display:none");
        this.stopwatchName.value = "";

        let timer = JSON.parse(localStorage.getItem('timer'));

        timer.push({
            name: stopwatchName,
            state: 'stop',
            time: '0',
            history: []
        })

        localStorage.setItem('timer', JSON.stringify(timer));
    }

    remove() {
        this.container.removeChild(this.container.childNodes[0]);

        let timer = JSON.parse(localStorage.getItem('timer'));

        timer.shift();

        localStorage.setItem('timer', JSON.stringify(timer));
    }

    loadStopwatch(timer) {  //untuk memanggil stopwatch dari local storage ketika tab dibuka
        for (let i = 0; i < timer.length; i++) {
            const stopwatch = document.createElement('stopwatch-custom');

            stopwatch.setAttribute('name', timer[i].name);
            stopwatch.setAttribute('state', timer[i].state);
            stopwatch.setAttribute('time', timer[i].time);
            stopwatch.setAttribute('history', timer[i].history);
            this.container.appendChild(stopwatch);
        }
    }
}

window.customElements.define('stopwatch-list', StopwatchList)
