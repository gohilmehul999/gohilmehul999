import { HttpErrorResponse,HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  url: any = 'http://localhost:4201/api/user/';

  getuserinfo() {
    return this.http.get(this.url);
  }

  getuserinfoid(id:any) {
    return this.http.get(this.url + id,id);
  }

  postuserinfo(data: any) {
    return this.http.post(this.url, data);
  }

  putuserinfo(id: any, data: any) {
    return this.http.put(this.url + id, data);
  }

  deleteuserinfo(id: any) {
    return this.http.delete(this.url + id);
  }
}
