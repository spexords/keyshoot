import { Component, OnDestroy, OnInit } from '@angular/core';
import { LobbyService } from './core/services/lobby.service';
import { AuthService } from './core/services/auth.service';
import { Subscription, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;

  constructor(
    private authService: AuthService,
    private lobbyService: LobbyService
  ) {}

  ngOnInit(): void {
    this.subscription = this.authService.isAuthorized$
      .pipe(distinctUntilChanged())
      .subscribe((authorized) => {
        console.log(authorized);
        if (authorized) {
          this.lobbyService.start();
        } else {
          this.lobbyService.stop();
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
