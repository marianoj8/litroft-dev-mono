import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/shared/guard/auth.guard';
import { MonografiasComponent } from '../monografias.component';
import { MonoListComponent } from '../mono-list/mono-list.component';
import { MonoFormComponent } from '../mono-form/mono-form.component';
import { MonoDetalheComponent } from '../mono-detalhe/mono-detalhe.component';


const route: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: MonografiasComponent,
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        component: MonoListComponent
      },
      {
        path: 'add',
        canActivate: [AuthGuard],
        component: MonoFormComponent
      },
      {
        path: 'edit/:id',
        canActivate: [AuthGuard],
        component: MonoFormComponent
      },
      {
        path: 'detlahe/:id',
        canActivate: [AuthGuard],
        component: MonoDetalheComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})
export class MonografiaRoutingModule { }
