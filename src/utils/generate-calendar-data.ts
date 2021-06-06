import { DateTime } from 'luxon';
import { getDayEventsFromLocalStorage } from './get-day-events-from-local-storage';
import { CalendarDayData } from '../components/calendar-day';

const isTodaysMonth = (dtDay: DateTime) => {
  return DateTime.now().month === dtDay.month;
};

const isToday = (dtDay: DateTime) => {
  return DateTime.now().toISOWeekDate() === dtDay.toISOWeekDate();
};

const formatWeek = (week: DateTime[], userId: string): CalendarDayData[] => {
  return week.map((el) => {
    const ISOWeekDay = el.toISOWeekDate();
    return {
      day: el.day,
      month: el.month,
      year: el.year,
      isToday: isToday(el),
      isTodaysMonth: isTodaysMonth(el),
      events: getDayEventsFromLocalStorage(userId, ISOWeekDay),
    };
  });
};

export const generateCalendarData = (
  year: number,
  month: number,
  userId: string
): CalendarDayData[][] => {
  const selectedMonth = DateTime.fromObject({ year, month });
  const daysInMonth = selectedMonth.daysInMonth;
  const firstDayOfMonth = selectedMonth.startOf('month');
  const currMonthData = [];
  let week = [];
  for (let i = 0; i < daysInMonth; i++) {
    const day = firstDayOfMonth.plus({ days: i });
    if (day.weekday === 7) {
      week.push(day);
      if (week.length < 7) {
        for (let j = 7 - week.length; j !== 0; j--) {
          week.unshift(week[0].minus({ days: 1 }));
        }
      }
    } else {
      week.push(day);
    }
    if (week.length === 7) {
      currMonthData.push(formatWeek(week, userId));
      week = [];
    }
  }

  if (week.length > 0 && week.length < 7) {
    for (let k = week.length - 1; k + 1 < 7; k++) {
      week.push(week[k].plus({ days: 1 }));
    }
    currMonthData.push(formatWeek(week, userId));
  }
  return currMonthData;
};
