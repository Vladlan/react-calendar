import { FC } from 'react';
import './calendar-day.scss';
import { cn } from '@bem-react/classname';

const bem = cn('CalendarDay');

interface CalendarDayData {
  day: number;
  month: number;
  year: number;
  isToday: boolean;
  isTodaysMonth: boolean;
}

type CalendarDayProps = {
  dayData: CalendarDayData;
};

export const CalendarDay: FC<CalendarDayProps> = ({ dayData }) => {
  const events = [
    {
      start: '12:00',
      end: '',
      description: 'Some Long Event Description Bla Bla',
      attendees: ['att1@m.com', 'att2@m.com', 'att3@m.com', 'att4@m.com'],
    },
    {
      start: '13:00',
      end: '',
      description: 'Some Long Event Description Bla Bla',
      attendees: ['att1@m.com', 'att2@m.com', 'att3@m.com', 'att4@m.com'],
    },
    {
      start: '14:00',
      end: '',
      description: 'Some Long Event Description Bla Bla',
      attendees: ['att1@m.com', 'att2@m.com', 'att3@m.com', 'att4@m.com'],
    },
    {
      start: '15:00',
      end: '',
      description: 'Some Long Event Description Bla Bla',
      attendees: ['att1@m.com', 'att2@m.com', 'att3@m.com', 'att4@m.com'],
    },
    {
      start: '16:00',
      end: '',
      description: 'Some Long Event Description Bla Bla',
      attendees: ['att1@m.com', 'att2@m.com', 'att3@m.com', 'att4@m.com'],
    },
    {
      start: '17:00',
      end: '',
      description: 'Some Long Event Description Bla Bla',
      attendees: ['att1@m.com', 'att2@m.com', 'att3@m.com', 'att4@m.com'],
    },
  ];
  const { day, month, year, isTodaysMonth, isToday } = dayData;
  return (
    <div
      className={`
                  ${bem({
                    today: isToday,
                    outOfMonth: !isTodaysMonth,
                  })}`}
    >
      <div className={bem('Number')}>{day}</div>
      <ul className={bem('EventsList')}>
        {events
          .map((dayEvent, index) => {
            return (
              <li
                key={`id-${year}-${month}-${day}-ev-${index}`}
                className={bem('EventItem')}
              >
                <span className={bem('EventDescription')}>
                  {dayEvent.start} {dayEvent.description}
                </span>
              </li>
            );
          })
          .slice(0, 4)}
        {events.length > 4 && (
          <li className={bem('EventItem')}>{events.length - 4} more</li>
        )}
      </ul>
    </div>
  );
};
