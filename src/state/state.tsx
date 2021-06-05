import { DateTime, Settings } from 'luxon';
import { APP_DEFAULT_LOCALE } from '../constants';

export type AppStateType = {
  currentYear: number;
  currentMonth: number;
};

Settings.defaultLocale = APP_DEFAULT_LOCALE;
const currentDate = DateTime.now();

export const initialState = {
  currentYear: currentDate.year,
  currentMonth: currentDate.month,
};
