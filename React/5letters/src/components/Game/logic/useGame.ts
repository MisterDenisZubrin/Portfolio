import {
  alphabetEN,
  alphabetRUS,
} from 'components/Game/components/Keyboard/config';
import { useEffect, useState } from 'react';

import { IRowObject, IUseGameProps } from '../types/types';

export function useGame({
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
}: IUseGameProps) {
  const [key, setKey] = useState('');

  function generateWordsArr() {
    const row = [
      { letter: '', id: 1, status: 'letter' },
      { letter: '', id: 2, status: 'letter' },
      { letter: '', id: 3, status: 'letter' },
      { letter: '', id: 4, status: 'letter' },
      { letter: '', id: 5, status: 'letter' },
    ];
    const wordsArr = [];
    for (let i = 0; i < rowNumber; i += 1) {
      wordsArr.push(
        row.map((rowLetter) => {
          const id = rowLetter.id + 5 * i;
          return { ...rowLetter, id };
        })
      );
    }
    return wordsArr;
  }

  const [words, setWords] = useState<IRowObject[][]>(generateWordsArr());
  const [dictionary, setDictionary] = useState<string[]>([]);
  const [rusDictionary, setRusDictionary] = useState(['']);
  const [engDictionary, setEngDictionary] = useState(['']);
  const [word, setWord] = useState('');
  const [row, setRow] = useState(0);
  const [isGameWin, setIsGameWin] = useState(false);
  const [modalAlert, setModalAlert] = useState('');
  const [modalActive, setModalActive] = useState(false);

  function getKeyboardValue(data: string) {
    setKey(data);
  }

  function clearCurrentLetter() {
    setKey('');
  }

  function colorKey(letter: string, status: string, array: IRowObject[][]) {
    const result = array.map((arr) =>
      arr.map((string: IRowObject) =>
        string.status !== status && string.letter === letter
          ? { ...string, status }
          : string
      )
    );
    return result;
  }

  function startCheckup() {
    if (isGameWin || isGameLost) return;
    let winCondition = 0;
    // Получаем слово пользователя
    const userWord: string[] = [];
    for (let l = 0; l < words[row].length; l += 1) {
      userWord.push(words[row][l].letter);
    }
    // Проверка слова пользователя
    if (userWord[userWord.length - 1] !== '') {
      if (dictionary.includes(userWord.join(''))) {
        const guessedWord = word.split('');
        // Стилизация правильных букв
        let tempArr: IRowObject[][] = [...alphabet];
        for (let letter = 0; letter < userWord.length; letter += 1) {
          const userLetter = words[row][letter];
          if (guessedWord.find((a) => a === userWord[letter])) {
            if (guessedWord[letter] === userWord[letter]) {
              userLetter.status = 'letter_correct';
              tempArr = colorKey(userLetter.letter, 'key_correct', tempArr);
              winCondition += 1;
              if (winCondition === 5) {
                setIsGameWin(true);
                setAlphabet(tempArr);
                return;
              }
            } else {
              userLetter.status = 'letter_outofplace';
              tempArr = colorKey(userLetter.letter, 'key_correct', tempArr);
            }
          } else {
            userLetter.status = 'letter_incorrect';
            tempArr = colorKey(userLetter.letter, 'key_incorrect', tempArr);
          }
        }
        setWords(tempArr);
        setAlphabet(tempArr);
        // Обработка состояния игры на основе проверки
        if (row + 1 === rowNumber) {
          setisGameLost(true);
        } else {
          setRow(row + 1);
        }
      } else {
        setModalAlert('Слова нет в словаре');
        setModalActive(true);
      }
    } else {
      setModalAlert('Слово не полное');
      setModalActive(true);
    }
  }

  function updateUserWord() {
    const regexp = lang === 'RUS' ? /[а-яА-Я]{1,1}/ : /[a-zA-Z]{1,1}/;
    if (
      key === 'Backspace' ||
      key === 'Enter' ||
      (regexp.test(key) &&
        key !== 'Alt' &&
        key !== 'Control' &&
        key !== 'Shift' &&
        key !== 'OS' &&
        key !== 'Tab')
    ) {
      const newLettersArr = words[row];
      const newLetterId = newLettersArr.findIndex(
        (letter) => letter.letter === ''
      );
      if (key === 'Backspace') {
        if (newLetterId === -1) {
          newLettersArr[4] = {
            letter: '',
            id: row * 5 + 4,
            status: '',
          };
        } else {
          newLettersArr[newLetterId - 1] = {
            letter: '',
            id: row * 5 + newLetterId - 1,
            status: '',
          };
        }
      } else if (key === 'Enter' || key === 'ENTER') {
        startCheckup();
      } else {
        newLettersArr[newLetterId] = {
          letter: key,
          id: row * 5 + newLetterId,
          status: '',
        };
      }
      const wordsCopy = [...words];
      wordsCopy[row] = newLettersArr;
      setWords(wordsCopy);
      clearCurrentLetter();
    }
  }

  function addWord() {
    setWord(dictionary[Math.floor(Math.random() * dictionary.length)]);
  }

  function restartGame() {
    addWord();
    setWords(generateWordsArr());
    setRow(0);
    setRestartStatus(false);
    setisGameLost(false);
    setIsGameWin(false);
    setAlphabet(lang === 'RUS' ? alphabetRUS : alphabetEN);
  }

  useEffect(() => {
    if (restartStatus) {
      restartGame();
    }
  }, [restartStatus]);

  useEffect(() => {
    if (isGameLost === false && isGameWin === false) {
      updateUserWord();
    } else {
      setModalAlert('Игра окончена! Перезагрузите страницу!');
      setModalActive(true);
    }
  }, [key]);

  useEffect(() => {
    if (lang === 'RUS') {
      if (rusDictionary[0] !== '') {
        setDictionary(rusDictionary);
      } else {
        fetch('russian-dictionary.txt')
          .then((res) => res.text())
          .then((text) => {
            setRusDictionary(text.split('\r\n'));
            setDictionary(text.split('\r\n'));
          });
      }
      restartGame();
    } else if (lang === 'EN') {
      if (engDictionary[0] !== '') {
        setDictionary(engDictionary);
      } else {
        fetch('english-dictionary.txt')
          .then((res) => res.text())
          .then((text) => {
            setEngDictionary(text.split('\r\n'));
            setDictionary(text.split('\r\n'));
          });
      }
      restartGame();
    }
  }, [lang]);

  useEffect(() => {
    addWord();
  }, [dictionary]);

  useEffect(() => {
    if (isGameWin) {
      setModalAlert('Вы победили!');
      setModalActive(true);
    }
    if (isGameLost) {
      if (row + 1 === rowNumber) {
        setModalAlert(`Вы проиграли! Было загадано слово: ${word}`);
        setModalActive(true);
      } else {
        setModalAlert(`Вы сдались. Было загадано слово: ${word}`);
        setModalActive(true);
      }
    }
  }, [isGameLost, isGameWin]);

  useEffect(() => {
    restartGame();
  }, [rowNumber]);

  useEffect(() => {
    if (escape) {
      setModalActive(false);
      setEscape(false);
    }
  }, [escape]);

  return {
    key,
    getKeyboardValue,
    clearCurrentLetter,
    words,
    modalAlert,
    modalActive,
    setModalActive,
  };
}
