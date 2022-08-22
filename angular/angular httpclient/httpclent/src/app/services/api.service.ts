import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private Http: HttpClient) {}
  // url:any = 'https://jsonplaceholder.typicode.com/users';
  // url:any='../data/user.json';
  url: any = 'http://localhost:8080/api/user/';
  urlid: any = 'http://localhost:8080/api/user/';

  getdata() {
    return this.Http.get(this.url);
  }
  getdataid(id: any) {
    console.log('id', id);
    return this.Http.get('http://localhost:8080/api/user/' + id);
  }
  postdata(data: any) {
    return this.Http.post(this.url, data);
  }
  putdata(data: any, id:any) {
    console.log("data:",data);
     const all = this.Http.put('http://localhost:8080/api/user/'+id,data);
    // console.log(all);
     return all;
    // console.log("api put data",data)
  }

  deletedata(id:any) {
     const all = this.Http.delete('http://localhost:8080/api/user/'+id,id);
     return all;
  }

}
