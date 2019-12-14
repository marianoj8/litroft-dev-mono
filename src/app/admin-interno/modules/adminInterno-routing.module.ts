import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminInternoComponent } from '../admin-interno.component';
import { AdminInternoListComponent } from '../admin-interno-list/admin-interno-list.component';

const routes: Routes = [
  {
    path: '',
    component: AdminInternoComponent,
    children: [
      {
        path: '',
        component: AdminInternoListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminInternoRoutingModule {

}
