import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LobbyService {
  private _hubConnection: HubConnection | null = null;
  private _url = `${environment.hubUrl}lobby`;

  constructor(private authService: AuthService) {}

  start() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(this._url, { accessTokenFactory: () => this.authService.token })
      .build();
    this._hubConnection.start().catch((err) => console.log(err));
  }

  stop() {
    this._hubConnection?.stop();
  }
}
