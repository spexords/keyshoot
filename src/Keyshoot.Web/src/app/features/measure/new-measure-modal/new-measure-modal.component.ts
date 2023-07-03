import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TextLanguage } from '../models';
import { SelectOption, enumAsSelectOptions } from 'src/app/shared/utils';

@Component({
  selector: 'app-new-measure-modal',
  templateUrl: './new-measure-modal.component.html',
  styleUrls: ['./new-measure-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewMeasureModalComponent {
  private dialogRef = inject(MatDialogRef<NewMeasureModalComponent>);

  options: SelectOption[] = enumAsSelectOptions(TextLanguage);

  selectedValue = this.options[0].value;

  create(): void {
    this.dialogRef.close({ language: this.selectedValue });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
