import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CoordenadorListComponent } from '../coordernador-list/coordenador-list.component';
import { CoordenadorComponent } from '../coordenador.component';

const routes: Routes = [
  {
    path: '',
    component: CoordenadorComponent,
    children: [
      {
        path: '',
        component: CoordenadorListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoordernadorRoutingModule { }
