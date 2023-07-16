import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.token;
    console.log(token)
    // if(token) {
    //   request = request.clone({
    //     setHeaders: {
    //       Authorize: `Bearer ${this.authService.token}`
    //     }
    //   })
    // }
    
    
    return next.handle(request);
  }
}
