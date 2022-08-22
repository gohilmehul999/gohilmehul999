import { Component, OnInit } from '@angular/core';
import { GoogleApiService } from '../google-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userinfo: any;
  constructor(private readonly googleapi: GoogleApiService) {
    googleapi.userprofilesubject.subscribe((info) => {
      this.userinfo = info;
    });
  }

  ngOnInit(): void {}
  islogin() {
    return this.googleapi.IsLogIn();
  }
  islogout() {
    this.googleapi.IsLogOut();
  }
}
