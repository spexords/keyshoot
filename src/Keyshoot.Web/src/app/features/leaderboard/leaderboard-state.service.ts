import { Injectable, inject } from '@angular/core';
import { HighscoresQueryParams } from './models';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, first, switchMap } from 'rxjs';
import { LeaderboardService } from '../../core/services/leaderboard.service';
import { TextLanguage } from '../measure/models';
import { isEmpty } from 'lodash';

@Injectable()
export class LeaderboardStateService {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private leaderboardService = inject(LeaderboardService);
  private lastQueryParams!: HighscoresQueryParams;

  queryParams$ = this.route.queryParams as Observable<HighscoresQueryParams>;
  pagedHighscores$ = this.queryParams$.pipe(
    switchMap((params: Partial<HighscoresQueryParams>) =>
      this.leaderboardService.getPagedHighscores(params)
    )
  );

  setDefaultQueryParamsIfEmpty(): void {
    this.queryParams$.pipe(first()).subscribe((params) => {
      if (isEmpty(params)) {
        this.search({
          language: TextLanguage.Polish,
          order: 'DESC',
          pageIndex: 0,
          pageSize: 10,
        });
      }
    });
  }

  search(params: Partial<HighscoresQueryParams>): void {
    const queryParams = {...this.lastQueryParams, ...params}
    this.router.navigate(['.'], {
      queryParams,
      relativeTo: this.route,
    });
    this.lastQueryParams = queryParams;
  }
}
