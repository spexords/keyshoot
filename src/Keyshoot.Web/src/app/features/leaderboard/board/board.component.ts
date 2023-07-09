import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Highscore } from '../models';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent {
  @Input({required: true}) highscores!: Highscore[];
}
