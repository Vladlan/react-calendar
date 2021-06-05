import { DateTime } from 'luxon';

export const generateCalendarData = (year: number, month: number) => {
  const selectedMonth = DateTime.fromObject({ year, month });
  const daysInMonth = selectedMonth.daysInMonth;
  const firstDayOfMonth = selectedMonth.startOf('month');
  const currMonth = [];
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
      currMonth.push(week);
      week = [];
    }
  }

  if (week.length > 0 && week.length < 7) {
    for (let k = week.length - 1; k + 1 < 7; k++) {
      week.push(week[k].plus({ days: 1 }));
    }
    currMonth.push(week);
  }
  return currMonth;
};
