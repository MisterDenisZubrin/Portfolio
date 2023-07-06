import Game from 'components/Game';
import Header from 'components/Header';
import { getClassName } from 'helpers/helper';

import { useApp } from '../logic/useApp';
import styles from './App.module.scss';

export function App() {
  const {
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
    escape,
    setEscape,
    handleEscape,
  } = useApp();

  return (
    <div className={getClassName(styles.App, themeClassName)}>
      <Header
        gameIsLost={setisGameLost}
        rowNumber={rowNumber}
        handleInput={handleInput}
        handleRestart={handleRestart}
        escape={escape}
        setEscape={setEscape}
      />
      <Game
        alphabet={alphabet}
        setAlphabet={setAlphabet}
        lang={language}
        isGameLost={isGameLost}
        setisGameLost={setisGameLost}
        rowNumber={rowNumber}
        restartStatus={restartStatus}
        setRestartStatus={handleRestart}
        handleEscape={handleEscape}
        escape={escape}
        setEscape={setEscape}
      />
    </div>
  );
}
