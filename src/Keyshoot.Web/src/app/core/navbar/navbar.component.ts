import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Params } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  private authService = inject(AuthService);
  isAuthorized$ = this.authService.isAuthorized$;

  login(): void {
    this.authService.login();
  }

  logout(): void {
    this.authService.logout();
  }
}
