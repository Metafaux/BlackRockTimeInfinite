/**
 * Black Rock Infinite: TypeScript
 */

export const METRIC_SECOND_VALUE_MS = 864;

/**
 *
 * @param numberString
 * @param digitCount
 * @returns
 */
export const addLeadingZeroes = (
  numberString: string,
  digitCount: number
): string => {
  let resultString = numberString;
  while (resultString.length < digitCount) {
    resultString = '0' + resultString;
  }
  return resultString;
};

/**
 * Finds the first Monday of September
 * Then, offsets to 4am Tuesday UTC, which is 9pm Monday Pacific
 * @param year number: full year
 */
export const getLaborDate = (year: number): Date => {
  const SEPTEMBER_INDEX = 8;
  const MONDAY_INDEX = 1;
  const ONE = 1;

  // Start with 1st of September
  const laborDate = new Date(Date.UTC(year, SEPTEMBER_INDEX, ONE));

  // Check until first Monday is found
  while (laborDate.getUTCDay() !== MONDAY_INDEX) {
    laborDate.setUTCDate(laborDate.getUTCDate() + ONE);
  }

  return laborDate;
};

export const getFormattedDateString = (
  date: Date,
  showLocalTimeZone?: boolean,
  timeZone?: string,
  locale?: string
) => {
  // const date = new Date(dateValue);
  const dateLocale = locale || 'en-US';
  return date.toLocaleString(dateLocale, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: timeZone,
    timeZoneName: showLocalTimeZone ? 'short' : undefined,
  });
};

export const getBurnTime = (year: number) => {
  const BURN_HOUR_UTC = 4; // 04:00 UTC = 21:00 PDT
  const BURN_MINUTE = 23; // Burns at 21:23:23 PDT

  const burnDate = getLaborDate(year);
  burnDate.setUTCDate(burnDate.getUTCDate() - 1);
  burnDate.setUTCHours(BURN_HOUR_UTC);
  burnDate.setUTCMinutes(BURN_MINUTE);
  burnDate.setUTCSeconds(BURN_MINUTE);

  // maybe this should just return getTime() number
  return burnDate;
};

export const getBurnYear = (burnTime: number) => {
  const burnYear = new Date(burnTime).getFullYear();
  const BURN_YEAR_ZERO = 1985;
  return burnYear - BURN_YEAR_ZERO;
};

// length of early September night in Gerlach, in MS.
const NINE_HR_SIX_M_MS = 9 * 60 * 60 * 1000 + 6 * 60 * 1000;

export const isItBurnNight = (time: number) => {
  const timeDate = new Date(time);
  const calendarYearBurn = getBurnTime(timeDate.getFullYear());
  const burnTime = calendarYearBurn.getTime();
  const comeDownDawn = burnTime + NINE_HR_SIX_M_MS;

  if (time < comeDownDawn && time > burnTime) {
    return true;
  }

  return false;
};

/**
 * Figures out the Saturday before the next Labor Day,
 * relative to now, or to dateOverride value.
 *
 * @param dateOverride Date. Optional. Explicit date (instead of now) for unit testing.
 * @returns Date: when the Man will burn.
 */
export const getNextBurnTime = (dateOverride?: number) => {
  const burnDate = dateOverride ? new Date(dateOverride) : new Date();
  const currentYear = burnDate.getFullYear();
  const calendarYearBurn = getBurnTime(currentYear);

  if (burnDate < calendarYearBurn) return calendarYearBurn;

  return getBurnTime(currentYear + 1);
};

/**
 * Only gets string display object from 2 time values.
 * If 'nextBurnTime has passed, return  Burn Night state:
 * all zeroes with currentBurnYear
 * @param nextBurnTime
 * @param referenceTime
 * @param afterburnCallback function. optional. allows calling script to
 * pass a reset function that only runs after Burn night is complete,
 * because calling script controls "nextBurnTime" value.
 * @returns
 */
export const getMetricTime = (
  nextBurnTime: number,
  referenceTime: number,
  afterburnCallback?: () => void
) => {
  if (referenceTime > nextBurnTime) {
    if (afterburnCallback && !isItBurnNight(referenceTime)) {
      afterburnCallback();
    }
    return {
      // year: addLeadingZeroes(getBurnYear(nextBurnTime).toString(), 4),
      days: '000',
      hours: '00',
      minutes: '00',
      seconds: '00',
    };
  }

  const xtianMsCount = nextBurnTime - referenceTime;
  const metricSeconds = Math.floor(xtianMsCount / METRIC_SECOND_VALUE_MS);
  const metricMinutes = Math.floor(metricSeconds / 100);
  const metricHours = Math.floor(metricMinutes / 100);
  const days = Math.floor(metricHours / 10).toString();

  return {
    days: addLeadingZeroes(days, 3),
    hours: addLeadingZeroes((metricHours % 10).toString(), 2),
    minutes: addLeadingZeroes((metricMinutes % 100).toString(), 2),
    seconds: addLeadingZeroes((metricSeconds % 100).toString(), 2),
  };
};
