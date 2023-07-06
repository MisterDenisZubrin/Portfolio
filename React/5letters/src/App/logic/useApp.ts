import {
  alphabetEN,
  alphabetRUS,
} from 'components/Game/components/Keyboard/config';
import { IRowObject } from 'components/Game/types/types';
import { LanguageContext } from 'providers/LanguageProvider';
import { ThemeContext } from 'providers/ThemeProvider';
import { useContext, useEffect, useState } from 'react';

import styles from '../UI/App.module.scss';

export function useApp() {
  const [alphabet, setAlphabet] = useState<IRowObject[][]>(alphabetRUS);
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const themeClassName = styles[theme];

  useEffect(() => {
    setAlphabet(language === 'RUS' ? alphabetRUS : alphabetEN);
  }, [language]);

  const [isGameLost, setisGameLost] = useState(false);
  const [rowNumber, setRowNumber] = useState(5);
  const [restartStatus, setRestartStatus] = useState(false);
  const [escape, setEscape] = useState(false);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    if (+e.target.value || +e.target.value === 0) {
      setRowNumber(+e.target.value);
    } else {
      setRowNumber(5);
    }
  }
  function handleEscape() {
    setEscape(true);
  }

  function handleRestart(flag: boolean) {
    setRestartStatus(flag);
  }
  return {
    language,
    alphabet,
    setAlphabet,
    themeClassName,
    isGameLost,
    setisGameLost,
    rowNumber,
    handleInput,
    handleRestart,
    restartStatus,
    handleEscape,
    escape,
    setEscape,
  };
}
