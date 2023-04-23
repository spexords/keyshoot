import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject, Observable } from 'rxjs';

const authCodeFlowConfig: AuthConfig = {
  issuer: 'https://localhost:7001',

  // URL of the SPA to redirect the user to after login
  redirectUri: 'http://localhost:4200',

  // The SPA's id. The SPA is registerd with this id at the auth-server
  // clientId: 'server.code',
  clientId: 'web',

  // Just needed if your auth server demands a secret. In general, this
  // is a sign that the auth server is not configured with SPAs in mind
  // and it might not enforce further best practices vital for security
  // such applications.pp
  // dummyClientSecret: 'secret',

  responseType: 'id_token token',

  // set the scope for the permissions the client should request
  // The first four are defined by OIDC.
  // Important: Request offline_access to get a refresh token
  // The api scope is a usecase specific one
  scope: 'openid api',

  postLogoutRedirectUri: 'http://localhost:4200',

  showDebugInformation: true,
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isAuthorizedSource: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );
  isAuthorized$: Observable<boolean> = this._isAuthorizedSource.asObservable();

  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      this.oauthService.tryLoginImplicitFlow().then(() => {
        this._isAuthorizedSource.next(this.oauthService.hasValidAccessToken());
      });
    });
  }

  login(): void {
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      this.oauthService.tryLoginImplicitFlow().then(() => {
        if (!this.oauthService.hasValidAccessToken()) {
          this.oauthService.initLoginFlow();
        } else {
          this.oauthService.loadUserProfile().then((profile) => {
            console.log(profile);
            this._isAuthorizedSource.next(true);
          });
        }
      });
    });
  }

  logout(): void {
    this.oauthService.logOut();
    this._isAuthorizedSource.next(false);
  }

  get userData(): string {
    const claims = this.oauthService.getIdentityClaims();
    return claims['id'] as string;
  }
}
