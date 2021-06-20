import { ACTIONS, AppActions } from '../state';
import { NOTIFICATIONS_TYPES_ENUM } from '../constants';
import { Dispatch } from 'react';
import { nanoid } from 'nanoid';
import { AppNotificationTypes } from '../components/notifications-block';

export const showNotification = (
  dispatch: Dispatch<AppActions>,
  message: string,
  type: AppNotificationTypes = NOTIFICATIONS_TYPES_ENUM.ERROR
) => {
  const id = nanoid();
  dispatch({
    type: ACTIONS.ADD_NOTIFICATION,
    payload: {
      type,
      message,
      id,
    },
  });
  setTimeout(() => {
    dispatch({
      type: ACTIONS.REMOVE_NOTIFICATION,
      payload: {
        notificationId: id,
      },
    });
  }, 5000);
};
