import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstitutoComponent } from '../instituto.component';
import { InstitutoListComponent } from '../instituto-list/instituto-list.component';
import { InstitutoFormComponent } from '../instituto-form/instituto-form.component';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';
import { InstitutoPriveteListComponent } from '../instituto-privete-list/instituto-privete-list.component';

const routes: Routes = [
  {
    path: '',
    component: InstitutoComponent,
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        component: InstitutoListComponent
      },
      {
        path: 'private-list',
        canActivate: [AuthGuard],
        component: InstitutoPriveteListComponent
      },
      {
        path: 'add',
        canActivate: [AuthGuard],
        component: InstitutoFormComponent
      },
      {
        path: 'edit/:id',
        canActivate: [AuthGuard],
        component: InstitutoFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstiutoRoutingModule { }
