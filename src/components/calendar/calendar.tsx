import React from 'react';
import './calendar.scss';
import { Info } from 'luxon';
import { generateCalendarData } from '../../utils';
import { AppContext } from '../../state';

export function Calendar() {
  const weekdays = Info.weekdays('long');
  const {
    state: { currentMonth, currentYear },
  } = React.useContext(AppContext);
  const calendarData = generateCalendarData(currentYear, currentMonth);
  return (
    <main className="Calendar">
      <div className="Calendar__grid">
        <div className="Calendar__grid-header">
          {weekdays.map((dayName, index) => (
            <div
              className="Calendar__grid-header-column"
              key={`id-wd-${index}`}
            >
              {dayName}
            </div>
          ))}
        </div>
        <div className="Calendar__grid-body">
          {calendarData.map((week, weekIndex) => (
            <div className="Calendar__grid-body-row" key={`id-w-${weekIndex}`}>
              {week.map((day, dayIndex) => (
                <div
                  className="Calendar__grid-body-row-cell"
                  key={`id-d-${dayIndex}`}
                >
                  <div>{day.day}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
