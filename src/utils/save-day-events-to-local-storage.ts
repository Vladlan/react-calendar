import { getDayKey } from './get-day-key';
import { CalendarDayEvent } from '../components/calendar-day';

export const saveDayEventsToLocalStorage = (
  userId: string,
  ISOWeekDate: string,
  dayEvents: CalendarDayEvent[]
) => {
  const dayKey = getDayKey(userId, ISOWeekDate);
  localStorage.setItem(dayKey, JSON.stringify(dayEvents));
};
