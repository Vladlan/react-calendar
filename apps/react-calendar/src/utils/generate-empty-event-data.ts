import { CalendarDayEvent } from '../components/calendar-day';
import { EVENT_INTERVALS } from './generate-event-time-intervals';

export const generateEmptyEventData = (): CalendarDayEvent => {
  return {
    start: EVENT_INTERVALS[0],
    end: EVENT_INTERVALS[0],
    description: '',
    attendees: [],
    id: '',
  };
};
