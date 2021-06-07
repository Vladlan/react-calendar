import { DateTime, Settings } from 'luxon';
import { APP_DEFAULT_LOCALE } from '../constants';
import { CalendarDayData } from '../components/calendar-day';
import { generateCalendarData } from '../utils';
import { AppNotification } from '../components/notifications-block';
import { getCurrentUserFromLocalStorage } from '../utils/get-current-user-from-local-storage';

export type AppStateType = {
  currentYear: number;
  currentMonth: number;
  currentUser: string;
  selectedDay: CalendarDayData;
  calendarData: CalendarDayData[][];
  notifications: AppNotification[];
  isEditingEvent: boolean;
};

Settings.defaultLocale = APP_DEFAULT_LOCALE;
const currentDate = DateTime.now();

export const initialState = {
  currentYear: currentDate.year,
  currentMonth: currentDate.month,
  currentUser: getCurrentUserFromLocalStorage(),
  isEditingEvent: false,
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
    getCurrentUserFromLocalStorage()
  ),
  notifications: [],
};
