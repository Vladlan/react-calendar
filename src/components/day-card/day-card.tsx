import './day-card.scss';
import { cn } from '@bem-react/classname';
import React, { useContext, useState } from 'react';
import { AppContext } from '../../state';
import { EventItem, EventItemEditor } from '../event-item';
import { generateEmptyEventData } from '../../utils';

const bem = cn('DayCard');

export const DayCard = () => {
  const {
    state: {
      selectedDay: { events },
    },
  } = useContext(AppContext);
  const [isCreatingNewEvent, setIsCreatingNewEvent] = useState(false);
  return (
    <div className={bem()}>
      <ul className={bem('EventsList')}>
        {events.map((dayEvent) => {
          return <EventItem key={dayEvent.id} eventData={dayEvent} />;
        })}
        {isCreatingNewEvent && (
          <li className="EventItem">
            <EventItemEditor
              eventsSiblings={events}
              eventData={generateEmptyEventData()}
              onSave={() => {
                setIsCreatingNewEvent(false);
              }}
              onCancel={() => {
                setIsCreatingNewEvent(false);
              }}
            />
          </li>
        )}
      </ul>
      {!isCreatingNewEvent && (
        <div className={bem('AddEventBlock')}>
          <button
            className={bem('AddEventBtn')}
            onClick={() => {
              setIsCreatingNewEvent(true);
            }}
          >
            Add Event
          </button>
        </div>
      )}
    </div>
  );
};
