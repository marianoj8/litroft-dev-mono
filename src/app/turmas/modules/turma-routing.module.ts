import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TurmaListComponent } from './../turma-list/turma-list.component';
import { TurmaFormComponent } from '../turma-form/turma-form.component';
import { TurmasComponent } from '../turmas.component';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';
import { TurmaDetalheComponent } from '../turma-detalhe/turma-detalhe.component';

const route: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: TurmasComponent,
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        component: TurmaListComponent
      },
      {
        path: 'add',
        canActivate: [AuthGuard],
        component: TurmaFormComponent
      },
      {
        path: 'edit/:id',
        canActivate: [AuthGuard],
        component: TurmaFormComponent
      },
      {
        path: 'detalhe/:id',
        canActivate: [AuthGuard],
        component: TurmaDetalheComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})
export class TurmaRoutingModule { }
