import './event-item.scss';
import { cn } from '@bem-react/classname';
import { KeyboardEvent, useContext, useState } from 'react';
import { CalendarDayEvent } from '../calendar-day';
import { ACTIONS, AppContext } from '../../state';
import { EVENT_INTERVALS, showNotification } from '../../utils';
import {
  validateAttendee,
  validateEventTime,
  validateEventDescription,
} from './utils/validation';
import { nanoid } from 'nanoid';
import { KEY_ENTER } from '../../constants';

const bem = cn('EventItem');

type EventItemEditorProps = {
  eventData: CalendarDayEvent;
  onSave: () => void;
  onCancel: (id: string) => void;
  eventsSiblings: CalendarDayEvent[];
};

export const EventItemEditor = ({
  eventData: { id, start, end, description, attendees },
  onSave,
  onCancel,
  eventsSiblings,
}: EventItemEditorProps) => {
  const [tempDescription, setTempDescription] = useState(description);
  const [tempAttendees, setTempAttendees] = useState(attendees);
  const [tempAttendee, setTempAttendee] = useState('');
  const [tempStartTime, setTempStartTime] = useState(start);
  const [tempEndTime, setTempEndTime] = useState(end);
  const { dispatch } = useContext(AppContext);
  const addTempAttendee = () => {
    const attendeeEmailValidationErrMsg = validateAttendee(
      tempAttendee,
      tempAttendees
    );
    if (attendeeEmailValidationErrMsg) {
      showNotification(dispatch, attendeeEmailValidationErrMsg);
      return;
    }
    setTempAttendees([...tempAttendees, tempAttendee]);
    setTempAttendee('');
  };
  const addAttendeeOnEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === KEY_ENTER) {
      addTempAttendee();
    }
  };

  const saveEvent = () => {
    const descriptionValidationErrMsg =
      validateEventDescription(tempDescription);
    if (descriptionValidationErrMsg) {
      showNotification(dispatch, descriptionValidationErrMsg);
      return;
    }
    const eventTimeValidationErrMsg = validateEventTime(
      tempStartTime,
      tempEndTime,
      eventsSiblings.filter((ev) => ev.id !== id)
    );
    if (eventTimeValidationErrMsg) {
      showNotification(dispatch, eventTimeValidationErrMsg);
      return;
    }

    const newEvent = {
      description: tempDescription,
      attendees: tempAttendees,
      start: tempStartTime,
      end: tempEndTime,
      id,
    };
    if (id) {
      dispatch({
        type: ACTIONS.UPDATE_SELECTED_DAY_EVENTS,
        payload: newEvent,
      });
    } else {
      dispatch({
        type: ACTIONS.ADD_NEW_EVENT_FOR_SELECTED_DAY_EVENTS,
        payload: { ...newEvent, id: nanoid() },
      });
    }
    onSave();
  };

  const stopEditingEvent = () => {
    onCancel(id);
  };
  return (
    <>
      <div className={bem('TimeContainer', { editing: true })}>
        <div className={bem('EventStart')}>
          <label
            htmlFor="event-description"
            className={bem('DescriptionFormTitle')}
          >
            Start time:
          </label>
          <select
            value={tempStartTime}
            onChange={(e) => {
              setTempStartTime(e.target.value);
            }}
          >
            {EVENT_INTERVALS.map((el, index) => (
              <option key={`id-ev-start-${index}`} value={el}>
                {el}
              </option>
            ))}
          </select>
        </div>
        <div className={bem('EventEnd')}>
          <label
            htmlFor="event-description"
            className={bem('DescriptionFormTitle')}
          >
            End time:
          </label>
          <select
            value={tempEndTime}
            onChange={(e) => {
              setTempEndTime(e.target.value);
            }}
          >
            {EVENT_INTERVALS.map((el, index) => (
              <option key={`id-ev-end-${index}`} value={el}>
                {el}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={bem('EventInfoContainer', { editing: true })}>
        <div className={bem('DescriptionForm')}>
          <label
            htmlFor="event-description"
            className={bem('DescriptionFormTitle')}
          >
            Description:
          </label>
          <textarea
            value={tempDescription}
            id="event-description"
            onChange={(e) => {
              setTempDescription(e.target.value);
            }}
          />
        </div>
        <div className={bem('DescriptionForm')}>
          <label
            htmlFor="event-description"
            className={bem('DescriptionFormTitle')}
          >
            Attendee email:
          </label>
          <div className={bem('AddAttendeeInputContainer')}>
            <input
              className={bem('AddAttendeeInput')}
              value={tempAttendee}
              id="event-attendee"
              type="email"
              placeholder="attendee@mail.com"
              onKeyPress={(e) => addAttendeeOnEnterPress(e)}
              onChange={(e) => {
                setTempAttendee(e.target.value.toLowerCase().trim());
              }}
            />
            <button
              className={bem('AddAttendeeBtn')}
              onClick={() => {
                addTempAttendee();
              }}
            >
              Add
            </button>
          </div>
        </div>
        <div className={bem('AttendeesContainer')}>
          <h5 className={bem('AttendeesTitle')}>Attendees:</h5>
          <ul className={bem('Attendees')}>
            {tempAttendees.map((el, index) => (
              <li
                className={bem('Attendee', { deletable: true })}
                key={`id-att-${index}`}
              >
                <span>{el}</span>
                <button
                  className={bem('DeleteAttendeeBtn')}
                  onClick={() => {
                    setTempAttendees(tempAttendees.filter((att) => att !== el));
                  }}
                >
                  <span>🞩</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={bem('EditContainer')}>
        <button className={bem('EditContainerBtn')} onClick={saveEvent}>
          Save
        </button>
      </div>
      <div className={bem('EditContainer')}>
        <button className={bem('EditContainerBtn')} onClick={stopEditingEvent}>
          Cancel
        </button>
      </div>
    </>
  );
};
