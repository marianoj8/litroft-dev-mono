import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './../admin.component';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';

const route: Routes = [

  {
    path: '',
    component: AdminComponent,
    children: [
    ]
  }

];


@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
