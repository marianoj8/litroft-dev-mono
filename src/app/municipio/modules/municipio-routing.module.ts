import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MunicipioComponent } from '../municipio.component';
import { MunicipioListComponent } from '../municipio-list/municipio-list.component';
import { MunicipioFormComponent } from '../municipio-form/municipio-form.component';

const routes: Routes = [
  {
    path: '',
    component: MunicipioComponent,
    children: [
      {
        path: '',
        component: MunicipioListComponent
      },
      {
        path: 'add',
        component: MunicipioFormComponent
      },
      {
        path: 'edit/:id',
        component: MunicipioFormComponent
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
