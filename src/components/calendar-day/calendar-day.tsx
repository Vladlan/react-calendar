import { FC, memo } from 'react';
import './calendar-day.scss';
import { cn } from '@bem-react/classname';

const bem = cn('CalendarDay');

interface CalendarDayEvent {
  start: string;
  end: string;
  description: string;
  attendees: string[];
  id: string;
}

export interface CalendarDayData {
  day: number;
  month: number;
  year: number;
  isToday: boolean;
  isTodaysMonth: boolean;
  events: CalendarDayEvent[];
}

type CalendarDayProps = {
  dayData: CalendarDayData;
  onClick: () => void;
};

export const CalendarDay: FC<CalendarDayProps> = memo(
  ({ dayData, onClick }) => {
    const { day, month, year, isTodaysMonth, isToday, events } = dayData;
    return (
      <div
        className={`
                  ${bem({
                    today: isToday,
                    outOfMonth: !isTodaysMonth,
                  })}`}
        onClick={onClick}
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
  }
);
