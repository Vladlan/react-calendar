import { useContext, useState } from 'react';
import './calendar.scss';
import { DateTime, Info } from 'luxon';
import { generateCalendarData } from '../../utils';
import { AppContext } from '../../state';
import { cn } from '@bem-react/classname';
import { CalendarDay, CalendarDayData } from '../calendar-day';
import { Modal } from '../modal';
import { DayCard } from '../day-card';

const bem = cn('Calendar');

export function Calendar() {
  const weekdays = Info.weekdays('long');
  const {
    state: { currentMonth, currentYear },
  } = useContext(AppContext);
  const calendarData = generateCalendarData(currentYear, currentMonth);
  const [showModal, setShow] = useState(false);
  const [modalContext, setModalContext] = useState<CalendarDayData>({
    day: 1,
    month: 1,
    year: 1971,
    isToday: false,
    isTodaysMonth: false,
    events: [],
  });
  const modalTitle = `${modalContext.day} ${
    DateTime.fromObject({ month: modalContext.month }).monthLong
  }`;
  return (
    <main className={bem()}>
      {showModal && (
        <Modal
          title={modalTitle}
          onClose={() => setShow(false)}
          show={showModal}
        >
          <DayCard dayData={modalContext} />
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
                  onClick={() => {
                    setShow(true);
                    setModalContext(day);
                    console.log(`click: `);
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
