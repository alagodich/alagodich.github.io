let timerId = null,
    interval = 100;

self.onmessage = function (event) {
    if (event.data === 'start') {
        timerId = setInterval(() => {
            postMessage('tick');
        }, interval);
    } else if (event.data.interval) {
        interval = event.data.interval;
        if (timerId) {
            clearInterval(timerId);
            timerId = setInterval(() => {
                postMessage('tick');
            }, interval);
        }
    } else if (event.data === 'stop') {
        clearInterval(timerId);
        timerId = null;
    }
};
