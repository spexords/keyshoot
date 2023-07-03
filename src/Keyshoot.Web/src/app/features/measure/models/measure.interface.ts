import { TextLanguage } from './text-language.enum';
import { Word } from './word.interface';

export interface Measure {
  startTime: Date;
  endTime: Date;
  language: TextLanguage;
  pastWords: Word[];
  currentWord: Word;
  futureWords: Word[];
  accuracy: number;
  wordsPerMinute: number;
}
