import { Letter } from 'components/Game/components/Gamefield/components/Letter/UI/Letter';

import styles from './info.module.scss';

export function Info() {
  return (
    <>
      <h2 className={styles.heading}>Как играть в Wordle</h2>
      <p className={styles.text}>
        Вы должны угадать скрытое слово за 6 попыток, а цвет букв изменится,
        чтобы показать, насколько вы близки. Чтобы начать игру, просто введите
        любое слово, например:
      </p>
      <div className={styles.word}>
        <Letter status="letter_correct">Р</Letter>
        <Letter status="letter_correct">А</Letter>
        <Letter status="letter_outofplace">Д</Letter>
        <Letter status="letter_incorrect">И</Letter>
        <Letter status="letter_incorrect">О</Letter>
      </div>
      <p className={styles.text}>Рассмотрим поподробнее</p>
      <div>
        <div className={styles.word}>
          <Letter status="letter_incorrect">И</Letter>
          <Letter status="letter_incorrect">О</Letter>
        </div>
        <p className={styles.text}>точно нет в целевом слове</p>
        <div className={styles.word}>
          <Letter status="letter_outofplace">Д</Letter>
        </div>
        <p className={styles.text}>есть в слове, но не в том месте</p>
        <div className={styles.word}>
          <Letter status="letter_correct">Р</Letter>
          <Letter status="letter_correct">А</Letter>
        </div>
        <p className={styles.text}>есть в слове, и стоит на точном месте</p>
      </div>
      <p className={styles.text}>
        Еще одна попытка найти совпадающие буквы в целевом слове.
      </p>
      <div className={styles.word}>
        <Letter status="letter_correct">Р</Letter>
        <Letter status="letter_correct">Е</Letter>
        <Letter status="letter_incorrect">Ч</Letter>
        <Letter status="letter_correct">К</Letter>
        <Letter status="letter_correct">А</Letter>
      </div>
      <p className={styles.text}>Уже близко!</p>
      <div className={styles.word}>
        <Letter status="letter_correct">Р</Letter>
        <Letter status="letter_correct">Е</Letter>
        <Letter status="letter_correct">П</Letter>
        <Letter status="letter_correct">К</Letter>
        <Letter status="letter_correct">А</Letter>
      </div>
      <p className={styles.text}>Слово разгадано!🏆</p>
    </>
  );
}
