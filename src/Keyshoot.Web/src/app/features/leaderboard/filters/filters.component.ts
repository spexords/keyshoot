import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FiltersFormGroup, HighscoresQueryParams } from '../models';
import { enumAsSelectOptions } from 'src/app/shared/utils';
import { TextLanguage } from '../../measure/models';
import { SelectOption } from 'src/app/shared/components/select/select-option.interface';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent {
  @Input({ required: true }) set params(queryParams: HighscoresQueryParams) {
    this.form.patchValue(queryParams);
  }
  @Output() paramsChanged = new EventEmitter<Partial<HighscoresQueryParams>>();

  languageOptions = enumAsSelectOptions(TextLanguage);
  orderOptions: SelectOption[] = [
    { value: 'ASC', displayValue: 'Ascending' },
    { value: 'DESC', displayValue: 'Descending' },
  ];
  form: FiltersFormGroup = new FormGroup({
    language: new FormControl(),
    player: new FormControl(),
    order: new FormControl(),
  });

  onSearch(): void {
    this.paramsChanged.emit(this.form.getRawValue());
  }
}
