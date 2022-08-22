import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ChildComponent } from './child/child.component';

const routes: Routes = [
  {path:'about',
children:[{path:'company',component:ChildComponent},
{path:'aboutme',component:ChildComponent}
]
},
{
  path:'home',
  component:AppComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
