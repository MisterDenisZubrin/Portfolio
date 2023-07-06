import { ThemeContext } from 'providers/ThemeProvider';
import { useContext } from 'react';

import styles from '../UI/Modal.module.scss';

export function useModal() {
  const { theme } = useContext(ThemeContext);
  const themeClassName = styles[theme];
  return { themeClassName };
}
