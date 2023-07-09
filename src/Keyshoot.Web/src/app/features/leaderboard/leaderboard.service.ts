import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_URL } from 'src/app/core/tokens/api-url.token';
import { Highscore, LeaderboardQueryParams } from './models';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class LeaderboardService {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private highscoresUrl = `${inject(API_URL)}/highscores`;
  private http = inject(HttpClient);

  queryParams$ = this.route.queryParams as Observable<LeaderboardQueryParams>;
  highscores$ = this.http.get<Highscore[]>(this.highscoresUrl);

  search(params: Partial<LeaderboardQueryParams>): void {
    this.router.navigate(['.'], {
      queryParams: params,
      relativeTo: this.route,
    });
  }
}
