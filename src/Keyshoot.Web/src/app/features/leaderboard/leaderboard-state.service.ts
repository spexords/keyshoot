import { Injectable, inject } from '@angular/core';
import { HighscoresQueryParams } from './models';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { LeaderboardService } from './leaderboard.service';

@Injectable()
export class LeaderboardStateService {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private leaderboardService = inject(LeaderboardService);

  queryParams$ = this.route.queryParams as Observable<HighscoresQueryParams>;
  
  highscores$ = this.queryParams$.pipe(
    switchMap((params: Partial<HighscoresQueryParams>) =>
      this.leaderboardService.getHighscores(params)
    )
  );

  search(params: Partial<HighscoresQueryParams>): void {
    console.log(params);
    this.router.navigate(['.'], {
      queryParams: params,
      relativeTo: this.route,
    });
  }
}
