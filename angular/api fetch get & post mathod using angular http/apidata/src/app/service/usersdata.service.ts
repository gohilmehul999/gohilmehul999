import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UsersdataService {

  constructor(private http:HttpClient) { }
  url:any = "https://jsonplaceholder.typicode.com/users";
  users(){
    return this.http.get(this.url)
  }
  saveusers(data:any){
    return this.http.post(this.url,data)
  }
}
