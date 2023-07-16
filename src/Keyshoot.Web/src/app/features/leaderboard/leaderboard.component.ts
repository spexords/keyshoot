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

  queryParams$ = this.lsService.queryParams$;
  pagedHighscores$ = this.lsService.pagedHighscores$;

  constructor() {
    this.lsService.setDefaultQueryParamsIfEmpty();
  }

  search(params: Partial<HighscoresQueryParams>): void {
    console.log(params);
    this.lsService.search(params);
  }
}
