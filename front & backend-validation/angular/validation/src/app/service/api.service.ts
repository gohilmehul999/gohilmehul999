import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse } from '@angular/common/http';
import { idText } from 'typescript';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  url = 'http://localhost:3000/api/saveData/';
  url2 = 'http://localhost:3000/api/';
  login = 'http://localhost:3000/api/login/';

  // registration form callback function
  postapi(data: any) {
    return this.http.post(this.url, data);
  }

  getapi() {
    return this.http.get(this.url2);
  }

  getapi1(id:any) {
    return this.http.get(this.url2+id);
  }

  rmvapi(id: any) {
    return this.http.delete(this.url + id);
  }

  updateapi(id: any, data: any) {
    return this.http.put(this.url + id, data);
  }
  // login form callback function
  getloginapi(data:any){
    return this.http.post(this.login,data);
  }
}
