import RecordedTime from './RecordedTime.js';

let interval;
let startDate = new Date();
let currentTimeDifferenceInMilliseconds = 0;
let recordedTimes = [];

const currentTimerElement = document.getElementById('current-timer');
const startButtonElement = document.getElementById('start');
const stopButtonElement = document.getElementById('stop');
const saveButtonElement = document.getElementById('save');
const loadButtonElement = document.getElementById('load');
const timerListElement = document.getElementById('timer-list');
const sumElement = document.getElementById('sum');
const commentInputElement = document.getElementById('comment');

function arraySum(array) {
    return array.reduce((a, b) => a + b, 0);
}

function setSum() {
    sumElement.innerText = convertToHumanReadableString(
        arraySum(recordedTimes.map(_ => _.time))
    );
}

function disableButton(button) {
    button.disabled = true;
    button.className += ' disabled';
}

function enableButton(button) {
    button.disabled = false;
    button.className = button.className.replace(' disabled', '');
}

function startTimer() {
    disableButton(startButtonElement);
    enableButton(stopButtonElement);
    startDate = new Date();
    interval = window.setInterval(printTime, 1000);
}

function stopTimer() {
    enableButton(startButtonElement);
    disableButton(stopButtonElement);
    window.clearInterval(interval);

    timerListElement.innerHTML = '';
    const comment = commentInputElement.value;
    const currentTime = new RecordedTime(
        currentTimeDifferenceInMilliseconds,
        comment
    );

    recordedTimes.push(currentTime);

    recordedTimes.forEach(timer => {
        addRecordedTime(timer);
    });

    setSum();

    currentTimeDifferenceInMilliseconds = 0;
    currentTimerElement.innerText = '00 : 00 : 00';
    commentInputElement.value = '';
}

function addRecordedTime(timer) {
    const liNode = document.createElement('LI');
    const textNode = document.createTextNode(
        `${convertToHumanReadableString(timer.time)} - ${timer.comment}`
    );
    liNode.appendChild(textNode);
    timerListElement.appendChild(liNode);
}

function setRecordedTimes(array) {
    while (timerListElement.firstChild) {
        timerListElement.removeChild(timerListElement.firstChild);
    }

    recordedTimes = array;

    recordedTimes.forEach(time => {
        addRecordedTime(time);
    });

    setSum();
}

function printTime() {
    currentTimeDifferenceInMilliseconds = Math.abs(new Date() - startDate);
    currentTimerElement.innerHTML = convertToHumanReadableString(
        currentTimeDifferenceInMilliseconds
    );
}

function convertToHumanReadableString(ms) {
    const delim = ' : ';
    const showWith0 = value => (value < 10 ? `0${value}` : value);
    const hours = showWith0(Math.floor((ms / (1000 * 60 * 60)) % 60));
    const minutes = showWith0(Math.floor((ms / (1000 * 60)) % 60));
    const seconds = showWith0(Math.floor((ms / 1000) % 60));

    return `${hours}${delim}${minutes}${delim}${seconds}`;
}

function save() {
    // delete old cookie
    document.cookie =
        'recordedTimes=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    // create new cookie
    const recordedTimesJson = JSON.stringify(recordedTimes);
    document.cookie = `recordedTimes=${recordedTimesJson}; expires=Thu, 01 Jan 2100 00:00:00 UTC; path=/;`;
}

function load() {
    const decodedCookie = decodeURIComponent(document.cookie);
    const arrayJson = decodedCookie.replace('recordedTimes=', '');
    const array = JSON.parse(arrayJson);

    setRecordedTimes(array);
}

startButtonElement.addEventListener('click', startTimer);
stopButtonElement.addEventListener('click', stopTimer);

saveButtonElement.addEventListener('click', save);
loadButtonElement.addEventListener('click', load);
