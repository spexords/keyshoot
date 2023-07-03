import { WordState } from './word-state.enum';

export interface Word {
  value: string;
  state: WordState;
}
