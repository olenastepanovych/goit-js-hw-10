import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const input = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("[data-start]");
const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");

let countdownInterval;
let userSelectedDate = null;

startBtn.disabled = true; // Спочатку кнопка "Start" неактивна

// Налаштування flatpickr
const options = {
enableTime: true,
time_24hr: true,
defaultDate: new Date(),
minuteIncrement: 1,
onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
    iziToast.error({
        title: "Error",
        message: "Please choose a date in the future",
        position: "topRight",
    });
    startBtn.disabled = true;
    } else {
    userSelectedDate = selectedDate;
    startBtn.disabled = false;
    }
},
};

flatpickr(input, options);

startBtn.addEventListener("click", () => {
if (!userSelectedDate) return;

startBtn.disabled = true;
input.disabled = true;

countdownInterval = setInterval(() => {
    const now = new Date();
    const timeRemaining = userSelectedDate - now;

    if (timeRemaining <= 0) {
    clearInterval(countdownInterval);
    updateTimerUI(0, 0, 0, 0);
    input.disabled = false;
    return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeRemaining);
    updateTimerUI(days, hours, minutes, seconds);
}, 1000);
});

function convertMs(ms) {
const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

return {
    days: Math.floor(ms / day),
    hours: Math.floor((ms % day) / hour),
    minutes: Math.floor(((ms % day) % hour) / minute),
    seconds: Math.floor((((ms % day) % hour) % minute) / second),
};
}

function addLeadingZero(value) {
return String(value).padStart(2, "0");
}

function updateTimerUI(days, hours, minutes, seconds) {
daysEl.textContent = addLeadingZero(days);
hoursEl.textContent = addLeadingZero(hours);
minutesEl.textContent = addLeadingZero(minutes);
secondsEl.textContent = addLeadingZero(seconds);
}


