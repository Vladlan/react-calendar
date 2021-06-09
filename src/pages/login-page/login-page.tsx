import './login-page.scss';
import { cn } from '@bem-react/classname';
import { KeyboardEvent, useContext, useState } from 'react';
import { ACTIONS, AppContext } from '../../state';
import { useHistory } from 'react-router-dom';
import { setCurrentUserInLocalStorage } from '../../utils';
import { KEY_ENTER } from '../../constants';
const bem = cn('LoginPage');

export const LoginPage = () => {
  const [login, setLogin] = useState('');
  const { dispatch } = useContext(AppContext);
  const routerHistory = useHistory();

  const goToCalendar = () => {
    if (login) {
      setCurrentUserInLocalStorage(login);
      dispatch({
        type: ACTIONS.LOGIN,
        payload: {
          login,
        },
      });
      routerHistory.push('/calendar');
    }
  };
  const goToCalendarOnEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === KEY_ENTER) {
      goToCalendar();
    }
  };

  return (
    <div className={bem()}>
      <h1 className={bem('Title')}>React Calendar</h1>
      <div>
        <input
          className={bem('LoginInput')}
          value={login}
          type="text"
          placeholder="Enter your desired login"
          onKeyPress={(e) => goToCalendarOnEnter(e)}
          onChange={(e) => {
            setLogin(e.target.value.trim());
          }}
        />
        <button
          className={bem('EnterBtn')}
          onClick={() => {
            goToCalendar();
          }}
        >
          Enter
        </button>
      </div>
    </div>
  );
};
