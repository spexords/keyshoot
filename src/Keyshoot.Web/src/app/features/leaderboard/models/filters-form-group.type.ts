import { FormControl, FormGroup } from "@angular/forms";

export type FiltersFormGroup = FormGroup<{
  language: FormControl<number>;
  player: FormControl<string>;
  order: FormControl<string>;
}>