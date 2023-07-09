import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { MeasureService } from './measure.service';
import { MatDialog } from '@angular/material/dialog';
import { NewMeasureModalComponent } from './new-measure-modal/new-measure-modal.component';
import { Router } from '@angular/router';
import { MeasureOptions } from './models';
import { TextTyperComponent } from './text-typer/text-typer.component';

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

  @ViewChild('textTyper') textTyper!: TextTyperComponent;

  ngOnInit(): void {
    this.startMeasureService();
  }

  ngOnDestroy(): void {
    this.measureService.stop();
  }

  onWordSubmitted(input: string): void {
    this.measureService.updateMeasure(input);
  }

  private startMeasureService(): void {
    this.measureService
      .start()
      .then(() => {
        this.configureModal();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  private configureModal(): void {
    const dialogRef = this.dialog.open(NewMeasureModalComponent);
    dialogRef.afterClosed().subscribe((measureOptions: MeasureOptions) => {
      if (measureOptions) {
        this.measureService.createMeasure(measureOptions);
        this.textTyper.focus();
      } else {
        this.router.navigate(['/']);
      }
    });
  }
}
