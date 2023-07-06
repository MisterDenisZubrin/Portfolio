import { IRowObject } from 'components/Game/types/types';

// Gamefield

export type TypeWords = {
  words: IRowObject[][];
  clearCurrentLetter: () => void;
};

// Letter

export interface IUseLetter {
  status: string;
  children: string;
}
