import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LeaderboardQueryParams } from './models';
import { LeaderboardService } from './leaderboard.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LeaderboardService],
})
export class LeaderboardComponent {
  private leaderboardService = inject(LeaderboardService);

  queryParams$ = this.leaderboardService.queryParams$;
  highscores$ = this.leaderboardService.highscores$;

  search(params: Partial<LeaderboardQueryParams>): void {
    this.leaderboardService.search(params);
  }
}
