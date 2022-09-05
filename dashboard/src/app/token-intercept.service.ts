import { Injectable, Injector } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { AuthtokenService } from './services/authtoken.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptService {
  constructor(private injector: Injector) {}
  intercept(req:any, next:any) {
    req = this.addauthheader(req);
    // console.log(req);

    return next.handle(req);
  }
  addauthheader(req:any) {
    const tokenservice = this.injector.get(AuthtokenService);
    let token = tokenservice.gettoken();
    if (token) {
      // append the access token to the request header
      return req.clone({
        setHeaders: {
          'x-access-token': token,
        },
      });
    }
    // console.log('sec',req);

    return req;

  }
}
