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
}

export type AppActions = ActionMap<AppPayloads>[keyof ActionMap<AppPayloads>];
