import { Measure, TextLanguage, WordState } from "./models";

export const MEASURE_PLACEHOLDER: Measure = Object.freeze({
  startTime: new Date('2023-07-27T15:00:00'),
  endTime: new Date('2023-07-27T15:00:00'),
  language: TextLanguage.Polish,
  pastWords: [
    {
      value: 'its',
      state: WordState.Valid,
    },
  ],
  currentWord: {
    value: 'all',
    state: WordState.Current,
  },
  futureWords: [
    {
      value: 'good',
      state: WordState.New,
    },
    {
      value: 'man',
      state: WordState.New,
    },
  ],
  accuracy: 100,
  wordsPerMinute: 60,
});
