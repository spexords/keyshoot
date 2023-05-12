export interface LeaderboardQueryParams {
  player: string;
  order: 'ASC' | 'DESC'
  //sort: keyof LeaderboardScore
}