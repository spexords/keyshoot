import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaderboardComponent } from './leaderboard.component';
import { LeaderboardRoutingModule } from './leaderboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [LeaderboardComponent],
  imports: [
    CommonModule,
    LeaderboardRoutingModule,
    SharedModule,
    MatPaginatorModule,
  ],
})
export class LeaderboardModule {}
