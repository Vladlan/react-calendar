import {
  EVENT_END_TIME_SHOULD_BE_AFTER_EVENT_START_TIME, YOU_ALREADY_HAVE_EVENT_IN_SELECTED_TIME_PERIOD,
  YOU_SHOULD_SELECT_EVENT_END_TIME,
  YOU_SHOULD_SELECT_EVENT_START_TIME,
} from '../../../../constants';
import { CalendarDayEvent } from '../../../calendar-day';
import { getMinutesFromEventTime } from '../../../../utils';

const checkEventIntersection = (startTimeMins:number, endTimeMins: number, event:CalendarDayEvent) => {
  const ev2StartMins = getMinutesFromEventTime(event.start);
  const ev2EndMins = getMinutesFromEventTime(event.end);
  if (startTimeMins < ev2StartMins && ev2StartMins < endTimeMins) return true;
  return ev2EndMins > startTimeMins && ev2EndMins < endTimeMins;
}

export const validateEventTime = (
  startTime: string,
  endTime: string,
  eventsSiblings: CalendarDayEvent[]
) => {
  if (!startTime) return YOU_SHOULD_SELECT_EVENT_START_TIME;
  if (!endTime) return YOU_SHOULD_SELECT_EVENT_END_TIME;
  const startTimeMins = getMinutesFromEventTime(startTime);
  const endTimeMins = getMinutesFromEventTime(endTime);
  if (startTimeMins >= endTimeMins)
    return EVENT_END_TIME_SHOULD_BE_AFTER_EVENT_START_TIME;
  const hasIntersectionWithSiblingEvents = !!eventsSiblings.find(ev => checkEventIntersection(startTimeMins, endTimeMins, ev));
  if (hasIntersectionWithSiblingEvents)
    return YOU_ALREADY_HAVE_EVENT_IN_SELECTED_TIME_PERIOD;
};


