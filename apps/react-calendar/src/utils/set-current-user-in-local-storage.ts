import { CURRENT_USER_KEY } from '../constants';

export const setCurrentUserInLocalStorage = (userName: string) => {
  return localStorage.setItem(CURRENT_USER_KEY, userName);
};
