import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstudanteListComponent } from '../estudante-list/estudante-list.component';
import { EstudanteFromComponent } from '../estudante-from/estudante-from.component';
import { EstudantesComponent } from '../estudantes.component';
import { EstudanteDetalheComponent } from '../estudante-detalhe/estudante-detalhe.component';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';

const route: Routes = [
  {
    path: '',
    component: EstudantesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        component: EstudanteListComponent
      },
      {
        path: 'add',
        canActivate: [AuthGuard],
        component: EstudanteFromComponent
      },
      {
        path: 'edit/:id',
        canActivate: [AuthGuard],
        component: EstudanteFromComponent
      },
      {
        path: 'detalhe/:id',
        canActivate: [AuthGuard],
        component: EstudanteDetalheComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})
export class EstudanteRoutingModule { }
