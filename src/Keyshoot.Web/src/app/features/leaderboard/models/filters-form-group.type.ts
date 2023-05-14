import { FormControl, FormGroup } from "@angular/forms";
import { LeaderboardScore } from "./leaderboard-score.interface";

export type FiltersFormGroup = FormGroup<{
  player: FormControl<string>;
  order: FormControl<"ASC" | "DESC">;
  sort: FormControl<keyof LeaderboardScore>;
}>