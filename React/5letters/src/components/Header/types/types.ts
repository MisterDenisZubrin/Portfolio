// Header

export interface IHeaderProps {
  gameIsLost: (game: boolean) => void;
  rowNumber: number;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRestart: (param: boolean) => void;
  escape: boolean;
  setEscape: (param: boolean) => void;
}

export interface IUseHeaderProps {
  escape: boolean;
  setEscape: (param: boolean) => void;
}

// SettingWindow

export interface ISettingWindowProps {
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rowNumber: number;
}
