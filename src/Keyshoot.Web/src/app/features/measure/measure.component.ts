import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-measure',
  templateUrl: './measure.component.html',
  styleUrls: ['./measure.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeasureComponent {}
