import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MunicipioComponent } from '../municipio.component';

const routes: Routes = [
  {
    path: '',
    component: MunicipioComponent,
    children: [
      {
        path: '',
        component: null
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
export class MunicipioRoutingModule {

}
