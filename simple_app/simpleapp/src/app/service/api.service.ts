import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthTokenService } from './auth-token.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private authtoken: AuthTokenService) {}
  baseurl = 'http://localhost:8080/api/login';
  profile = 'http://localhost:8080/api/myprofile';

  getloginapi(data: any) {
    return this.http.post(this.baseurl, data);
  }

  isloggedin() {
    if (this.authtoken.getAuthToken()) {
      return true;
    } else {
      return false;
    }
  }

  getuser(){
  return  this.http.get(this.profile);
  }

  updateprofile(data:any){
    return this.http.put(this.profile,data);
  }

  isprofile(){
    if(this.authtoken.getAuthToken()){
      return true;
    }else{
      return false;
    }
  }

  userlogout(){
    this.authtoken.removetoken();
  }

  userdelete(){
    return this.http.delete(this.profile);
  }

}
