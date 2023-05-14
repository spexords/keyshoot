import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authCodeFlowConfig = environment.authConfig as AuthConfig;
  private isAuthorizedSource: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );
  isAuthorized$: Observable<boolean> = this.isAuthorizedSource.asObservable();

  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(this.authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      this.oauthService.tryLoginImplicitFlow().then(() => {
        this.isAuthorizedSource.next(this.oauthService.hasValidAccessToken());
      });
    });
  }

  login(): void {
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      this.oauthService.tryLoginImplicitFlow().then(() => {
        if (!this.oauthService.hasValidAccessToken()) {
          this.oauthService.initLoginFlow();
        } else {
          this.oauthService.loadUserProfile().then(() => {
            this.isAuthorizedSource.next(true);
          });
        }
      });
    });
  }

  logout(): void {
    this.oauthService.logOut();
    this.isAuthorizedSource.next(false);
  }

  get userData(): string {
    const claims = this.oauthService.getIdentityClaims();
    return claims['id'] as string;
  }

  get token(): string {
    return this.oauthService.getAccessToken();
  }
}
