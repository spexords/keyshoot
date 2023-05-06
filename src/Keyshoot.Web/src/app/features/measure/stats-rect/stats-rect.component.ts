import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-stats-rect',
  templateUrl: './stats-rect.component.html',
  styleUrls: ['./stats-rect.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsRectComponent {
  @Input() value!: string;
  @Input() label!: string;
}
