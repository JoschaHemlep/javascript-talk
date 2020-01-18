import { arraySum } from './array-helper.js';
import { disableButton, enableButton } from './button-helper.js';
import RecordedTime from './RecordedTime.js';
import { convertToHumanReadableString } from './time-helper.js';

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

function setSum() {
    const times = recordedTimes.map(recordedTime => recordedTime.time);
    const timesSum = arraySum(times);
    sumElement.innerText = convertToHumanReadableString(timesSum);
}

function startTimer() {
    disableButton(startButtonElement);
    enableButton(stopButtonElement);
    startDate = new Date();
    interval = window.setInterval(setCurrentTime, 1000);
}

function stopTimer() {
    enableButton(startButtonElement);
    disableButton(stopButtonElement);
    window.clearInterval(interval);

    addCurrentTimeToTimerList();

    setSum();

    currentTimeDifferenceInMilliseconds = 0;
    currentTimerElement.innerText = '00 : 00 : 00';
    commentInputElement.value = '';
}

function addCurrentTimeToTimerList() {
    const comment = commentInputElement.value;

    const currentTime = new RecordedTime(
        currentTimeDifferenceInMilliseconds,
        comment
    );

    recordedTimes.push(currentTime);

    refreshTimerList();
}

function addRecordedTime(timer) {
    const liNode = document.createElement('LI');
    const textNode = document.createTextNode(
        `${convertToHumanReadableString(timer.time)} - ${timer.comment}`
    );
    liNode.appendChild(textNode);
    timerListElement.appendChild(liNode);
}

function setTimerListToArray(array) {
    recordedTimes = array;

    refreshTimerList();

    setSum();
}

function refreshTimerList() {
    while (timerListElement.firstChild) {
        timerListElement.removeChild(timerListElement.firstChild);
    }

    recordedTimes.forEach(timer => {
        addRecordedTime(timer);
    });
}

function setCurrentTime() {
    currentTimeDifferenceInMilliseconds = Math.abs(new Date() - startDate);
    currentTimerElement.innerHTML = convertToHumanReadableString(
        currentTimeDifferenceInMilliseconds
    );
}

function save() {
    const recordedTimesJson = JSON.stringify(recordedTimes);
    document.cookie = `recordedTimes=${recordedTimesJson}; expires=Thu, 01 Jan 2100 00:00:00 UTC; path=/;`;
}

function load() {
    const arrayJson = document.cookie.replace('recordedTimes=', '');
    const array = JSON.parse(arrayJson);

    setTimerListToArray(array);
}

startButtonElement.addEventListener('click', startTimer);
stopButtonElement.addEventListener('click', stopTimer);

saveButtonElement.addEventListener('click', save);
loadButtonElement.addEventListener('click', load);
