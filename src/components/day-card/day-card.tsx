import './day-card.scss';
import { cn } from '@bem-react/classname';
import { CalendarDayData } from '../calendar-day';

const bem = cn('DayCard');

type DayCardProps = {
  dayData: CalendarDayData;
};

export const DayCard = ({ dayData }: DayCardProps) => {
  const { events } = dayData;
  return (
    <div className={bem()}>
      <ul className={bem('EventsList')}>
        {events.map((dayEvent) => {
          return (
            <li className={bem('DayEvent')} key={dayEvent.id}>
              <div className={bem('TimeContainer')}>
                <div className={bem('EventStart')}>{dayEvent.start}</div>
                <div className={bem('EventEnd')}>{dayEvent.end}</div>
              </div>
              <div className={bem('EventInfoContainer')}>
                <p className={bem('EventDescription')}>
                  {dayEvent.description}
                </p>
                <h5 className={bem('AttendeesTitle')}>Attendees:</h5>
                <ul className={bem('Attendees')}>
                  {dayEvent.attendees.map((el, index) => (
                    <li className={bem('Attendee')} key={`id-att-${index}`}>
                      <a href={`mailto:${el}`} key={el}>
                        {el}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={bem('EditContainer')}>
                <button className={bem('EditContainerButton')}>edit</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
