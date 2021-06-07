import { useContext } from 'react';
import './header.scss';
import { ACTIONS, AppContext } from '../../state';
import { DateTime } from 'luxon';
import { cn } from '@bem-react/classname';
import { useHistory } from 'react-router-dom';
import { setCurrentUserInLocalStorage } from '../../utils/set-current-user-in-local-storage';

const bem = cn('Header');

export function Header() {
  const {
    state: { currentMonth, currentYear },
    dispatch,
  } = useContext(AppContext);
  const currentMonthName = DateTime.fromObject({
    month: currentMonth,
  }).monthLong;

  const decrementMonth = () => {
    if (currentMonth === 1) {
      dispatch({
        type: ACTIONS.CHANGE_CURRENT_MONTH_N_YEAR,
        payload: {
          month: 12,
          year: currentYear - 1,
        },
      });
    } else {
      dispatch({
        type: ACTIONS.CHANGE_CURRENT_MONTH,
        payload: {
          month: currentMonth - 1,
        },
      });
      dispatch({
        type: ACTIONS.CHANGE_CURRENT_MONTH,
        payload: {
          month: currentMonth - 1,
        },
      });
    }
  };

  const incrementMonth = () => {
    if (currentMonth === 12) {
      dispatch({
        type: ACTIONS.CHANGE_CURRENT_MONTH_N_YEAR,
        payload: {
          month: 1,
          year: currentYear + 1,
        },
      });
    } else {
      dispatch({
        type: ACTIONS.CHANGE_CURRENT_MONTH,
        payload: {
          month: currentMonth + 1,
        },
      });
    }
  };

  const routerHistory = useHistory();
  const logout = () => {
    dispatch({
      type: ACTIONS.LOGOUT,
    });
    setCurrentUserInLocalStorage('');
    routerHistory.push('/');
  };

  return (
    <header className={bem()}>
      <h1 className={bem('Logo')}>React Calendar</h1>
      <div className={bem('CalendarSwitcher')}>
        <button className={bem('CalendarSwitcherBtn')} onClick={decrementMonth}>
          <span>{'<'}</span>
        </button>
        <button className={bem('CalendarSwitcherBtn')} onClick={incrementMonth}>
          <span>{'>'}</span>
          {/*TODO: replace with icons library*/}
        </button>
        <span className={bem('CalendarSwitcherMonth')}>{currentMonthName}</span>
        <span className={bem('CalendarSwitcherYear')}>{currentYear}</span>
      </div>
      <div className={bem('LogoutBtnContainer')}>
        <button className={bem('LogoutBtn')} onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
}
