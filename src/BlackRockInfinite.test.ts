import {
  getLaborDate,
  getBurnTime,
  addLeadingZeroes,
  getFormattedDateString,
  getNextBurnTime,
  getMetricTime,
  isItBurnNight,
  getBurnYear,
} from './BlackRockInfinite';

const pacificTimeZone = 'America/Los_Angeles';

describe('Labor Day date', () => {
  it('calculates 2021 Labor Day to be Sep. 6', () => {
    const laborDay2021 = getLaborDate(2021);
    expect(laborDay2021.getUTCDate()).toEqual(6);
    expect(laborDay2021.getUTCMonth()).toEqual(8);
  });
  it('calculates 2023 Labor Day to be Sep. 4', () => {
    const laborDay2023 = getLaborDate(2023);
    expect(laborDay2023.getUTCDate()).toEqual(4);
  });
  it('calculates 2024 Labor Day to be Sep. 2', () => {
    const laborDay2024 = getLaborDate(2024);
    expect(laborDay2024.getUTCDate()).toEqual(2);
  });
  it('calculates 2031 Labor Day to be Sep. 1', () => {
    const laborDay2031 = getLaborDate(2031);
    expect(laborDay2031.getUTCDate()).toEqual(1);
  });
  it('calculates 2032 Labor Day to be Sep. 6', () => {
    const laborDay2032 = getLaborDate(2032);
    expect(laborDay2032.getUTCDate()).toEqual(6);
  });
  it('calculates 2033 Labor Day to be Sep. 5', () => {
    const laborDay2033 = getLaborDate(2033);
    expect(laborDay2033.getUTCDate()).toEqual(5);
  });
});

describe('Burn time', () => {
  it('calculates 2021 Burn to happen Sep. 4, 09:23:23 PM PDT', () => {
    const burnTime = getBurnTime(2021);
    const formattedPacificDate = getFormattedDateString(
      burnTime,
      true,
      pacificTimeZone
    );
    expect(formattedPacificDate).toEqual('Sep 4, 2021, 09:23:23 PM PDT');
  });
  it('calculates 2024 Burn to happen Aug 31, 09:23:23 PM PDT', () => {
    const burnTime = getBurnTime(2024);
    const formattedPacificDate = getFormattedDateString(
      burnTime,
      true,
      pacificTimeZone
    );
    expect(formattedPacificDate).toEqual('Aug 31, 2024, 09:23:23 PM PDT');
  });
  it('calculates 2031 Burn to happen Aug 30, 09:23:23 PM PDT', () => {
    const burnTime = getBurnTime(2031);
    const formattedPacificDate = getFormattedDateString(
      burnTime,
      true,
      pacificTimeZone
    );
    expect(formattedPacificDate).toEqual('Aug 30, 2031, 09:23:23 PM PDT');
  });
  it('calculates the next burn after Sep 1, 2023', () => {
    const sep2date = Date.UTC(2023, 8, 1);
    const nextBurn = getNextBurnTime(sep2date);
    const formattedPacificDate = getFormattedDateString(
      nextBurn,
      true,
      pacificTimeZone
    );
    expect(formattedPacificDate).toEqual('Sep 2, 2023, 09:23:23 PM PDT');
  });
  it('calculates the next burn after Sep 2, 2023, 9:23:24 PM PDT', () => {
    const sep2date = Date.UTC(2023, 8, 3, 4, 23, 24);
    const nextBurn = getNextBurnTime(sep2date);
    const formattedPacificDate = getFormattedDateString(
      nextBurn,
      true,
      pacificTimeZone
    );
    expect(formattedPacificDate).toEqual('Aug 31, 2024, 09:23:23 PM PDT');
  });
  it('shows the time left from 9:23:23 AM PDT July 16, 2021 to be 050:05:00:00', () => {
    const july16date = Date.UTC(2021, 6, 16, 16, 23, 23);
    const burnDate = getNextBurnTime(july16date);
    const metricTimeObj = getMetricTime(burnDate.getTime(), july16date);
    expect(metricTimeObj.days).toEqual('050');
    expect(metricTimeObj.hours).toEqual('05');
    expect(metricTimeObj.minutes).toEqual('00');
    expect(metricTimeObj.seconds).toEqual('00');
  });
});

describe('Burn night', () => {
  it('shows that Sep. 4, 2021, 21:23:22 PDT is NOT during Burn Night', () => {
    const sep4night = Date.UTC(2021, 8, 5, 4, 23, 22);
    const isBurnNight = isItBurnNight(sep4night, getBurnTime(2021).getTime());
    const formattedPacificDate = getFormattedDateString(
      new Date(sep4night),
      true,
      pacificTimeZone
    );
    expect(isBurnNight).toEqual(false);
    expect(formattedPacificDate).toEqual('Sep 4, 2021, 09:23:22 PM PDT');
  });
  it('shows that Sep. 4, 2021, 21:23:24 PDT is during Burn Night', () => {
    const sep4night = Date.UTC(2021, 8, 5, 4, 23, 24);
    const isBurnNight = isItBurnNight(sep4night, getBurnTime(2021).getTime());
    const formattedPacificDate = getFormattedDateString(
      new Date(sep4night),
      true,
      pacificTimeZone
    );
    expect(isBurnNight).toEqual(true);
    expect(formattedPacificDate).toEqual('Sep 4, 2021, 09:23:24 PM PDT');
  });
  it('shows that Sep. 5, 2021, 06:29:22 PDT is during Burn Night', () => {
    const sep4night = Date.UTC(2021, 8, 5, 13, 29, 22);
    const isBurnNight = isItBurnNight(sep4night, getBurnTime(2021).getTime());
    const formattedPacificDate = getFormattedDateString(
      new Date(sep4night),
      true,
      pacificTimeZone
    );
    expect(isBurnNight).toEqual(true);
    expect(formattedPacificDate).toEqual('Sep 5, 2021, 06:29:22 AM PDT');
  });
  it('shows that Sep. 5, 2021, 06:29:24 PDT is NOT during Burn Night', () => {
    const sep4night = Date.UTC(2021, 8, 5, 13, 29, 24);
    const isBurnNight = isItBurnNight(sep4night, getBurnTime(2021).getTime());
    const formattedPacificDate = getFormattedDateString(
      new Date(sep4night),
      true,
      pacificTimeZone
    );
    expect(isBurnNight).toEqual(false);
    expect(formattedPacificDate).toEqual('Sep 5, 2021, 06:29:24 AM PDT');
  });
  it('gets the correct data during Burn night 2033', () => {
    const burnTime2033 = getBurnTime(2033).getTime();
    let burnTime = burnTime2033;
    const referenceTime = Date.UTC(2033, 8, 4, 4, 23, 24);
    const initTime = () => {
      burnTime = getBurnTime(2034).getTime();
    };
    const metricTime = getMetricTime(burnTime, referenceTime, initTime);
    expect(burnTime).toEqual(burnTime2033);
    expect(metricTime.days).toEqual('000');
    expect(metricTime.hours).toEqual('00');
    expect(metricTime.minutes).toEqual('00');
    expect(metricTime.seconds).toEqual('00');
  });
  it('initializes 2034 clock after Burn Night 2033', () => {
    const burnTime2033 = getBurnTime(2033).getTime();
    const burnTime2034 = getBurnTime(2034).getTime();
    let burnTime = burnTime2033;
    const referenceTime = Date.UTC(2033, 8, 5, 4, 23, 23);
    const initTime = () => {
      burnTime = burnTime2034;
    };
    // first getMetricTime triggers the callback
    const metricTime = getMetricTime(burnTime, referenceTime, initTime);
    // next "tick" returns updated time for new year
    const metricTime2 = getMetricTime(burnTime, referenceTime, initTime);
    const newBurnYear = new Date(burnTime).getFullYear();
    expect(burnTime).toEqual(burnTime2034);
    expect(metricTime2.days).toEqual('363');
    expect(metricTime2.hours).toEqual('00');
    expect(metricTime2.minutes).toEqual('00');
    expect(metricTime2.seconds).toEqual('00');
    expect(newBurnYear).toEqual(2034);
  });
  it('calculates Sep. 4, 2021 21:23:24 PDT to be Cycle 36', () => {
    const sep4night = Date.UTC(2021, 8, 5, 4, 23, 24);
    const cycle = getBurnYear(sep4night);
    const formattedPacificDate = getFormattedDateString(
      new Date(sep4night),
      true,
      pacificTimeZone
    );
    expect(cycle).toEqual(36);
    expect(formattedPacificDate).toEqual('Sep 4, 2021, 09:23:24 PM PDT');
  });
  it('calculates Sep. 5, 2021 06:29:22 PDT to be Cycle 36', () => {
    const sep4night = Date.UTC(2021, 8, 5, 13, 29, 22);
    const cycle = getBurnYear(sep4night);
    const formattedPacificDate = getFormattedDateString(
      new Date(sep4night),
      true,
      pacificTimeZone
    );
    expect(cycle).toEqual(36);
    expect(formattedPacificDate).toEqual('Sep 5, 2021, 06:29:22 AM PDT');
  });
  it('calculates Sep. 5, 2021 06:29:24 PDT to be Cycle 37', () => {
    const sep4night = Date.UTC(2021, 8, 5, 13, 29, 24);
    const cycle = getBurnYear(sep4night);
    const formattedPacificDate = getFormattedDateString(
      new Date(sep4night),
      true,
      pacificTimeZone
    );
    expect(cycle).toEqual(37);
    expect(formattedPacificDate).toEqual('Sep 5, 2021, 06:29:24 AM PDT');
  });
});

describe('date + time string formatting', () => {
  it('adds five leading zeroes to number 3', () => {
    const formattedNumber = addLeadingZeroes('3', 6);
    expect(formattedNumber).toEqual('000003');
  });
  it('adds no leading zeroes to number 1074', () => {
    const formattedNumber = addLeadingZeroes('1074', 4);
    expect(formattedNumber).toEqual('1074');
  });
});
