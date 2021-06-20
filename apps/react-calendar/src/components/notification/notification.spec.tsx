import './notification.scss';
import { fireEvent, render } from '@testing-library/react';
import { Notification } from './notification';
import { NOTIFICATIONS_TYPES_ENUM } from '../../constants';
import { cn } from '@bem-react/classname';

const bem = cn('.Notification');

describe('Notification', () => {
  it('calls "onClose" prop on close button click', () => {
    const onClose = jest.fn();
    const { container } = render(
      <Notification
        onClose={onClose as () => void}
        message={''}
        type={NOTIFICATIONS_TYPES_ENUM.ERROR}
      />
    );
    const closeBtn = container.querySelector('button');
    fireEvent.click(closeBtn!);
    expect(onClose).toHaveBeenCalled();
  });
  it('renders message prop and message type', async () => {
    const type = NOTIFICATIONS_TYPES_ENUM.ERROR;
    const msg = 'Notification message';
    const { container } = render(
      <Notification onClose={() => {}} message={msg} type={type} />
    );
    const notificationMsgContainer = container.querySelector(bem('Message'));
    expect(notificationMsgContainer!.innerHTML).toBe(msg);
    const notificationType = container.querySelector(bem('Type'));
    expect(notificationType!.innerHTML).toBe(type);
  });
});
