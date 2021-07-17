import {
  addLeadingZeroes,
  getNextBurnTime,
  getMetricTime,
  METRIC_SECOND_VALUE_MS,
  getBurnYear,
  getGateOpen,
  stringifyMetricTime,
} from './BlackRockInfinite';

let nextBurnTime = 0;
let referenceTime = 0;
let burnYear = 0;

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
let gateSpan = document.getElementById('gate');

const initTime = () => {
  const burnDate = getNextBurnTime();
  nextBurnTime = burnDate.getTime();
  referenceTime = Date.now();
  burnYear = getBurnYear(referenceTime);
  setYear(addLeadingZeroes(burnYear.toString(), 4));

  const gateMetricTime = getMetricTime(
    nextBurnTime,
    getGateOpen(burnDate.getFullYear()).getTime()
  );
  if (gateSpan) gateSpan.innerHTML = stringifyMetricTime(gateMetricTime);
};

const setYear = (year: string) => {
  if (yearSpan) yearSpan.innerHTML = year;
};

/**
 * The index.ts contains the timer.
 * It owns the referenceTime value.
 *
 * BlackRockInfinite should not have Date.now() or
 * global values.
 *
 * It is the current YEAR value until the END of burn night
 * Only refresh year then.
 *
 * THIS checks if isItBurnNight.
 * GetMetricTime returns 00 if negative.
 * Reset time once isItBurnNight returns false.
 */
const onMetricSecondTick = () => {
  // should initTime be a callback arg?
  // if (referenceTime > nextBurnTime) {
  //   if (!isItBurnNight(referenceTime)) initTime();
  // }
  const metricTime = getMetricTime(nextBurnTime, referenceTime, initTime);

  if (daysSpan) daysSpan.innerHTML = metricTime.days;
  if (hoursSpan) hoursSpan.innerHTML = metricTime.hours;
  if (minutesSpan) minutesSpan.innerHTML = metricTime.minutes;
  if (secondsSpan) secondsSpan.innerHTML = metricTime.seconds;
  referenceTime += METRIC_SECOND_VALUE_MS;
};

initTime();
window.setInterval(onMetricSecondTick, METRIC_SECOND_VALUE_MS);
