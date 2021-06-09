import './notification.scss';
import { cn } from '@bem-react/classname';
import { NOTIFICATIONS_TYPES_ENUM } from '../../constants';
import { AppNotificationTypes } from '../notifications-block';

const bem = cn('Notification');

type NotificationPropsType = {
  type: AppNotificationTypes;
  message: string;
  onClose: () => void;
};

export const Notification = ({
  type,
  message,
  onClose,
}: NotificationPropsType) => {
  return (
    <section
      className={bem({
        slideIn: true,
        error: type === NOTIFICATIONS_TYPES_ENUM.ERROR,
        warning: type === NOTIFICATIONS_TYPES_ENUM.WARNING,
        message: type === NOTIFICATIONS_TYPES_ENUM.MESSAGE,
      })}
    >
      <div className={bem('Description')}>
        <h6 className={bem('Type')}>{type}</h6>
        <p className={bem('Message')}>{message}</p>
      </div>
      <div className={bem('CloseBlock')}>
        <button className={bem('DeleteBtn')} onClick={onClose}>
          <span>🞩</span>
        </button>
      </div>
    </section>
  );
};
