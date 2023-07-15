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
export class FiltersComponent implements OnInit {
  @Input({required: true}) defaultQueryParams!: Partial<HighscoresQueryParams>;
  @Input({ required: true }) set params(queryParams: HighscoresQueryParams) {
    const params = {
      ...this.defaultQueryParams,
      ...queryParams
    }
    this.form.patchValue(params);
  }
  @Output() paramsInitialized = new EventEmitter<HighscoresQueryParams>();
  @Output() paramsChanged = new EventEmitter<HighscoresQueryParams>();

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

  ngOnInit(): void {
    this.onInitialized();
  }

  onSearch(): void {
    this.paramsChanged.emit(this.form.getRawValue());
  }

  private onInitialized(): void {
    this.paramsInitialized.emit(this.form.getRawValue())
  }
}
