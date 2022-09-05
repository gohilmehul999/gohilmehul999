import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ApiserviceService } from './apiservice.service';

@Injectable({
  providedIn: 'root',
})
export class RoutingGuardGuard implements CanActivate {

  constructor(
    private router: Router,
    private api: ApiserviceService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      if(this.api.isloggedin()){
        return true;
      }
      else{
        this.router.navigate(['/login'])
      }
    return false;
  }
}
