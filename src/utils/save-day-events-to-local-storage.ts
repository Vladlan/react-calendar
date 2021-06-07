import { getDayKey } from './get-day-key';
import { CalendarDayEvent } from '../components/calendar-day';

export const saveDayEventsToLocalStorage = (
  userId: string,
  ISOWeekDate: string,
  dayEvents: CalendarDayEvent[]
) => {
  if (!dayEvents) return;
  const dayKey = getDayKey(userId, ISOWeekDate);
  if (dayEvents.length) {
    localStorage.setItem(dayKey, JSON.stringify(dayEvents));
  } else {
    localStorage.removeItem(dayKey);
  }
};
