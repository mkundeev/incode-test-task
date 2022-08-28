import { changeColorOnValue, dateToLocalTime } from './data-formatin';

describe('changeColorOnValue', () => {
  test('should return color:green', () => {
    expect(changeColorOnValue(1)).toEqual({ color: 'green' });
    expect(changeColorOnValue(0)).toEqual({ color: 'green' });
  });

  test('should return color:red', () => {
    expect(changeColorOnValue(-1)).toEqual({ color: 'red' });
    expect(changeColorOnValue(0)).not.toEqual({ color: 'red' });
  });
});

describe('dateToLocalTime', () => {
  test('should retern time in correct format', () => {
    expect(dateToLocalTime('2022-08-28T08:00:22.000Z')).toBe('11:00:22');
  });
});
