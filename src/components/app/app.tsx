import React from 'react';
import './app.scss';
import { DateTime, Info, Settings } from 'luxon';
import { generateCalendarData } from '../../utils';
import { APP_DEFAULT_LOCALE } from '../../constants';

export function App() {
  Settings.defaultLocale = APP_DEFAULT_LOCALE;
  const currentDate = DateTime.now();
  const weekdays = Info.weekdays('long');
  const calendarData = generateCalendarData(
    currentDate.year,
    currentDate.month
  );
  return (
    <div className="App">
      <header className="App__header">
        <h1 className="App__logo">React Calendar</h1>
        <div className="App__calendar-switcher">
          <button className="App__calendar-switcher-btn">{'<'}</button>
          <span className="App__calendar-switcher-month">
            {currentDate.monthLong}
          </span>
          <span className="App__calendar-switcher-year">
            {currentDate.year}
          </span>
          <button className="App__calendar-switcher-btn">{'>'}</button>
        </div>
      </header>
      <main className="App__main">
        <div className="App__grid">
          <div className="App__grid-header">
            {weekdays.map((dayName, index) => (
              <div className="App__grid-header-column" key={`id-wd-${index}`}>
                {dayName}
              </div>
            ))}
          </div>
          <div className="App__grid-body">
            {calendarData.map((week, weekIndex) => (
              <div className="App__grid-body-row" key={`id-w-${weekIndex}`}>
                {week.map((day, dayIndex) => (
                  <div
                    className="App__grid-body-row-cell"
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
    </div>
  );
}
