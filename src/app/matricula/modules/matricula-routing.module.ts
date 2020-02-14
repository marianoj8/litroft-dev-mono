import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MatriculaComponent } from './../matricula.component';
import { MatriculaOpcaoComponent } from './../matricula-opcao/matricula-opcao.component';

const routes: Routes = [
  {
    path: '',
    component: MatriculaComponent,
    children: [
      {
        path: '',
        component: MatriculaOpcaoComponent
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
