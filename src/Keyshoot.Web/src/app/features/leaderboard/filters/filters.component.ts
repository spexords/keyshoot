import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FiltersFormGroup, LeaderboardQueryParams } from '../models';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent {
  @Input({ required: true }) set params(params: LeaderboardQueryParams) {
    this.form.patchValue(params);
  }
  @Output() paramsChanges = new EventEmitter<LeaderboardQueryParams>();

  form: FiltersFormGroup = new FormGroup({
    language: new FormControl(),
    player: new FormControl(),
    order: new FormControl(),
    sort: new FormControl(),
  });

  onSubmit() {
    this.paramsChanges.emit(this.form.getRawValue())
  }
}
