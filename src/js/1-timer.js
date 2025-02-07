import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const datePicker = document.querySelector("#datetime-picker");
const startButton = document.querySelector("[data-start]");
const daysElement = document.querySelector("[data-days]");
const hoursElement = document.querySelector("[data-hours]");
const minutesElement = document.querySelector("[data-minutes]");
const secondsElement = document.querySelector("[data-seconds]");

let userSelectedDate = null;
let countdownInterval = null;

startButton.disabled = true;

const options = {
enableTime: true,
time_24hr: true,
defaultDate: new Date(),
minuteIncrement: 1,
onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
    iziToast.error({
        title: "Error",
        message: "Please choose a date in the future",
    });
    startButton.disabled = true;
    } else {
    userSelectedDate = selectedDates[0];
    startButton.disabled = false;
    }
},
};

flatpickr(datePicker, options);

startButton.addEventListener("click", () => {
if (!userSelectedDate) return;

startButton.disabled = true;
datePicker.disabled = true;

countdownInterval = setInterval(() => {
    const currentTime = new Date();
    const timeDifference = userSelectedDate - currentTime;

    if (timeDifference <= 0) {
    clearInterval(countdownInterval);
    updateTimerUI(0, 0, 0, 0);
    datePicker.disabled = false;
    return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    updateTimerUI(days, hours, minutes, seconds);
}, 1000);
});

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

function addLeadingZero(value) {
return String(value).padStart(2, "0");
}

function updateTimerUI(days, hours, minutes, seconds) {
daysElement.textContent = addLeadingZero(days);
hoursElement.textContent = addLeadingZero(hours);
minutesElement.textContent = addLeadingZero(minutes);
secondsElement.textContent = addLeadingZero(seconds);
}

