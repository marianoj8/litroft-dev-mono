import { CoordenadorFormComponent } from './../coordenador-form/coordenador-form.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CoordenadorListComponent } from '../coordernador-list/coordenador-list.component';
import { CoordenadorComponent } from '../coordenador.component';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: CoordenadorComponent,
    children: [
      {
        path: '',
        component: CoordenadorListComponent
      },
      {
        path: 'add',
        canActivate: [AuthGuard],
        component: CoordenadorFormComponent
      },
      {
        path: 'edit/:id/instituto/:institutoId',
        canActivate: [AuthGuard],
        component: CoordenadorFormComponent
      },
      {
        path: 'detalhe/:id',
        canActivate: [AuthGuard],
        component: CoordenadorFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoordernadorRoutingModule { }
