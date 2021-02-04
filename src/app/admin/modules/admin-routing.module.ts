import { AdminFormComponent } from './../admin-form/admin-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';

import { AdminComponent } from './../admin.component';
import { AdminListComponent } from '../admin-list/admin-list.component';

const route: Routes = [

  {
    path: '',
    component: AdminComponent,
    // resolve: [AdminResolverGuard],
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: AdminListComponent
      },
      {
        path: 'add',
        component: AdminFormComponent
      }
    ]
  }

];


@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
