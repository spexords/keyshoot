import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MeasureFinished } from '../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finished-measure-modal',
  templateUrl: './finished-measure-modal.component.html',
  styleUrls: ['./finished-measure-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinishedMeasureModalComponent implements OnInit {
  private dialogRef = inject(MatDialogRef<FinishedMeasureModalComponent>);
  private router = inject(Router);
  measure: MeasureFinished = inject(MAT_DIALOG_DATA);

  ngOnInit(): void {
    this.dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
