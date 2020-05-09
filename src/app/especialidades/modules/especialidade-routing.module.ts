import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';

import { EspecialidadeDetalheComponent } from '../especialidade-detalhe/especialidade-detalhe.component';
import { EspecialidadeFormComponent } from '../especialidade-form/especialidade-form.component';
import { EspecialidadeListComponent } from '../especialidade-list/especialidade-list.component';
import { EspecialidadesComponent } from '../especialidades.component';

const route: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: EspecialidadesComponent,
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        component: EspecialidadeListComponent
      },
      {
        path: 'add',
        canActivate: [AuthGuard],
        component: EspecialidadeFormComponent
      },
      {
        path: 'edit/:id',
        canActivate: [AuthGuard],
        component: EspecialidadeFormComponent
      },
      {
        path: 'detalhe/:id',
        canActivate: [AuthGuard],
        component: EspecialidadeDetalheComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})
export class EspecialidadeRoutingModule { }
