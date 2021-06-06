import './day-card.scss';
import { cn } from '@bem-react/classname';
import { useContext } from 'react';
import { ACTIONS, AppContext } from '../../state';
import { EventItem } from '../event-item';

const bem = cn('DayCard');

export const DayCard = () => {
  const {
    state: { selectedDay, isEditingEvent },
    dispatch,
  } = useContext(AppContext);
  const { events } = selectedDay;
  return (
    <div className={bem()}>
      <ul className={bem('EventsList')}>
        {events.map((dayEvent) => {
          return <EventItem key={dayEvent.id} eventData={dayEvent} />;
        })}
      </ul>
      {!isEditingEvent && (
        <div className={bem('AddEventBlock')}>
          <button
            className={bem('AddEventBtn')}
            onClick={() => {
              dispatch({
                type: ACTIONS.ADD_EMPTY_EVENT_FOR_SELECTED_DAY_EVENTS,
                payload: {},
              });
            }}
          >
            Add Event
          </button>
        </div>
      )}
    </div>
  );
};
