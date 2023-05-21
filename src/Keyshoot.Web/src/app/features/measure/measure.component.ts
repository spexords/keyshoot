import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { MeasureService } from './measure.service';
import { MatDialog } from '@angular/material/dialog';
import { NewMeasureModalComponent } from './new-measure-modal/new-measure-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-measure',
  templateUrl: './measure.component.html',
  styleUrls: ['./measure.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MeasureService],
})
export class MeasureComponent implements OnInit {
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private measureService = inject(MeasureService);

  ngOnInit(): void {
    this.measureService
      .start()
      .then(() => {
        this.configureModal();
      })
      .catch((err) => {
        console.log('Could not join measure hub');
      });
  }

  private configureModal() {
    const dialogRef = this.dialog.open(NewMeasureModalComponent);
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
      } else {
        this.router.navigate(['/']);
      }
    });
  }
}
