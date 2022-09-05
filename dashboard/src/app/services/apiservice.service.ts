import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthtokenService } from './authtoken.service';

@Injectable({
  providedIn: 'root',
})
export class ApiserviceService {
  constructor(private http: HttpClient, private tokenapi: AuthtokenService) {}
  login_url = 'http://localhost:8000/api/login';
  profilebase = 'http://localhost:8000/api/profile';
  order = 'http://localhost:8000/api/orders';
  login(data: any) {
    return this.http.post(this.login_url, data);
  }
  isloggedin() {
    if (this.tokenapi.gettoken()) {
      return true;
    } else {
      return false;
    }
  }
  
  showorder() {
    return this.http.get(this.order);
  }
  profile() {
    return this.http.get(this.profilebase);
  }
}
