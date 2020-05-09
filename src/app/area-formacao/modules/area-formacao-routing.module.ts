import { NgModule } from '@angular/core';
import { AreaFormacaoComponent } from '../area-formacao.component';
import { Routes, RouterModule } from '@angular/router';
import { AreaFormacaoListComponent } from '../area-formacao-list/area-formacao-list.component';
import { CommonModule } from '@angular/common';
import { AreaFormacaoFormComponent } from '../area-formacao-form/area-formacao-form.component';

const routes: Routes = [
  {
    path: '',
    component: AreaFormacaoComponent,
    children: [
      {
        path: '',
        component: AreaFormacaoListComponent
      },
      {
        path: 'add',
        component: AreaFormacaoFormComponent
      },
      {
        path: 'edit/:id',
        component: AreaFormacaoFormComponent
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
