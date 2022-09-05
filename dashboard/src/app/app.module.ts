import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MainContentComponent } from './main-content/main-content.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { PagesComponent } from './pages/pages.component';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AddOrderComponent } from './add-order/add-order.component';
import { OredrManageComponent } from './oredr-manage/oredr-manage.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { AddProductComponent } from './add-product/add-product.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ApiserviceService } from './services/apiservice.service';
import { AuthtokenService } from './services/authtoken.service';
import { TokenInterceptService } from './token-intercept.service';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CartnowComponent } from './cartnow/cartnow.component';
import {MatBadgeModule} from '@angular/material/badge'
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainContentComponent,
    SidenavComponent,
    PagesComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    AddOrderComponent,
    OredrManageComponent,
    AddProductComponent,
    ManageProductComponent,
    CartnowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatBadgeModule,
    FormsModule,
    MatTableModule,
    MatCardModule,
    MatCheckboxModule,
  ],
  providers: [
    ApiserviceService,
    AuthtokenService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
