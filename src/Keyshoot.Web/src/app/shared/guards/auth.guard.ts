import { Injectable } from '@angular/core';
import { Observable, first } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    this.authService.isAuthorized$.pipe(first()).subscribe((authorized) => {
      if (!authorized) {
        this.router.navigateByUrl('/forbidden');
      }
    });
    return this.authService.isAuthorized$;
  }
}
