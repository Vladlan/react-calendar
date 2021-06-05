import { useContext } from 'react';
import './calendar.scss';
import { Info } from 'luxon';
import { generateCalendarData } from '../../utils';
import { AppContext } from '../../state';
import { cn } from '@bem-react/classname';
import { CalendarDay } from '../calendar-day';

const bem = cn('Calendar');

export function Calendar() {
  const weekdays = Info.weekdays('long');
  const {
    state: { currentMonth, currentYear },
  } = useContext(AppContext);
  const calendarData = generateCalendarData(currentYear, currentMonth);
  return (
    <main className={bem()}>
      <div className={bem('Grid')}>
        <div className={bem('GridHeader')}>
          {weekdays.map((dayName, index) => (
            <div className={bem('GridHeaderColumn')} key={`id-wd-${index}`}>
              {dayName}
            </div>
          ))}
        </div>
        <div className={bem('GridBody')}>
          {calendarData.map((week, weekIndex) => (
            <div className={bem('GridBodyRow')} key={`id-w-${weekIndex}`}>
              {week.map((day, dayIndex) => (
                <CalendarDay key={`id-d-${dayIndex}`} dayData={day} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
