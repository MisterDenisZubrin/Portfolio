/* eslint-disable jsx-a11y/label-has-associated-control */
import { ISettingWindowProps } from 'components/Header/types/types';

import styles from './SettingWindow.module.scss';

export function SettingWindow({ handleInput, rowNumber }: ISettingWindowProps) {
  return (
    <div className={styles.row}>
      <label htmlFor="attempts" className={styles.label}>
        Строк:
      </label>
      <input
        type="text"
        id="attempts"
        className={styles.input}
        value={rowNumber}
        onChange={handleInput}
        placeholder="5"
      />
    </div>
  );
}
