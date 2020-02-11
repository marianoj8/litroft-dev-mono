import { InscricaoComponent } from './../inscricao.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: InscricaoComponent,
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
  exports: [],
  declarations: [],
})
export class InscricaoRoutingModule { }
