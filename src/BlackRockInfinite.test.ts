import { getLaborDate, SEPTEMBER_INDEX } from './BlackRockInfinite';

describe('Labor Day date', () => {
  it('calculates 2021 Labor Day to be Sep. 6', () => {
    const laborDay2021 = getLaborDate(2021);
    expect(laborDay2021.getUTCDate()).toEqual(6);
    expect(laborDay2021.getUTCMonth()).toEqual(SEPTEMBER_INDEX);
  });
  it('calculates 2023 Labor Day to be Sep. 4', () => {
    const laborDay2023 = getLaborDate(2023);
    expect(laborDay2023.getUTCDate()).toEqual(4);
  });
  it('calculates 2031 Labor Day to be Sep. 1', () => {
    const laborDay2031 = getLaborDate(2031);
    expect(laborDay2031.getUTCDate()).toEqual(1);
  });
});
