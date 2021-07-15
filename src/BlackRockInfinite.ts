const defaults = {
  BURN_YEAR_ZERO: 1985,
  TIME_UNIT: 864, // milliseconds
  UTC_PACIFIC_OFFSET: 7,
  BURN_HOUR_PDT: 21,
  BURN_HOUR_UTC: (BURN_HOUR_PDT + UTC_PACIFIC_OFFSET) % 24,
}

enum timeDisplayElement {
  DAYS = 'days',
  HOURS = 'hours',
  MINUTES = 'minutes',
  SECONDS = 'seconds',
}