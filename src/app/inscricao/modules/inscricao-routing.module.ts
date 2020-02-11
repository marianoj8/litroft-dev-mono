import { InscricaoComponent } from './../inscricao.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InscricaoFormComponent } from '../inscricao-form/inscricao-form.component';
import { InscricaoInfoComponent } from '../inscricao-info/inscricao-info.component';

const routes: Routes = [
  {
    path: '',
    component: InscricaoComponent,
    children: [
      {
        path: '',
        component: InscricaoInfoComponent
      },
      {
        path: 'form-studant',
        component: InscricaoFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
  declarations: [],
})
export class InscricaoRoutingModule { }
