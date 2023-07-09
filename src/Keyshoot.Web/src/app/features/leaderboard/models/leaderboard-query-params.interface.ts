import { Highscore } from './highscore.interface';

export interface LeaderboardQueryParams {
  language: string;
  player: string;
  order: 'ASC' | 'DESC';
  sort: keyof Highscore;
}
