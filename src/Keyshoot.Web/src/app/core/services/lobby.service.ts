import { Injectable, inject } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { AuthService } from './auth.service';
import { HUBS_URL } from '../tokens/hub-url.token';

@Injectable({
  providedIn: 'root',
})
export class LobbyService {
  private authService = inject(AuthService);
  private lobbyUrl = `${inject(HUBS_URL)}/lobby`;
  private hubConnection: HubConnection | null = null;

  start(): void {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.lobbyUrl, { accessTokenFactory: () => this.authService.token })
      .build();
    this.hubConnection.start().catch((err) => console.log(err));
  }

  stop(): void {
    this.hubConnection?.stop();
  }
}
