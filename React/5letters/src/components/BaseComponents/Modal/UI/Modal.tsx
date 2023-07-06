/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { getClassName } from 'helpers/helper';

import { useModal } from '../logic/useModal';
import { IModalProps } from '../types/types';
import styles from './Modal.module.scss';

export function Modal({ active, setActive, children }: IModalProps) {
  const { themeClassName } = useModal();
  return (
    <div
      className={
        active ? getClassName(styles.modal, styles.modal_active) : styles.modal
      }
      onClick={() => setActive(false)}
    >
      <div
        className={getClassName(styles.content, themeClassName)}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
