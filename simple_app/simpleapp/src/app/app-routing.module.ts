import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterComponent } from './master/master.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import {ActiveGuard} from './active.guard'
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: MasterComponent, canActivate:[ActiveGuard]
  },
  {
    path: '',
    component: AuthenticateComponent,
  },
  {
    path:'profile',
    component:UserProfileComponent,canActivate:[ActiveGuard]
  },{
    path: 'login',
     component: AuthenticateComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
