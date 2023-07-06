import { getClassName } from 'helpers/helper';

import { useKeyboard } from '../logic/useKeyboard';
import { IKeyboardProps } from '../types/types';
import styles from './Keyboard.module.scss';

export function Keyboard({
  setKey,
  alphabet,
  lang,
  handleEscape,
}: IKeyboardProps) {
  const { createKeyboardRows, themeClassName, mobileInputRegexp } = useKeyboard(
    {
      setKey,
      handleEscape,
      lang,
    }
  );
  return (
    <>
      <div className={getClassName(styles.keyboard, themeClassName)}>
        {createKeyboardRows(alphabet)}
      </div>
      <input
        type="text"
        className={getClassName(styles.keyboard__mobile, themeClassName)}
        pattern={mobileInputRegexp}
      />
      <button
        className={getClassName(styles.keyboard__mobileBtn, themeClassName)}
      >
        Проверить
      </button>
    </>
  );
}
