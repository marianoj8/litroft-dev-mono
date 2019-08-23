import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrientadorListComponent } from '../orientador-list/orientador-list.component';
import { OrientadorFormComponent } from '../orientador-form/orientador-form.component';
import { OrientadoresComponent } from '../orientadores.component';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';

const route: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: OrientadoresComponent,
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        component: OrientadorListComponent
      },
      {
        path: 'orientador',
        canActivate: [AuthGuard],
        component: OrientadorFormComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})
export class OrientadorRoutingModule { }
