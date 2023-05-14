import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LeaderboardQueryParams } from './models';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeaderboardComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  queryParmas = this.route.queryParams as Observable<LeaderboardQueryParams>;

  paramsChange(params: Partial<LeaderboardQueryParams>): void {
    this.router.navigate(['.'], {
      queryParams: params,
      relativeTo: this.route,
    });
  }
}
