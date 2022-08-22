import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MasterComponent } from './master/master.component';
import {MatButtonModule} from '@angular/material/button';
import { AuthenticateComponent } from './authenticate/authenticate.component'
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http'
import { ApiService } from './service/api.service';
import { AuthTokenService } from './service/auth-token.service';
import { AuthIntercepterService } from './service/auth-intercepter.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {MatSidenavModule} from '@angular/material/sidenav';

@NgModule({
  declarations: [
    AppComponent,
    MasterComponent,
    AuthenticateComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatSidenavModule
  ],
  providers: [ApiService,AuthTokenService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthIntercepterService,
    multi: true
    }],

  bootstrap: [AppComponent]
})
export class AppModule { }
