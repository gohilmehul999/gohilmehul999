import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  {
    path:'',
    component:TableComponent
  },
  {
    path:'form',
    component:FormComponent
  }
  ,{
    path:'post',
    component:FormComponent
  },
  {
    path:'edit/:id',
    component:FormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
