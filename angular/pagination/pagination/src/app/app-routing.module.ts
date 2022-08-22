import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterializeComponent } from './materialize/materialize.component';
import { TablePaginationComponent } from './table-pagination/table-pagination.component';

const routes: Routes = [
  {
    path: 'table',
    component: TablePaginationComponent,
  },
  {
    path:'',
    component:MaterializeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
