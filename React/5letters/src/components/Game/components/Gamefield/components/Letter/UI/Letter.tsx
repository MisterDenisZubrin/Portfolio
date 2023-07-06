import { getClassName } from 'helpers/helper';

import { IUseLetter } from '../../../types/types';
import { useLetter } from '../logic/useLetter';
import styles from './Letter.module.scss';

export function Letter({ status, children }: IUseLetter) {
  const { letterClassname } = useLetter({ status, children });
  return (
    <div className={getClassName(styles.slot, letterClassname)}>
      <p className={styles.text}>{children}</p>
    </div>
  );
}
