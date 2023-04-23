import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/features/account/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  isAuthorized$!: Observable<boolean>

  constructor(private accountService: AccountService) {}

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
