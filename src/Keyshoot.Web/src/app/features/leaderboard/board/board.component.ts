import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Highscore, HighscoresQueryParams, PagedResult } from '../models';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent {
  @Input({required: true}) pagedHighscores!: PagedResult<Highscore>
  @Output() paginationChanged = new EventEmitter<Partial<HighscoresQueryParams>>();
  
  pageSizeOptions = [10, 20, 50];

  onPaginationChange(event: PageEvent): void {
    this.paginationChanged.emit({
      pageSize: event.pageSize,
      pageIndex: event.pageIndex
    })
  }
}
