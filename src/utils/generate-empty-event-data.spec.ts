import { generateEmptyEventData } from './generate-empty-event-data';
import { EVENT_INTERVALS } from './generate-event-time-intervals';

describe('generateEmptyEventData', () => {
  it('should generateEmptyEventData', () => {
    const emptyEventObject = generateEmptyEventData();
    expect(emptyEventObject.id).toEqual('');
    expect(emptyEventObject.description).toEqual('');
    expect(emptyEventObject.attendees.length).toEqual(0);
    expect(emptyEventObject.start).toEqual(EVENT_INTERVALS[0]);
    expect(emptyEventObject.end).toEqual(EVENT_INTERVALS[0]);
  })
})
