import { ProfessoresComponent } from './../professores.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProfessorListComponent } from '../professor-list/professor-list.component';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';
import { ProfessorFormComponent } from '../professor-form/professor-form.component';
import { ProfessorDetalheComponent } from '../professor-detalhe/professor-detalhe.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: ProfessoresComponent,
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        component: ProfessorListComponent
      },
      {
        path: 'add',
        canActivate: [AuthGuard],
        component: ProfessorFormComponent
      },
      {
        path: 'edit/:id/instituto/:institutoId',
        canActivate: [AuthGuard],
        component: ProfessorFormComponent
      },
      {
        path: 'detalhe/:id/instituto/:institutoId',
        canActivate: [AuthGuard],
        component: ProfessorDetalheComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfessorRoutingModule { }
