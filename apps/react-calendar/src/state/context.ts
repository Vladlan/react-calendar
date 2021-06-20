import { createContext, Dispatch } from 'react';
import { AppStateType, initialState } from './state';
import { AppActions } from './actions';

export const AppContext = createContext<{
  state: AppStateType;
  dispatch: Dispatch<AppActions>;
}>({
  state: initialState,
  dispatch: () => null,
});
