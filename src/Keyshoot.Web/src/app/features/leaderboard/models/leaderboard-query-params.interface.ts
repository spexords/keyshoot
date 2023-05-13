import { LeaderboardScore } from './leaderboard-score.interface';

export interface LeaderboardQueryParams {
  player: string;
  order: 'ASC' | 'DESC';
  sort: keyof LeaderboardScore;
}
