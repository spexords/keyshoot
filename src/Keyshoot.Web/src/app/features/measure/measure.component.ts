import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MeasureService } from './measure.service';
import { MatDialog } from '@angular/material/dialog';
import { NewMeasureModalComponent } from './new-measure-modal/new-measure-modal.component';
import { Router } from '@angular/router';
import { TextLanguage } from './models';

@Component({
  selector: 'app-measure',
  templateUrl: './measure.component.html',
  styleUrls: ['./measure.component.scss'],
  providers: [MeasureService],
})
export class MeasureComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private measureService = inject(MeasureService);

  measure$ = this.measureService.measure$;
  timer$ = this.measureService.timer$;

  ngOnInit(): void {
    this.measureService
      .start()
      .then(() => {
        this.configureModal();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  ngOnDestroy(): void {
    this.measureService.stop();
  }

  onWordSubmitted(input: string): void {
    this.measureService.updateMeasure(input);
  }

  private configureModal(): void {
    const dialogRef = this.dialog.open(NewMeasureModalComponent);
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.measureService.createMeasure({ language: TextLanguage.Polish });
      } else {
        this.router.navigate(['/']);
      }
    });
  }
}
