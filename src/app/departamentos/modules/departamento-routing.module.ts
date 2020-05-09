import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';

import { DepartamentoDetalheComponent } from '../departamento-detalhe/departamento-detalhe.component';
import { DepartamentoFormComponent } from '../departamento-form/departamento-form.component';
import { DepartamentosComponent } from '../departamentos.component';
import { DepartamentoListComponent } from './../departamento-list/departamento-list.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: DepartamentosComponent,
    children: [
      { path: '', component: DepartamentoListComponent, canActivate: [AuthGuard] },
      { path: 'add', component: DepartamentoFormComponent, canActivate: [AuthGuard] },
      {
        path: 'edit/:id',
        canActivate: [AuthGuard],
        component: DepartamentoFormComponent
      },
      {
        path: 'detalhe/:id',
        canActivate: [AuthGuard],
        component: DepartamentoDetalheComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartamentoRoutingModule { }
