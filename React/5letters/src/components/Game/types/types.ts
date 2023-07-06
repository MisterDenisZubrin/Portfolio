export interface IRowObject {
  id: number | string; // Костыль?
  status: string;
  letter: string;
}

export interface IGameProps {
  isGameLost: boolean;
  setisGameLost: (status: boolean) => void;
  alphabet: IRowObject[][];
  setAlphabet: (value: IRowObject[][]) => void;
  lang: string;
  rowNumber: number;
  restartStatus: boolean;
  setRestartStatus: (status: boolean) => void;
  handleEscape: () => void;
  escape: boolean;
  setEscape: (status: boolean) => void;
}

// useGame

export interface IUseGameProps {
  isGameLost: boolean;
  setisGameLost: (status: boolean) => void;
  alphabet: IRowObject[][];
  setAlphabet: (value: IRowObject[][]) => void;
  lang: string;
  rowNumber: number;
  restartStatus: boolean;
  setRestartStatus: (status: boolean) => void;
  escape: boolean;
  setEscape: (status: boolean) => void;
}
