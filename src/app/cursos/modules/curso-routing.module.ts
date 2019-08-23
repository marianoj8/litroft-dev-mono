import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CursoListComponent } from '../curso-list/curso-list.component';
import { CursoFormComponent } from '../curso-form/curso-form.component';
import { CursosComponent } from '../cursos.component';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';

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
        path: 'curso',
        canActivate: [AuthGuard],
        component: CursoFormComponent
      }
    ]
  }

];


@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})
export class CursoRoutingModule { }
