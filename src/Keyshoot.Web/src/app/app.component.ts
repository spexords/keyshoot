import { Component, inject } from '@angular/core';
import { LobbyService } from './core/services/lobby.service';
import { AuthService } from './core/services/auth.service';
import { distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private authService = inject(AuthService);
  private lobbyService = inject(LobbyService);

  constructor() {
    this.authService.isAuthorized$
      .pipe(distinctUntilChanged(), takeUntilDestroyed())
      .subscribe((authorized) => {
        if (authorized) {
          this.lobbyService.start();
        } else {
          this.lobbyService.stop();
        }
      });
  }
}
