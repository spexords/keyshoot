import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  data: any;

  constructor(private accountService: AuthService) {}

  ngOnInit(): void {
    this.data = this.accountService.userData;
  }
}
