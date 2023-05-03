import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  isAuthorized$!: Observable<boolean>

  constructor(private accountService: AuthService) {}

  ngOnInit(): void {
    this.isAuthorized$ = this.accountService.isAuthorized$;
  }

  login(): void {
    this.accountService.login();
  }

  logout(): void {
    this.accountService.logout();
  }
}
