import { CoordenacaoComponent } from './../coordenacao.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CoordenacaoListComponent } from '../coordenacao-list/coordenacao-list.component';

const routes: Routes = [
  {
    path: '',
    component: CoordenacaoComponent,
    children: [
      {
        path: '',
        component: CoordenacaoListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoordernacaoRoutingModule { }
