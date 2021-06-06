import './event-item.scss';
import { cn } from '@bem-react/classname';
import { useContext, useState } from 'react';
import { CalendarDayEvent } from '../calendar-day';
import { ACTIONS, AppContext } from '../../state';
import { EventItemView } from './event-item-view';
import { EventItemEditor } from './event-item-editor';

const bem = cn('EventItem');

type EventItemProps = {
  eventData: CalendarDayEvent;
};

export const EventItem = ({ eventData: { id }, eventData }: EventItemProps) => {
  const [isEditing, setIsEditing] = useState(!id);
  const {
    state: { isEditingEvent },
    dispatch,
  } = useContext(AppContext);

  const deleteEvent = (id: string) => {
    dispatch({
      type: ACTIONS.DELETE_EVENT_FROM_SELECTED_DAY,
      payload: {
        eventId: id,
      },
    });
  };
  const startEditing = () => {
    dispatch({
      type: ACTIONS.START_EVENT_EDITING,
      payload: {},
    });
    setIsEditing(true);
  };
  const stopEditing = () => {
    setIsEditing(false);
    dispatch({
      type: ACTIONS.STOP_EVENT_EDITING,
      payload: {},
    });
  };
  const stopEventEditing = (id: string) => {
    if (!id) {
      deleteEvent(id);
    }
    stopEditing();
  };
  return (
    <li className={bem()} key={id}>
      {isEditing ? (
        <EventItemEditor
          eventData={eventData}
          onSave={stopEditing}
          onCancel={stopEventEditing}
        />
      ) : (
        <EventItemView
          eventData={eventData}
          isEditingEvent={isEditingEvent}
          onDeleteClick={deleteEvent}
          onEditClick={startEditing}
        />
      )}
    </li>
  );
};
