import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaderboardComponent } from './leaderboard.component';
import { LeaderboardRoutingModule } from './leaderboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FiltersComponent } from './filters/filters.component';
import { BoardComponent } from './board/board.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [LeaderboardComponent, FiltersComponent, BoardComponent],
  imports: [
    CommonModule,
    LeaderboardRoutingModule,
    SharedModule,
    MatPaginatorModule,
    ScrollingModule
  ],
})
export class LeaderboardModule {}
