import { ReactChild, useEffect } from 'react';
import './modal.scss';
import { cn } from '@bem-react/classname';
import { createPortal } from 'react-dom';

const bem = cn('Modal');

type ModalProps = {
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  children: ReactChild;
  isShown: boolean;
};

export const Modal = ({
  isShown,
  onClose,
  title,
  children,
  onSubmit,
}: ModalProps) => {
  useEffect(() => {
    const closeOnEscapeKeyDown = (e: KeyboardEvent) => {
      if ((e.charCode || e.keyCode) === 27) {
        onClose();
      }
    };
    document.body.addEventListener('keydown', closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div
      className={bem({ opened: isShown, closed: !isShown })}
      onClick={onClose}
    >
      <div className={bem('Content')} onClick={(e) => e.stopPropagation()}>
        <div className={bem('Header')}>
          <h4 className={bem('Title')}>{title}</h4>
        </div>
        <div className={bem('Body')}>{children}</div>
        <div className={bem('Footer')}>
          <button onClick={onSubmit} className={bem('Btn', { close: true })}>
            Save
          </button>
          <button onClick={onClose} className={bem('Btn', { close: true })}>
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('root') as Element
  );
};
