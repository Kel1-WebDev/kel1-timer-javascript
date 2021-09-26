function history() {
    var histTime = document.createElement("div");
}

function stop() {
    let hty = document.getElementById('HISTORY')
    syncLocalStorage('STOP', hty.value)
    }

function syncLocalStorage(histories, time, status = false) {
    switch(histories) {
        case 'STOP':
            stopwatch[time] = status
            break;
        case 'reset':

    }

}