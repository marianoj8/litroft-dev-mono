import { CoordenacaoComponent } from './../coordenacao.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: CoordenacaoComponent,
    children: [
      {
        path: '',
        component: null
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoordernacaoRoutingModule { }
