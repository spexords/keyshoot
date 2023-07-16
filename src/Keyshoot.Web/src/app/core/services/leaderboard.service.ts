import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_URL } from 'src/app/core/tokens/api-url.token';
import { Highscore, HighscoresQueryParams, PagedResult } from '../../features/leaderboard/models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LeaderboardService {
  private leaderboardUrl = `${inject(API_URL)}/leaderboard`;
  private http = inject(HttpClient);

  getPagedHighscores(
    queryParams: Partial<HighscoresQueryParams>
  ): Observable<PagedResult<Highscore>> {
    let params = new HttpParams();
    Object.entries(queryParams).forEach(
      ([key, value]) => (params = params.append(key, value))
    );
    return this.http.get<PagedResult<Highscore>>(this.leaderboardUrl, { params });
  }
}
