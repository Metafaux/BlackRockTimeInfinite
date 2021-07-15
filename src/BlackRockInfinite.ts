const BURN_HOUR_UTC = 4; // 21:00 PDT
const MONDAY_INDEX = 1;
const BURN_DAY_UTC = 0; // Sunday 04:00 UTC / Saturday 21:00 PDT
const BURN_MINUTE = 23;
export const SEPTEMBER_INDEX = 8;

/**
 * Finds the first Monday of September
 * Then, offsets to 4am Tuesday UTC, which is 9pm Monday Pacific
 * @param year number: full year
 */
export const getLaborDate = (year: number) => {
  let laborDate = new Date(Date.UTC(year, SEPTEMBER_INDEX, 1));

  while (laborDate.getUTCDay() !== MONDAY_INDEX) {
    laborDate.setUTCDate(laborDate.getUTCDate() + 1);
  }

  return laborDate;
};

export const getFormattedDateString = (
  dateValue: number,
  showLocalTimeZone?: boolean,
  locale?: string,
  timeZone?: string
) => {
  const date = new Date(dateValue);
  const dateLocale = locale || navigator.language;
  return date.toLocaleString(dateLocale, {
    hour: '2-digit',
    minute: '2-digit',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: timeZone,
    timeZoneName: showLocalTimeZone ? 'short' : undefined,
  });
};
