import { validateEventDescription } from './validate-event-description';
import { validateEventTime } from './validate-event-time';
import { CalendarDayEvent } from '../../../calendar-day';

export const validateEvent = (
  tempDescription: string,
  tempStartTime: string,
  tempEndTime: string,
  eventsSiblings: CalendarDayEvent[],
  id: string
) => {
  const descriptionValidationErrMsg = validateEventDescription(tempDescription);
  if (descriptionValidationErrMsg) return descriptionValidationErrMsg;
  const eventTimeValidationErrMsg = validateEventTime(
    tempStartTime,
    tempEndTime,
    eventsSiblings.filter((ev) => ev.id !== id)
  );
  if (eventTimeValidationErrMsg) return eventTimeValidationErrMsg;
};
