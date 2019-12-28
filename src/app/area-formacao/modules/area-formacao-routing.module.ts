import { NgModule } from '@angular/core';
import { AreaFormacaoComponent } from '../area-formacao.component';
import { Routes, RouterModule } from '@angular/router';
import { AreaFormacaoListComponent } from '../area-formacao-list/area-formacao-list.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: AreaFormacaoComponent,
    children: [
      {
        path: '',
        component: AreaFormacaoListComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AreaFormacaoRoutingModule {

}
