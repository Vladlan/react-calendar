import { useContext } from 'react';
import './notifications-block.scss';
import { ACTIONS, AppContext } from '../../state';
import { cn } from '@bem-react/classname';
import { NOTIFICATIONS_TYPES_ENUM } from '../../constants';
import { Notification } from '../notification';

const bem = cn('NotificationsBlock');

export type AppNotificationTypes = keyof typeof NOTIFICATIONS_TYPES_ENUM;

export interface AppNotification {
  id: string;
  message: string;
  type: AppNotificationTypes;
}

export function NotificationsBlock() {
  const {
    state: { notifications },
    dispatch,
  } = useContext(AppContext);
  const removeNotification = (id: string) => {
    dispatch({
      type: ACTIONS.REMOVE_NOTIFICATION,
      payload: { notificationId: id },
    });
  };

  if (notifications.length)
    return (
      <aside
        className={bem({
          visible: !!notifications.length,
          hidden: !notifications.length,
        })}
      >
        {notifications.map(({ id, type, message }) => {
          return (
            <Notification
              key={id}
              type={type}
              message={message}
              onClose={() => removeNotification(id)}
            />
          );
        })}
      </aside>
    );
  return <></>;
}
