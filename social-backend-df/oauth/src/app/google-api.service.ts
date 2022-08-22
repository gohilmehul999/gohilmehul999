import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Subject } from 'rxjs';

const oauthconfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  clientId:
    '278314521098-5def5ppcke5ghsdk7bk0elfh7genvdcg.apps.googleusercontent.com',
  scope: 'openid profile email',
};
@Injectable({
  providedIn: 'root',
})
export class GoogleApiService {
  userprofilesubject = new Subject();
  constructor(private readonly oauth: OAuthService) {
    oauth.configure(oauthconfig);
    oauth.loginUrl = 'https://www.google.com/accounts/Logout';
    oauth.loadDiscoveryDocument().then(() => {
      oauth.tryLoginImplicitFlow().then(() => {
        if(!oauth.hasValidAccessToken()){
            oauth.initLoginFlow()
        }else{
          oauth.loadUserProfile().then((profile)=>{
              console.log(JSON.stringify(profile));
              this.userprofilesubject.next(profile)
          })
        }
      });
    });
  }

  IsLogIn(){
    return this.oauth.hasValidAccessToken();
  }

  IsLogOut(){
    this.oauth.logOut();
  }
}
