import { DateTime } from 'luxon';

const events = [
  {
    start: '12:00',
    end: '13:00',
    description: 'Some Long Event Description Bla Bla',
    attendees: ['att1@m.com', 'att2@m.com', 'att3@m.com', 'att4@m.com'],
    id: 'id-1',
  },
  {
    start: '13:00',
    end: '14:00',
    description: 'Some Long Event Description Bla Bla',
    attendees: ['att1@m.com', 'att2@m.com', 'att3@m.com', 'att4@m.com'],
    id: 'id-2',
  },
  {
    start: '14:00',
    end: '15:00',
    description: 'Some Long Event Description Bla Bla',
    attendees: ['att1@m.com', 'att2@m.com', 'att3@m.com', 'att4@m.com'],
    id: 'id-3',
  },
  {
    start: '15:00',
    end: '16:00',
    description: 'Some Long Event Description Bla Bla',
    attendees: ['att1@m.com', 'att2@m.com', 'att3@m.com', 'att4@m.com'],
    id: 'id-4',
  },
  {
    start: '16:00',
    end: '17:00',
    description: 'Some Long Event Description Bla Bla',
    attendees: ['att1@m.com', 'att2@m.com', 'att3@m.com', 'att4@m.com'],
    id: 'id-5',
  },
  {
    start: '17:00',
    end: '18:00',
    description: 'Some Long Event Description Bla Bla',
    attendees: ['att1@m.com', 'att2@m.com', 'att3@m.com', 'att4@m.com'],
    id: 'id-6',
  },
];

const isTodaysMonth = (dtDay: DateTime) => {
  return DateTime.now().month === dtDay.month;
};

const isToday = (dtDay: DateTime) => {
  return DateTime.now().toISOWeekDate() === dtDay.toISOWeekDate();
};

const formatWeek = (week: DateTime[]) => {
  return week.map((el) => {
    return {
      day: el.day,
      month: el.month,
      year: el.year,
      isToday: isToday(el),
      isTodaysMonth: isTodaysMonth(el),
      events,
    };
  });
};

export const generateCalendarData = (year: number, month: number) => {
  console.log(`generateCalendarData: `);
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
      currMonth.push(formatWeek(week));
      week = [];
    }
  }

  if (week.length > 0 && week.length < 7) {
    for (let k = week.length - 1; k + 1 < 7; k++) {
      week.push(week[k].plus({ days: 1 }));
    }
    currMonth.push(formatWeek(week));
  }
  return currMonth;
};
