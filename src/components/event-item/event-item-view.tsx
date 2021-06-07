import './event-item.scss';
import { cn } from '@bem-react/classname';
import { CalendarDayEvent } from '../calendar-day';
import { memo } from 'react';

const bem = cn('EventItem');

type EventItemViewProps = {
  eventData: CalendarDayEvent;
  onEditClick: () => void;
  onDeleteClick: (id: string) => void;
  explicitEventDate: string;
};

export const EventItemView = memo(
  ({
    eventData: { id, start, end, description, attendees },
    onEditClick,
    onDeleteClick,
    explicitEventDate,
  }: EventItemViewProps) => {
    return (
      <>
        <div className={bem('TimeContainer')}>
          <div className={bem('EventStart')}>{start}</div>
          <div className={bem('EventEnd')}>{end}</div>
        </div>
        <div className={bem('EventInfoContainer')}>
          <p className={bem('EventDescription')}>{description}</p>
          {!!attendees.length && (
            <>
              <h5 className={bem('AttendeesTitle')}>Attendees:</h5>
              <ul className={bem('Attendees')}>
                {attendees.map((el, index) => (
                  <li className={bem('Attendee')} key={`id-att-${index}`}>
                    <a
                      href={`mailto:${el}?subject=${description}&body=At ${explicitEventDate} from ${start} to ${end}`}
                      key={el}
                    >
                      {el}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className={bem('EditContainer')}>
          <button
            className={bem('EditContainerBtn')}
            onClick={() => {
              onEditClick();
            }}
          >
            Edit
          </button>
          <button
            className={bem('EditContainerBtn')}
            onClick={() => {
              onDeleteClick(id);
            }}
          >
            Delete
          </button>
        </div>
      </>
    );
  }
);
