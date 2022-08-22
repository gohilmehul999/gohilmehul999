import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ReactiveComponent } from './reactive/reactive.component';
import { TableComponent } from './table/table.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path: 'reactive/:id',
    component: ReactiveComponent,
  },
  {
    path: 'table',
    component: TableComponent,
  },
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'registration',
    component: ReactiveComponent,
  },
  {
    path: 'view/:id',
    component: ViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
