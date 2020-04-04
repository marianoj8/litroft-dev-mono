import { MiniPautaComponent } from './../mini-pauta.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MiniPautaListComponent } from '../mini-pauta-list/mini-pauta-list.component';

const routes: Routes = [
  {
    path: '',
    component: MiniPautaComponent,
    children: [
      {
        path: '',
        component: MiniPautaListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiniPautaRoutingModule { }
