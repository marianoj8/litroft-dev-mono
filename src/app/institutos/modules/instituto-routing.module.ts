import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstitutoComponent } from '../instituto.component';
import { InstitutoListComponent } from '../instituto-list/instituto-list.component';
import { InstitutoFormComponent } from '../instituto-form/instituto-form.component';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: InstitutoComponent,
    children: [
      {
        path: '',
        component: InstitutoListComponent
      },
      {
        path: 'add',
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
