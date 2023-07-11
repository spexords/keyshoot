import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_URL } from 'src/app/core/tokens/api-url.token';
import { Highscore, HighscoresQueryParams } from './models';
import { Observable } from 'rxjs';
import { TextLanguage } from '../measure/models';

@Injectable({ providedIn: 'root' })
export class LeaderboardService {
  private readonly defaultQueryParams: HighscoresQueryParams = {
    language: TextLanguage[TextLanguage.Polish],
    player: '',
    order: 'DESC',
  };
  private leaderboardUrl = `${inject(API_URL)}/leaderboard`;
  private http = inject(HttpClient);

  getHighscores(
    queryParams: Partial<HighscoresQueryParams>
  ): Observable<Highscore[]> {
    const mergedParams = {...this.defaultQueryParams,  ...queryParams};
    let params = new HttpParams();
    Object.entries(mergedParams).forEach(
      ([key, value]) => (params = params.append(key, value))
    );
    return this.http.get<Highscore[]>(this.leaderboardUrl, { params });
  }
}
