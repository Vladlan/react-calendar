import { getDayKey } from './get-day-key';

export const getDayEventsFromLocalStorage = (
  userId: string,
  ISOWeekDate: string
) => {
  const rawSavedEvents = localStorage.getItem(getDayKey(userId, ISOWeekDate));
  try {
    const savedEvents =
      rawSavedEvents && rawSavedEvents !== 'undefined'
        ? JSON.parse(rawSavedEvents)
        : [];
    return Array.isArray(savedEvents) ? savedEvents : [];
  } catch (err) {
    return [];
  }
};
