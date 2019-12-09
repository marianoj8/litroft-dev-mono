import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';

import { AdminComponent } from './../admin.component';

const route: Routes = [

  {
    path: '',
    component: AdminComponent,
    // resolve: [AdminResolverGuard],
    canActivate: [AuthGuard],
    children: [
    ]
  }

];


@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
