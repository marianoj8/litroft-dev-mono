import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MatriculaComponent } from './../matricula.component';

const routes: Routes = [
  {
    path: '',
    component: MatriculaComponent,
    children: [

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
  declarations: [],
})
export class MatriculaRoutingModule { }
