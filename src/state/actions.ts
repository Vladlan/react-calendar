import { AppPayloads } from './reducer';

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum ACTIONS {
  CHANGE_CURRENT_YEAR = 'CHANGE_CURRENT_YEAR',
  CHANGE_CURRENT_MONTH = 'CHANGE_CURRENT_MONTH',
  CHANGE_CURRENT_MONTH_N_YEAR = 'CHANGE_CURRENT_MONTH_N_YEAR',
  SET_SELECTED_DAY = 'SET_SELECTED_DAY',
  REPLACE_SELECTED_DAY_EVENTS = 'REPLACE_SELECTED_DAY_EVENTS',
  DELETE_EVENT_FROM_SELECTED_DAY = 'DELETE_EVENT_FROM_SELECTED_DAY',
  UPDATE_CALENDAR_DATA = 'UPDATE_CALENDAR_DATA',
  ADD_NOTIFICATION = 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

export type AppActions = ActionMap<AppPayloads>[keyof ActionMap<AppPayloads>];
