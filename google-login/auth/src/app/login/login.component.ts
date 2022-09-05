import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider,FacebookLoginProvider} from '@abacritt/angularx-social-login';
import { SocialUser } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user!:SocialUser
  socialUserFB!:SocialUser
  isLoggedin:boolean = false;
  constructor(private authService: SocialAuthService,private router: Router) {
    this.authService.authState.subscribe((user)=>{
      this.user = user;
      // this.isLoggedin = user != null;
      // console.log(this.user);
    })
    console.log(this.isLoggedin);
  }
  signInWithGoogle(): void {
    console.log('hi');


    alert(this.user)
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(()=>{
      alert(this.user);
    });
  }
  loginWithFacebook(){
// console.log('call');
this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);

  }
  signOut(): void {
    this.authService.signOut();
  }

  ngOnInit(): void {}
}
