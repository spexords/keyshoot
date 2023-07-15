import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HighscoresQueryParams } from './models';
import { LeaderboardStateService } from './leaderboard-state.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LeaderboardStateService],
})
export class LeaderboardComponent {
  private lsService = inject(LeaderboardStateService);

  defaultQueryParams = this.lsService.defaultQueryParams;
  queryParams$ = this.lsService.queryParams$;
  highscores$ = this.lsService.highscores$;

  search(params: Partial<HighscoresQueryParams>, reload: boolean = true): void {
    this.lsService.search(params, reload);
  }
}
