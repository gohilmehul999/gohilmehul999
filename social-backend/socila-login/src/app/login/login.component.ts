import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,private socialauthservice:SocialAuthService) { }

  ngOnInit(): void {
  }
  SignInwithGoogle(){
    this.socialauthservice.signIn(GoogleLoginProvider.PROVIDER_ID)
  }
}
