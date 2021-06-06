import { DateTime, Settings } from 'luxon';
import { APP_DEFAULT_LOCALE } from '../constants';
import { CalendarDayData } from '../components/calendar-day';
import { generateCalendarData } from '../utils';

export type AppStateType = {
  currentYear: number;
  currentMonth: number;
  currentUser: string;
  selectedDay: CalendarDayData;
  isAddingNewEvent: boolean;
  calendarData: CalendarDayData[][];
};

Settings.defaultLocale = APP_DEFAULT_LOCALE;
const currentDate = DateTime.now();
const currentUser = 'vlad';

export const initialState = {
  currentYear: currentDate.year,
  currentMonth: currentDate.month,
  currentUser, // add login
  isAddingNewEvent: false,
  selectedDay: {
    day: 1,
    month: 1,
    year: 1971,
    isToday: false,
    isTodaysMonth: false,
    events: [],
  },
  calendarData: generateCalendarData(
    currentDate.year,
    currentDate.month,
    currentUser
  ),
};
