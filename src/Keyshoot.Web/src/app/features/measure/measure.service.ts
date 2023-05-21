import { Injectable, inject } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { AuthService } from '../../core/services/auth.service';
import { HUBS_URL } from '../../core/tokens/hub-url.token';

@Injectable()
export class MeasureService {
  private authService = inject(AuthService);
  private measureUrl = `${inject(HUBS_URL)}/measure`;
  private hubConnection: HubConnection | null = null;

  start(): Promise<void> {
    console.log(this.measureUrl);
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.measureUrl, {
        accessTokenFactory: () => this.authService.token,
      })
      .build();
    return this.hubConnection.start();
  }

  stop(): void {
    this.hubConnection?.stop();
  }
}
