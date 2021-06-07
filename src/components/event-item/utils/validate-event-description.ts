import {
  DESCRIPTION_TOO_LONG,
  DESCRIPTION_TOO_SHORT,
} from '../../../constants';

export const validateEventDescription = (eventDescription: string) => {
  if (eventDescription.length < 6) return DESCRIPTION_TOO_SHORT;
  if (eventDescription.length > 100) return DESCRIPTION_TOO_LONG;
};
