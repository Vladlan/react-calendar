import { CURRENT_USER_KEY } from '../constants';

export const getCurrentUserFromLocalStorage = () =>
  localStorage.getItem(CURRENT_USER_KEY) || '';
