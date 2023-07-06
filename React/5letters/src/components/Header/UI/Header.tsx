/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Modal from 'components/BaseComponents/Modal';
import { getClassName } from 'helpers/helper';

import Info from '../components/Info';
import SettingWindow from '../components/SettingWindow';
import { useHeader } from '../logic/useHeader';
import { IHeaderProps } from '../types/types';
import styles from './Header.module.scss';

export function Header({
  gameIsLost,
  rowNumber,
  handleInput,
  handleRestart,
  escape,
  setEscape,
}: IHeaderProps) {
  const {
    language,
    theme,
    themeClassName,
    setLanguage,
    setTheme,
    modalActive,
    modalSettingsActive,
    setModalActive,
    setModalSettingsActive,
    USFlag,
    RUSflag,
    sun,
    moon,
    refresh,
    question,
    whiteFlag,
    gears,
  } = useHeader({ escape, setEscape });

  return (
    <header className={getClassName(styles.header, themeClassName)}>
      <button
        className={getClassName(styles.button, themeClassName)}
        onClick={(e) => {
          setModalActive(true);
          e.currentTarget.blur();
        }}
      >
        {question}
      </button>
      <button
        className={getClassName(styles.button, themeClassName)}
        onClick={(e) => {
          gameIsLost(true);
          e.currentTarget.blur();
        }}
      >
        {whiteFlag}
      </button>
      <button
        className={getClassName(styles.button, themeClassName)}
        onClick={(e) => {
          handleRestart(true);
          e.currentTarget.blur();
        }}
      >
        {refresh}
      </button>
      <Modal active={modalActive} setActive={setModalActive}>
        <Info />
      </Modal>
      <p className={getClassName(styles.text, themeClassName)}>
        WORDLE {language}
      </p>
      <button
        className={getClassName(styles.button, themeClassName)}
        onClick={(e) => {
          e.currentTarget.blur();
          return setLanguage && setLanguage(language === 'RUS' ? 'EN' : 'RUS');
        }}
      >
        {language === 'RUS' ? RUSflag : USFlag}
      </button>
      <button
        className={getClassName(styles.button, themeClassName)}
        onClick={(e) => {
          e.currentTarget.blur();
          return setTheme && setTheme(theme === 'dark' ? 'light' : 'dark');
        }}
      >
        {theme === 'dark' ? moon : sun}
      </button>
      <button
        className={getClassName(styles.button, themeClassName)}
        onClick={(e) => {
          setModalSettingsActive(true);
          e.currentTarget.blur();
        }}
      >
        {gears}
      </button>

      <Modal active={modalSettingsActive} setActive={setModalSettingsActive}>
        <SettingWindow rowNumber={rowNumber} handleInput={handleInput} />
      </Modal>
    </header>
  );
}
