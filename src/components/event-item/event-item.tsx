import './event-item.scss';
import React, { useContext, useState } from 'react';
import { CalendarDayEvent } from '../calendar-day';
import { ACTIONS, AppContext } from '../../state';
import { EventItemView } from './event-item-view';
import { EventItemEditor } from './event-item-editor';
import { DateTime } from 'luxon';
import { saveDayEventsToLocalStorage } from '../../utils';

type EventItemProps = {
  eventData: CalendarDayEvent;
};

export const EventItem = ({ eventData: { id }, eventData }: EventItemProps) => {
  const [isEditing, setIsEditing] = useState(!id);
  const {
    state: {
      selectedDay: { day, month, year, events },
      currentUser,
      currentYear,
      currentMonth,
    },
    dispatch,
  } = useContext(AppContext);
  const explicitEventDate = DateTime.local(year, month, day, 0, 0).toFormat(
    'DDDD ZZZZ'
  );

  const deleteEvent = (id: string) => {
    dispatch({
      type: ACTIONS.DELETE_EVENT_FROM_SELECTED_DAY,
      payload: {
        eventId: id,
      },
    });
    const editedDayWeekISO = DateTime.fromObject({
      month,
      day,
    }).toISOWeekDate();
    saveDayEventsToLocalStorage(currentUser, editedDayWeekISO, [
      ...events.filter((ev) => ev.id !== id),
    ]);
    dispatch({
      type: ACTIONS.UPDATE_CALENDAR_DATA,
      payload: {
        year: currentYear,
        month: currentMonth,
      },
    });
  };

  const startEditing = () => {
    setIsEditing(true);
  };
  const stopEditing = () => {
    setIsEditing(false);
  };
  return (
    <li className="EventItem" key={id}>
      {isEditing ? (
        <EventItemEditor
          eventsSiblings={events}
          eventData={eventData}
          onSave={stopEditing}
          onCancel={stopEditing}
        />
      ) : (
        <EventItemView
          explicitEventDate={explicitEventDate}
          eventData={eventData}
          onDeleteClick={deleteEvent}
          onEditClick={startEditing}
        />
      )}
    </li>
  );
};
