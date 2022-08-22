import { Injectable } from '@angular/core';
import { HttpErrorResponse,HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  url: any = 'http://localhost:8000/api/';
  url2: any = 'http://localhost:8000/api/upload/';
  url3:any = 'http://localhost:8000/api/upload/?user_file';
  para:any = 'uplaod'
  getimage() {
    return this.http.get(this.url2);
  }

  postimage(data: any) {
    return this.http.post(this.url2, data);
  }

  putimage(id: any, data: any) {
    return this.http.put(this.url2 + id, data);
  }

  deleteimage(id: any) {
    return this.http.delete('http://localhost:8000/api/upload/' + id, id);
  }
}
