const refs = {
    start: document.querySelector('[data-start]'),
    stop: document.querySelector('[data-stop]'),
    body: document.querySelector('body'),
};
let interval;
refs.stop.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};

refs.start.addEventListener('click', onStartBtn);
refs.stop.addEventListener('click', onStopBtn);

function onStartBtn() {
    interval = setInterval(getColor, 1000);
    refs.start.disabled = true;
    refs.stop.disabled = false;
};

function getColor() {
    refs.body.style.backgroundColor = getRandomHexColor();
};

function onStopBtn() {
    clearInterval(interval);
    refs.start.disabled = false;
    refs.stop.disabled = true;
};
