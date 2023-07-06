import { IUseLetter } from '../../../types/types';
import styles from '../UI/Letter.module.scss';

export function useLetter({ status, children }: IUseLetter) {
  const letterClassname = children && styles[status];
  return { letterClassname };
}
