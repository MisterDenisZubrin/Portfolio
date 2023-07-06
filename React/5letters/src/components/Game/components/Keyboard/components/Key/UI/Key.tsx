import { getClassName } from 'helpers/helper';

import { IKeyProps } from '../../../types/types';
import { useKey } from '../logic/useKey';
import styles from './Key.module.scss';

export function Key({ className, status, newLetter, children }: IKeyProps) {
  const { handleKeyClick, themeClassName } = useKey({ children, newLetter });
  return (
    <button
      className={getClassName(
        styles.key,
        styles[className || ''],
        styles[status || ''],
        themeClassName
      )}
      onClick={handleKeyClick}
    >
      {children}
    </button>
  );
}
