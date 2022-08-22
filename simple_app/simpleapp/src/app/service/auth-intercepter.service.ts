import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor,HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { AuthTokenService } from './auth-token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthIntercepterService implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(req:any, next:any) {
    req = this.addAuthHeader(req);
    return next.handle(req);
  }
  addAuthHeader(req:any){
    const tokenservice = this.injector.get(AuthTokenService)
    let token = tokenservice.getAuthToken();
    if (token) {
      // append the access token to the request header
      return req.clone({
        setHeaders: {
          'x-access-token': token
        }
      });
    }
    return req;
  }
}
