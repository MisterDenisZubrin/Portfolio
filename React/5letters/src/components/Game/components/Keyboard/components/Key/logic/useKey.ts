import { ThemeContext } from 'providers/ThemeProvider';
import { useContext } from 'react';

import { IUseKeyProps } from '../../../types/types';
import styles from '../UI/Key.module.scss';

export function useKey({ children, newLetter }: IUseKeyProps) {
  const { theme } = useContext(ThemeContext);
  const themeClassName = styles[theme];
  function handleKeyClick() {
    if (typeof children === 'object') {
      newLetter('Backspace');
    } else if (children === 'Enter' || children === 'ENTER') {
      newLetter('Enter');
    } else {
      newLetter(children);
    }
  }
  return { handleKeyClick, themeClassName };
}
