import { IRowObject } from 'components/Game/types/types';
import { ThemeContext } from 'providers/ThemeProvider';
import { useContext, useEffect } from 'react';

import Key from '../components/Key';
import { IEventKeypress, IUseKeyboardProps } from '../types/types';
import keyboardStyles from '../UI/Keyboard.module.scss';

export function useKeyboard({ setKey, handleEscape, lang }: IUseKeyboardProps) {
  const { theme } = useContext(ThemeContext);
  const themeClassName = keyboardStyles[theme];
  const mobileInputRegexp = lang === 'RUS' ? '[а-яА-Я]{,5}' : '[a-zA-Z]{,5}';

  useEffect(() => {
    const onKeypress = (e: IEventKeypress) => {
      if (e.key === 'Escape') {
        handleEscape();
      } else {
        setKey(e.key);
      }
    };
    document.addEventListener('keydown', onKeypress);
    return () => {
      document.removeEventListener('keydown', onKeypress);
    };
  }, [setKey]);

  function createKeyboardRows(arr: IRowObject[][]) {
    const markup = [];
    const rowAmount = 3;

    for (let rowNumber = 0; rowNumber < rowAmount; rowNumber += 1) {
      if (rowNumber === rowAmount - 1) {
        // Перебор последней строки с добавлением функциональных кнопок
        const premarkup: JSX.Element[] = [];
        premarkup.push(
          <Key key={998} className="enterKey" newLetter={setKey}>
            ENTER
          </Key>
        );
        arr[rowNumber].forEach((letter: IRowObject) => {
          premarkup.push(
            <Key key={letter.id} newLetter={setKey} status={letter.status}>
              {letter.letter}
            </Key>
          );
        });
        premarkup.push(
          <Key key={999} className="backspaceKey" newLetter={setKey}>
            <svg
              width="26"
              height="18"
              viewBox="0 0 26 14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.4224 3.42069L14.3387 6.89524L18.2551 3.42069L19.4396 4.57931L15.584 8L19.4396 11.4207L18.2551 12.5793L14.3387 9.10476L10.4224 12.5793L9.23787 11.4207L13.0935 8L9.23787 4.57931L10.4224 3.42069Z" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.90841 0C6.59039 0 6.29019 0.136773 6.09495 0.370617L0.21708 7.41062C-0.0723608 7.75728 -0.0723592 8.24272 0.21708 8.58938L6.09495 15.6294C6.29019 15.8632 6.59039 16 6.90841 16H22.9695C23.5386 16 24 15.5702 24 15.04V0.96C24 0.429802 23.5386 0 22.9695 0H6.90841ZM1.9009 8L7.24442 1.6H22.2824V14.4H7.24442L1.9009 8Z"
              />
            </svg>
          </Key>
        );
        markup.push(
          <div className={keyboardStyles.row} key={rowNumber}>
            {premarkup}
          </div>
        );
      } else {
        // Перебор остальных строк
        const premarkup: JSX.Element[] = [];
        arr[rowNumber].forEach((letter: IRowObject) => {
          premarkup.push(
            <Key key={letter.id} newLetter={setKey} status={letter.status}>
              {letter.letter}
            </Key>
          );
        });
        markup.push(
          <div className={keyboardStyles.row} key={rowNumber}>
            {premarkup}
          </div>
        );
      }
    }
    return markup;
  }
  return { createKeyboardRows, themeClassName, mobileInputRegexp };
}
