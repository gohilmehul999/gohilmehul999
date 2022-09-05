import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PagesComponent } from './pages/pages.component';
import { RegisterComponent } from './register/register.component';
import { RoutingGuardGuard } from './services/routing-guard.guard';
import { AddOrderComponent } from './add-order/add-order.component';
import { OredrManageComponent } from './oredr-manage/oredr-manage.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { CartnowComponent } from './cartnow/cartnow.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    // canActivate:[RoutingGuardGuard]
  },
  {
    path: 'registartion',
    component: RegisterComponent,
  },
  {
    path: 'admin',
    component: HomeComponent,
    canActivate: [RoutingGuardGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: PagesComponent,
      },
      {
        path: 'cart',
        component: CartnowComponent,
      },
      {
        path: 'order',
        component: AddOrderComponent,
      },
      {
        path: 'manage',
        component: OredrManageComponent,
      },
      {
        path: 'product',
        component: AddProductComponent,
      },
      {
        path: 'manage_product',
        component: ManageProductComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
