import { AppStateType } from './state';
import { ACTIONS, AppActions } from './actions';
import { CalendarDayData, CalendarDayEvent } from '../components/calendar-day';
import { generateCalendarData, sortByStartTime } from '../utils';
import { AppNotification } from '../components/notifications-block';

export type AppPayloads = {
  [ACTIONS.CHANGE_CURRENT_YEAR]: {
    year: number;
  };
  [ACTIONS.CHANGE_CURRENT_MONTH]: {
    month: number;
  };
  [ACTIONS.CHANGE_CURRENT_MONTH_N_YEAR]: {
    month: number;
    year: number;
  };
  [ACTIONS.SET_SELECTED_DAY]: CalendarDayData;
  [ACTIONS.UPDATE_SELECTED_DAY_EVENTS]: CalendarDayEvent;
  [ACTIONS.ADD_NEW_EVENT_FOR_SELECTED_DAY_EVENTS]: CalendarDayEvent;
  [ACTIONS.DELETE_EVENT_FROM_SELECTED_DAY]: {
    eventId: string;
  };
  [ACTIONS.UPDATE_CALENDAR_DATA]: {
    month: number;
    year: number;
  };
  [ACTIONS.ADD_NOTIFICATION]: AppNotification;
  [ACTIONS.REMOVE_NOTIFICATION]: {
    notificationId: string;
  };
  [ACTIONS.LOGOUT]: undefined;
  [ACTIONS.LOGIN]: {
    login: string;
  };
};

// TODO: divide reducer to sub reducers
export const reducer = (state: AppStateType, action: AppActions) => {
  switch (action.type) {
    case ACTIONS.CHANGE_CURRENT_YEAR:
      return {
        ...state,
        currentYear: action.payload.year,
        calendarData: generateCalendarData(
          action.payload.year,
          state.currentMonth,
          state.currentUser
        ),
      };
    case ACTIONS.CHANGE_CURRENT_MONTH:
      return {
        ...state,
        currentMonth: action.payload.month,
        calendarData: generateCalendarData(
          state.currentYear,
          action.payload.month,
          state.currentUser
        ),
      };
    case ACTIONS.CHANGE_CURRENT_MONTH_N_YEAR:
      return {
        ...state,
        currentMonth: action.payload.month,
        currentYear: action.payload.year,
        calendarData: generateCalendarData(
          action.payload.year,
          action.payload.month,
          state.currentUser
        ),
      };
    case ACTIONS.SET_SELECTED_DAY:
      return {
        ...state,
        selectedDay: action.payload,
      };
    case ACTIONS.UPDATE_SELECTED_DAY_EVENTS:
      const updatedEvent = action.payload;
      return {
        ...state,
        selectedDay: {
          ...state.selectedDay,
          events: state.selectedDay.events
            .map((el) => {
              return el.id === updatedEvent.id ? updatedEvent : el;
            })
            .sort(sortByStartTime),
        },
      };
    case ACTIONS.ADD_NEW_EVENT_FOR_SELECTED_DAY_EVENTS:
      const newEvent = action.payload;
      return {
        ...state,
        selectedDay: {
          ...state.selectedDay,
          events: [...state.selectedDay.events, newEvent].sort(sortByStartTime),
        },
      };
    case ACTIONS.DELETE_EVENT_FROM_SELECTED_DAY:
      const { eventId } = action.payload;
      return {
        ...state,
        selectedDay: {
          ...state.selectedDay,
          events: state.selectedDay.events.filter((el) => el.id !== eventId),
        },
      };
    case ACTIONS.UPDATE_CALENDAR_DATA:
      const { month, year } = action.payload;
      return {
        ...state,
        calendarData: generateCalendarData(year, month, state.currentUser),
      };
    case ACTIONS.ADD_NOTIFICATION:
      const newNotification = action.payload;
      return {
        ...state,
        notifications: [...state.notifications, newNotification],
      };
    case ACTIONS.REMOVE_NOTIFICATION:
      const { notificationId } = action.payload;
      return {
        ...state,
        notifications: state.notifications.filter(
          (not) => not.id !== notificationId
        ),
      };
    case ACTIONS.LOGIN:
      const { login } = action.payload;
      return {
        ...state,
        currentUser: login,
        calendarData: generateCalendarData(
          state.currentYear,
          state.currentMonth,
          login
        ),
      };
    case ACTIONS.LOGOUT:
      return {
        ...state,
        currentUser: '',
        calendarData: generateCalendarData(
          state.currentYear,
          state.currentMonth,
          ''
        ),
      };
    default:
      return state;
  }
};
