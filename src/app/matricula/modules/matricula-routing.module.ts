import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MatriculaComponent } from './../matricula.component';
import { MatriculaOpcaoComponent } from './../matricula-opcao/matricula-opcao.component';
import { MatriculaFormComponent } from '../matricula-form/matricula-form.component';

const routes: Routes = [
  {
    path: '',
    component: MatriculaComponent,
    children: [
      {
        path: '',
        component: MatriculaOpcaoComponent
      },
      {
        path: 'from',
        component: MatriculaFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
  declarations: [],
})
export class MatriculaRoutingModule { }
