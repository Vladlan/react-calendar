import { getMinutesFromEventStartTime } from './get-minutes-from-event-start-time';
import { CalendarDayEvent } from '../components/calendar-day';

export const sortByStartTime = (el1: CalendarDayEvent, el2: CalendarDayEvent) =>
  getMinutesFromEventStartTime(el1.start) -
  getMinutesFromEventStartTime(el2.start);
