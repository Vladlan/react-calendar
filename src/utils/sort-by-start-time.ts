import { getMinutesFromEventTime } from './get-minutes-from-event-time';
import { CalendarDayEvent } from '../components/calendar-day';

export const sortByStartTime = (el1: CalendarDayEvent, el2: CalendarDayEvent) =>
  getMinutesFromEventTime(el1.start) - getMinutesFromEventTime(el2.start);
