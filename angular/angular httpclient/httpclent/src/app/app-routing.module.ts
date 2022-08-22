import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeletComponent } from './delet/delet.component';
import { FormComponent } from './form/form.component';
import { HttpmethodComponent } from './httpmethod/httpmethod.component';


const routes: Routes = [
  {
    path:'get',
    component:HttpmethodComponent
  },
  {
    path:'post',
    component:FormComponent
  },
  {
    path:'put/:id',
    component:FormComponent
  },
  {
    path:'delete/:id',
    component:DeletComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
