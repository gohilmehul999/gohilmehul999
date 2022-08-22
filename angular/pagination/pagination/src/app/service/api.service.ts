import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url: any = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private http: HttpClient) {

  }
  getdata(){
    return this.http.get(this.url);
  }
}
