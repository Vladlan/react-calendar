import React, { useContext, useState } from 'react';
import './calendar.scss';
import { DateTime, Info } from 'luxon';
import { ACTIONS, AppContext } from '../../state';
import { cn } from '@bem-react/classname';
import { CalendarDay, CalendarDayData } from '../calendar-day';
import { Modal } from '../modal';
import { DayCard } from '../day-card';

const bem = cn('Calendar');

export function Calendar() {
  const weekdays = Info.weekdays('long');
  const {
    state: { selectedDay, calendarData },
    dispatch,
  } = useContext(AppContext);
  const [isModalShown, setIsModalShown] = useState(false);

  const { day, month } = selectedDay;
  const modalTitle = `${day} ${DateTime.fromObject({ month }).monthLong}`;

  const showModalWithDayData = (day: CalendarDayData) => {
    dispatch({
      type: ACTIONS.SET_SELECTED_DAY,
      payload: day,
    });
    setIsModalShown(true);
  };

  const closeModal = () => {
    setIsModalShown(false);
  };
  return (
    <main className={bem()}>
      <Modal title={modalTitle} onClose={closeModal} isShown={isModalShown}>
        <DayCard />
      </Modal>
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
                <CalendarDay
                  key={`id-d-${dayIndex}`}
                  dayData={day}
                  onClick={() => showModalWithDayData(day)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
