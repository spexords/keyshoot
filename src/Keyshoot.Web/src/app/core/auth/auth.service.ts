import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authCodeFlowConfig = environment.authConfig as AuthConfig;
  private _isAuthorizedSource: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );
  isAuthorized$: Observable<boolean> = this._isAuthorizedSource.asObservable();

  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(this._authCodeFlowConfig);
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
