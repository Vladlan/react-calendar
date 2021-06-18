import { getMinutesFromEventTime } from './get-minutes-from-event-time';

describe('getMinutesFromEventTime', () => {
  it('00:30 => 30', () => {
    const mins = getMinutesFromEventTime('00:30');
    expect(mins).toEqual(30);
  })
  it('00:45 => 35', () => {
    const mins = getMinutesFromEventTime('00:45');
    expect(mins).toEqual(45);
  })
  it('01:30 => 90', () => {
    const mins = getMinutesFromEventTime('01:30');
    expect(mins).toEqual(90);
  })
  it('02:30 => 150', () => {
    const mins = getMinutesFromEventTime('02:30');
    expect(mins).toEqual(150);
  })
  it('0 => should ', () => {
    expect(() => getMinutesFromEventTime('0'))
      .toThrow('Wrong event time format');
  })
})
