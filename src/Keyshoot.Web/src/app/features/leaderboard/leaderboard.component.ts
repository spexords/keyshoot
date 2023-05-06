import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeaderboardComponent implements OnInit {
  currentPage = 1;
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      player: [''],
    });
  }

  onSubmit(): void {
    console.log(this.form.value)
  }
}
