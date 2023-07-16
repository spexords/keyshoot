import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TextLanguage } from '../models';
import {  enumAsSelectOptions } from 'src/app/shared/utils';
import { SelectOption } from 'src/app/shared/components/select/select-option.interface';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-measure-modal',
  templateUrl: './new-measure-modal.component.html',
  styleUrls: ['./new-measure-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewMeasureModalComponent {
  private dialogRef = inject(MatDialogRef<NewMeasureModalComponent>);

  options: SelectOption[] = enumAsSelectOptions(TextLanguage);
  selectedOption = new FormControl(this.options[0].value);


  create(): void {
    this.dialogRef.close({ language: this.selectedOption.value });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
