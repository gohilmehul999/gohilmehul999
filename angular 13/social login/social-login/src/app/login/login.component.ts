import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user!: SocialUser;
  GoogleLoginProvider = GoogleLoginProvider;
  // loggedIn!: boolean;
  constructor(private authService: SocialAuthService) {}

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(this.user);

      // this.loggedIn = (user != null);
    });
  }

  refreshGoogleToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

  signin() {
    // console.log(GoogleLoginProvider.PROVIDER_ID);

    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
}
