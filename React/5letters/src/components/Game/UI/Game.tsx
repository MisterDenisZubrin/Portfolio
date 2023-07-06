import { Modal } from 'components/BaseComponents/Modal/UI/Modal';

import Gamefield from '../components/Gamefield';
import Keyboard from '../components/Keyboard';
import { useGame } from '../logic/useGame';
import { IGameProps } from '../types/types';

export function Game({
  isGameLost,
  setisGameLost,
  alphabet,
  setAlphabet,
  lang,
  rowNumber,
  restartStatus,
  setRestartStatus,
  handleEscape,
  escape,
  setEscape,
}: IGameProps) {
  const {
    getKeyboardValue,
    clearCurrentLetter,
    words,
    modalAlert,
    modalActive,
    setModalActive,
  } = useGame({
    isGameLost,
    setisGameLost,
    alphabet,
    setAlphabet,
    lang,
    rowNumber,
    restartStatus,
    setRestartStatus,
    escape,
    setEscape,
  });
  return (
    <>
      <Gamefield clearCurrentLetter={clearCurrentLetter} words={words} />
      <Modal active={modalActive} setActive={setModalActive}>
        {modalAlert}
      </Modal>

      <Keyboard
        setKey={getKeyboardValue}
        alphabet={alphabet}
        handleEscape={handleEscape}
        lang={lang}
      />
    </>
  );
}
