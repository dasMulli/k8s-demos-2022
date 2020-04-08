import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private oAuthService: OAuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.oAuthService.hasValidAccessToken()) {
      const headers = req.headers.set('Authorization', 'Bearer ' + this.oAuthService.getAccessToken());
      const authenticatedRequest = req.clone({headers});
      return next.handle(authenticatedRequest);
    } else {
      return next.handle(req);
    }
  }
}
