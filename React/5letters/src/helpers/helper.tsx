import { IRowObject } from 'components/Game/types/types';

import Letter from '../components/Game/components/Gamefield/components/Letter';

export function getClassName(...classNames: string[]) {
  return classNames.filter((classname) => classname).join(' ');
}

export function generateField(arr: IRowObject[][]) {
  const markup = [];
  for (let i = 0; i < arr.length; i += 1) {
    for (let k = 0; k < arr[i].length; k += 1) {
      markup.push(
        <Letter key={arr[i][k].id} status={arr[i][k].status}>
          {arr[i][k].letter}
        </Letter>
      );
    }
  }
  return markup;
}
