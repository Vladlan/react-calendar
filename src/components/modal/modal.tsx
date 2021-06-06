import { ReactChild, useEffect } from 'react';
import './modal.scss';
import { cn } from '@bem-react/classname';
import { createPortal } from 'react-dom';

const bem = cn('Modal');

type ModalProps = {
  onClose: () => void;
  title: string;
  children: ReactChild;
  show: boolean;
};

export const Modal = ({ show, onClose, title, children }: ModalProps) => {
  const closeOnEscapeKeyDown = (e: KeyboardEvent) => {
    if ((e.charCode || e.keyCode) === 27) {
      onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener('keydown', closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
    };
  }, []);

  return createPortal(
    <div
      className={bem()}
      onClick={onClose}
      style={{
        transform: show ? 'translateY(0vh)' : 'translateY(-100vh)',
        opacity: show ? '1' : '0',
      }}
    >
      <div className={bem('Content')} onClick={(e) => e.stopPropagation()}>
        <div className={bem('Header')}>
          <h4 className={bem('Title')}>{title}</h4>
        </div>
        <div className={bem('Body')}>{children}</div>
        <div className={bem('Footer')}>
          <button onClick={onClose} className={bem('Btn', { close: true })}>
            Close
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('root') as Element
  );
};
