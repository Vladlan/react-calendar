import { CalendarDayEvent } from '../components/calendar-day';

export const generateEmptyEventData = (): CalendarDayEvent => {
  return {
    start: '',
    end: '',
    description: '',
    attendees: [],
    id: '',
  };
};
