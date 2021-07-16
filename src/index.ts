import {
  getNextBurnTime,
  getMetricTime,
  METRIC_SECOND_VALUE_MS,
} from './BlackRockInfinite';

const nextBurnTime = getNextBurnTime().getTime();
let referenceTime = Date.now();

enum timerDisplayElement {
  YEAR = 'year',
  DAYS = 'days',
  HOURS = 'hours',
  MINUTES = 'minutes',
  SECONDS = 'seconds',
}

let yearSpan = document.getElementById(timerDisplayElement.YEAR);
let daysSpan = document.getElementById(timerDisplayElement.DAYS);
let hoursSpan = document.getElementById(timerDisplayElement.HOURS);
let minutesSpan = document.getElementById(timerDisplayElement.MINUTES);
let secondsSpan = document.getElementById(timerDisplayElement.SECONDS);

const setYear = () => {
  const metricTime = getMetricTime(nextBurnTime, referenceTime);
  if (yearSpan) yearSpan.innerHTML = metricTime.year;
};

const onMetricSecondTick = () => {
  const metricTime = getMetricTime(nextBurnTime, referenceTime);
  if (
    metricTime.days === '00' &&
    metricTime.hours === '00' &&
    metricTime.minutes === '00'
  ) {
    if (yearSpan) yearSpan.innerHTML = metricTime.year;
  }
  if (daysSpan) daysSpan.innerHTML = metricTime.days;
  if (hoursSpan) hoursSpan.innerHTML = metricTime.hours;
  if (minutesSpan) minutesSpan.innerHTML = metricTime.minutes;
  if (secondsSpan) secondsSpan.innerHTML = metricTime.seconds;
  referenceTime += METRIC_SECOND_VALUE_MS;
};

setYear();
window.setInterval(onMetricSecondTick, METRIC_SECOND_VALUE_MS);
