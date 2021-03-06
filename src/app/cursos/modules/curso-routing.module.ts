import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';

import { CursoDetalheComponent } from '../curso-detalhe/curso-detalhe.component';
import { CursoFormComponent } from '../curso-form/curso-form.component';
import { CursoListComponent } from '../curso-list/curso-list.component';
import { CursosComponent } from '../cursos.component';

const route: Routes = [

  {
    path: '',
    component: CursosComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        component: CursoListComponent
      },
      {
        path: 'add',
        canActivate: [AuthGuard],
        component: CursoFormComponent
      },
      {
        path: 'edit/:id',
        canActivate: [AuthGuard],
        component: CursoFormComponent
      },
      {
        path: 'detalhe/:id',
        canActivate: [AuthGuard],
        component: CursoDetalheComponent,
      },
    ]
  }

];


@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})
export class CursoRoutingModule { }
