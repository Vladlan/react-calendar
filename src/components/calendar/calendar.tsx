import { useContext, useState } from 'react';
import './calendar.scss';
import { DateTime, Info } from 'luxon';
import { saveDayEventsToLocalStorage } from '../../utils';
import { ACTIONS, AppContext } from '../../state';
import { cn } from '@bem-react/classname';
import { CalendarDay, CalendarDayData } from '../calendar-day';
import { Modal } from '../modal';
import { DayCard } from '../day-card';

const bem = cn('Calendar');

export function Calendar() {
  const weekdays = Info.weekdays('long');
  const {
    state: {
      selectedDay,
      currentUser,
      calendarData,
      currentYear,
      currentMonth,
    },
    dispatch,
  } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);

  const { day, month } = selectedDay || { day: 1, month: 1 };
  const modalTitle = `${day} ${DateTime.fromObject({ month }).monthLong}`;

  const updateDay = () => {
    const { month, day } = selectedDay;
    const editedDayWeekISO = DateTime.fromObject({
      month,
      day,
    }).toISOWeekDate();
    saveDayEventsToLocalStorage(
      currentUser,
      editedDayWeekISO,
      selectedDay.events.filter((el) => el.id)
    );
    dispatch({
      type: ACTIONS.UPDATE_CALENDAR_DATA,
      payload: {
        year: currentYear,
        month: currentMonth,
      },
    });
    dispatch({
      type: ACTIONS.STOP_EVENT_EDITING,
      payload: {},
    });
    setShowModal(false);
  };

  const showModalWithDayData = (day: CalendarDayData) => {
    setShowModal(true);
    dispatch({
      type: ACTIONS.SET_SELECTED_DAY,
      payload: {
        selectedDay: day,
      },
    });
  };

  const closeModal = () => {
    setShowModal(false);
    dispatch({
      type: ACTIONS.STOP_EVENT_EDITING,
      payload: {},
    });
  };
  return (
    <main className={bem()}>
      {showModal && (
        <Modal
          title={modalTitle}
          onSubmit={updateDay}
          onClose={closeModal}
          show={showModal}
        >
          <DayCard />
        </Modal>
      )}
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
