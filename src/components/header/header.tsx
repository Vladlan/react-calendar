import React from 'react';
import './header.scss';
import { ACTIONS, AppContext } from '../../state';
import { DateTime } from 'luxon';

export function Header() {
  const {
    state: { currentMonth, currentYear },
    dispatch,
  } = React.useContext(AppContext);
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

  return (
    <header className="Header">
      <h1 className="Header__logo">React Calendar</h1>
      <div className="Header__calendar-switcher">
        <button
          className="Header__calendar-switcher-btn"
          onClick={decrementMonth}
        >
          {'<'}
        </button>
        <span className="Header__calendar-switcher-month">
          {currentMonthName}
        </span>
        <span className="Header__calendar-switcher-year">{currentYear}</span>
        <button
          className="Header__calendar-switcher-btn"
          onClick={incrementMonth}
        >
          {'>'}
        </button>
      </div>
    </header>
  );
}
