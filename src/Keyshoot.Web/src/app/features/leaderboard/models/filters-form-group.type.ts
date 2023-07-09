import { FormControl, FormGroup } from "@angular/forms";
import { Highscore } from "./highscore.interface";

export type FiltersFormGroup = FormGroup<{
  language: FormControl<string>;
  player: FormControl<string>;
  order: FormControl<"ASC" | "DESC">;
  sort: FormControl<keyof Highscore>;
}>