import { AppStateType } from './state';
import { ACTIONS, AppActions } from './actions';
import { CalendarDayData, CalendarDayEvent } from '../components/calendar-day';
import { nanoid } from 'nanoid';
import {
  generateCalendarData,
  generateEmptyEventData,
  sortByStartTime,
} from '../utils';

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
  [ACTIONS.SET_SELECTED_DAY]: {
    selectedDay: CalendarDayData;
  };
  [ACTIONS.UPDATE_SELECTED_DAY_EVENTS]: {
    newEvent: CalendarDayEvent;
  };
  [ACTIONS.DELETE_EVENT_FROM_SELECTED_DAY]: {
    eventId: string;
  };
  [ACTIONS.UPDATE_CALENDAR_DATA]: {
    month: number;
    year: number;
  };
  [ACTIONS.ADD_EMPTY_EVENT_FOR_SELECTED_DAY_EVENTS]: {};
};

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
        selectedDay: action.payload.selectedDay,
      };
    case ACTIONS.UPDATE_SELECTED_DAY_EVENTS:
      const { id, description, attendees, start, end } =
        action.payload.newEvent;
      return {
        ...state,
        selectedDay: {
          ...state.selectedDay,
          events: state.selectedDay.events
            .map((el) => {
              return el.id === id
                ? {
                    description,
                    attendees,
                    start,
                    end,
                    id: id || nanoid(),
                  }
                : el;
            })
            .sort(sortByStartTime),
        },
      };
    case ACTIONS.ADD_EMPTY_EVENT_FOR_SELECTED_DAY_EVENTS:
      return {
        ...state,
        selectedDay: {
          ...state.selectedDay,
          events: [...state.selectedDay.events, generateEmptyEventData()],
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
    default:
      return state;
  }
};
