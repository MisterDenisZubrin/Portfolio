export interface IModalProps {
  active: boolean;
  setActive: (arg: boolean) => void;
  children: string | JSX.Element;
}
