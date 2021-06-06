import {
  ATTENDEE_EMAIL_IS_NOT_VALID,
  THIS_ATTENDEE_ALREADY_ADDED,
  YOU_PROVIDED_EMPTY_ATTENDEE_EMAIL,
} from '../../../constants';

export const validateAttendee = (
  attendeeEmail: string,
  existingAttendees: string[]
) => {
  if (!attendeeEmail) return YOU_PROVIDED_EMPTY_ATTENDEE_EMAIL;
  if (!attendeeEmail.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i))
    return ATTENDEE_EMAIL_IS_NOT_VALID;
  if (existingAttendees.find((att) => att === attendeeEmail))
    return THIS_ATTENDEE_ALREADY_ADDED;
};
