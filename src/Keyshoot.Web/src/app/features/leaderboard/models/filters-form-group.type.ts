import { FormControl, FormGroup } from "@angular/forms";

export type FiltersFormGroup = FormGroup<{
  language: FormControl<string>;
  player: FormControl<string>;
  order: FormControl<string>;
}>