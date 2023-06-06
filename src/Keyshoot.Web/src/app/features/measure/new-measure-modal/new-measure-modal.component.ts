import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-measure-modal',
  templateUrl: './new-measure-modal.component.html',
  styleUrls: ['./new-measure-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewMeasureModalComponent {
  private dialogRef = inject(MatDialogRef<NewMeasureModalComponent>);

  create(): void {
    this.dialogRef.close({ xd: 3 });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
