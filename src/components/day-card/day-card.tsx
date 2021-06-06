import './day-card.scss';
import { cn } from '@bem-react/classname';
import { useContext } from 'react';
import { ACTIONS, AppContext } from '../../state';
import { EventItem } from '../event-item';

const bem = cn('DayCard');

export const DayCard = () => {
  const {
    state: { selectedDay },
    dispatch,
  } = useContext(AppContext);
  const { events } = selectedDay || { events: [] };
  let hasEmptyEvent = false; // TODO: remove this
  return (
    <div className={bem()}>
      <ul className={bem('EventsList')}>
        {events.map((dayEvent) => {
          hasEmptyEvent = !dayEvent.id;
          return (
            <EventItem
              key={dayEvent.id}
              eventData={dayEvent}
              inEditing={!dayEvent.id}
            />
          );
        })}
      </ul>
      {!hasEmptyEvent && (
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
