import { generateField } from 'helpers/helper';

import { TypeWords } from '../types/types';
import styles from './Gamefield.module.scss';

export function Gamefield({ words }: TypeWords) {
  return <div className={styles.gamefield}>{generateField(words)}</div>;
}
