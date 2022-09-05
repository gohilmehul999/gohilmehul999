import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './service/api.service';

@Injectable({
  providedIn: 'root',
})
export class ActiveGuard implements CanActivate {
  // constructor
  constructor(
    private router: Router,
    private api: ApiService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.api.isloggedin()) {
      console.log('LOGIN');
      return true;
    } else {
      this.router.navigate(['/notFound']);
    }
    if(this.api.isprofile()){
      return true;
    }
    else{
      return this.router.navigate(['/notFound']);
    }

    return false;
  }
}
