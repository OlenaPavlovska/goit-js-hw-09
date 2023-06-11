import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
  startBtn: document.querySelector("[data-start]"),
  input: document.getElementById('datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let chosenDate = 0;
let currentDate = new Date().getTime();
let intervalId = 0;

refs.startBtn.addEventListener('click', countDown);
refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    chosenDate = selectedDates[0].getTime();
    if (chosenDate < currentDate) {
      refs.startBtn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    } else if (refs.input.value.trim() !== '') {
      refs.startBtn.disabled = false;
      
      Notiflix.Notify.success('Correct date :)');
    }
  },
};

flatpickr("#datetime-picker", options);

function countDown() {
    if (!chosenDate) {
        return; 
    }
   else if (intervalId !== 0) {
    clearInterval(intervalId);
  }
  
  intervalId = setInterval(function () {
    currentDate += 1000;
    const diff = chosenDate - currentDate;
    const { days, hours, minutes, seconds } = convertMs(diff);
    renderTimer(days, hours, minutes, seconds);

    if (diff <= 0) {
      clearInterval(intervalId);
        refs.startBtn.disabled = true;
         refs.days.textContent = '00';
  refs.hours.textContent = '00';
  refs.minutes.textContent = '00';
  refs.seconds.textContent = '00';

    }
  }, 1000);
  refs.input.disabled = true;
  refs.startBtn.disabled = true;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function renderTimer(days, hours, minutes, seconds) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(number) {
  return String(number).padStart(2, '0');
}
