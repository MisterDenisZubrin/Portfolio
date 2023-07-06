import { IRowObject } from 'components/Game/types/types';

// Keyboard

export interface IUseKeyboardProps {
  setKey: (arg: string) => void;
  lang: string;
  handleEscape: () => void;
}

export interface IEventKeypress {
  key: string;
}

export interface IKeyboardProps extends IUseKeyboardProps {
  alphabet: IRowObject[][];
}

// Key

export interface IUseKeyProps {
  children: string | JSX.Element;
  newLetter: (arg: string) => void;
}

export interface IKeyProps {
  className?: string;
  status?: string;
  newLetter: (arg: string) => void;
  children: string | JSX.Element;
}
