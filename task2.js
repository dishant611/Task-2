let startTime, updatedTime, difference, timerID;
let isRunning = false;
let laps = [];

const stopwatch = document.querySelector('#stopwatch h1');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('laps');

startPauseBtn.addEventListener('click', startPause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

function startPause() {
    if (!isRunning) {
        startTime = new Date().getTime() - (difference || 0);
        timerID = setInterval(updateTime, 10);
        startPauseBtn.textContent = 'Pause';
        resetBtn.disabled = false;
        lapBtn.disabled = false;
        isRunning = true;
    } else {
        clearInterval(timerID);
        startPauseBtn.textContent = 'Start';
        isRunning = false;
    }
}

function reset() {
    clearInterval(timerID);
    difference = 0;
    isRunning = false;
    stopwatch.textContent = '00:00:00.000';
    startPauseBtn.textContent = 'Start';
    resetBtn.disabled = true;
    lapBtn.disabled = true;
    laps = [];
    lapsList.innerHTML = '';
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let time = new Date(difference);

    let hours = time.getUTCHours().toString().padStart(2, '0');
    let minutes = time.getUTCMinutes().toString().padStart(2, '0');
    let seconds = time.getUTCSeconds().toString().padStart(2, '0');
    let milliseconds = time.getUTCMilliseconds().toString().padStart(3, '0');

    stopwatch.textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function recordLap() {
    if (isRunning) {
        let lapTime = stopwatch.textContent;
        laps.push(lapTime);
        let lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${laps.length}: ${lapTime}`;
        lapsList.appendChild(lapItem);
    }
}
